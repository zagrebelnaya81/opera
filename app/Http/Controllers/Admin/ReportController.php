<?php

namespace App\Http\Controllers\Admin;

use App\Exports\EventDistributorBookedTicketsExport;
use App\Exports\EventDistributorSoldTicketsExport;
use App\Exports\TicketsExport;
use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\PerformanceCalendar;
use App\Models\ReportConstructor;
use App\Models\Ticket;
use App\Repositories\ReportConstructorRepository;
use App\Repositories\ReportRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    protected $reportConstructorRepository;

    protected $reportRepository;

    public function __construct()
    {
        $this->middleware('permission:report-list');
        $this->middleware('permission:report-list-own', ['only' => ['employeeSold', 'soldPeriod']]);
        $this->middleware('permission:report-list-total');

        $this->reportConstructorRepository = new ReportConstructorRepository();

        $this->reportRepository = new ReportRepository();
    }

    public function defaultReports()
    {

    }

    public function index(Request $request)
    {
        $user = Auth::user();

        $templates = $this->reportConstructorRepository->all($request);

        return view('admin.reports.index', [
            'templates' => $templates
        ]);
    }

    function view(Request $request, ReportConstructor $reportConstructor){
        $fields = $reportConstructor->toArray();

        $user = Auth::user();

        $isAdmin = $user->hasAnyRole(['admin', 'super-admin']);
        $isCashier = $fields[ReportConstructor::FIELD_ROLE_CASHIER] && $user->hasRole('касир');
        $isSeniorCashier = $fields[ReportConstructor::FIELD_ROLE_SENIOR_CASHIER] && $user->hasRole('Головний касир');

        $hasPermission = false;

        if($isCashier){
            $hasPermission = true;
        }

        if($isSeniorCashier){
            $hasPermission = true;
        }

        if($isAdmin)
            $hasPermission = true;

        if( ! $hasPermission){
            abort(403);
        }

        $reports = $this->reportRepository->search($request, $reportConstructor);

        $fields = collect($reportConstructor)->filter(function($value, $key){
            return $value === 1;
        })->toArray();

        return view('admin.reports.view', [
            'fields' => $fields,
            'reports' => $reports,
            'template' => $reportConstructor->toArray()
        ]);
    }

    function constructor(Request $request){
        $templates = $this->reportConstructorRepository->all($request);
        $fields = ReportConstructor::FIELDS;

        return response()->view('admin.reports.constructor', [
            'templates' => $templates,
            'fields' => $fields
        ]);
    }

    public function employeeSold(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');

        $user = Auth::user();

        $orders = Order::with([
            'tickets',
            'tickets.seatPrice',
            'tickets.seatPrice.priceZone',
        ])
            ->whereIn('status', [OrderStatus::SOLD, OrderStatus::RETURNED])
            ->where('seller_id', $user->id)
            ->where('buyer_id', null)
            ->whereDate('created_at', '>=', $from)
            ->whereDate('created_at', '<=', $to);

        $orderIds = $orders->pluck('id')->toArray();
        $orders = $orders->get();
    

        $ticketIds = [];
        foreach ($orders as $order) {
            foreach ($order->tickets as $ticket) {
                $ticketIds[] = $ticket->id;
            }
        }

        $tickets = Ticket::with([
            'performanceCalendar',
            'performanceCalendar.performance',
            'performanceCalendar.performance.translate',
            'seatPrice',
            'seatPrice.priceZone',
            'orders'
        ])->whereIn('id', $ticketIds)->get();

        $ticketGroups = $tickets->groupBy('performance_calendar_id');

        $eventsCollection = new Collection();
        foreach ($ticketGroups as $ticketGroup) {
            $item = $this->formReportObject();
            // if( $ticketGroup->first()->performanceCalendar->date>= date($from.' 00:00:00') && $ticketGroup->first()->performanceCalendar->date<=date($to.' 23:59:59')){               
                $item->dateTime = $ticketGroup->first()->performanceCalendar->date;
                $item->date = $ticketGroup->first()->performanceCalendar->getFormatDate();
                $item->time = $ticketGroup->first()->performanceCalendar->getFormatTime();
                $item->title = $ticketGroup->first()->performanceCalendar->performance->translate->title;
                $item->totalAmount = $ticketGroup->count();
                $item->totalSum = 0;
                foreach ($ticketGroup as $ticket) {
                    foreach ($ticket->orders as $order) {
                        if (!in_array($order->id, $orderIds)) {
                            continue;
                        }
                        if ($order->isCashPayment()) {
                            $item->cashAmount++;
                            $item->cashSum += $ticket->seatPrice->priceZone->price;
                        } else if ($order->isCardPayment()) {
                            $item->cardAmount++;
                            $item->cardSum += $ticket->seatPrice->priceZone->price;
                        }

                        $item->totalSum += $ticket->seatPrice->priceZone->price;
                        if ($order->isReturned()) {
                            $item->returnedAmount++;
                            $item->returnedSum += $ticket->seatPrice->priceZone->price;
                        }
                    }
                }
                $eventsCollection->push($item);
            // }
        }
        $total = $this->formReportObject();
        foreach ($eventsCollection as $item) {
            $total->cashAmount += $item->cashAmount;
            $total->cardAmount += $item->cardAmount;
            $total->returnedAmount += $item->returnedAmount;
            $total->cashSum += $item->cashSum;
            $total->cardSum += $item->cardSum;
            $total->returnedSum += $item->returnedSum;
        }

        return response()->json([
            'events' => $eventsCollection,
            'total' => $total
        ]);
    }


    public function daySold(Request $request)
    {
        $from = $request->input('from');

        $user = Auth::user();

        $orders = Order::with([
            'tickets',
            'tickets.seatPrice',
            'tickets.seatPrice.priceZone',
        ])
            ->whereIn('status', [OrderStatus::SOLD, OrderStatus::RETURNED])
            ->whereDate('created_at', '>=', date($from.' 00:00:00'))
            ->whereDate('created_at', '<=', date($from.' 23:59:59'));

        $orderIds = $orders->pluck('id')->toArray();
        $orders = $orders->get();
    

        $ticketIds = [];
        foreach ($orders as $order) {
            foreach ($order->tickets as $ticket) {
                $ticketIds[] = $ticket->id;
            }
        }

        $tickets = Ticket::with([
            'performanceCalendar',
            'performanceCalendar.performance',
            'performanceCalendar.performance.translate',
            'seatPrice',
            'seatPrice.priceZone',
            'orders'
        ])->whereIn('id', $ticketIds)->get();
        
        $ticketGroups = $tickets->groupBy('performance_calendar_id');
        
        $eventsCollection = new Collection();
        foreach ($ticketGroups as $ticketGroup) {
            $item = $this->formReportObject();
                $item->full_price = $ticketGroup->first()->full_price;
                $item->dateTime = $ticketGroup->first()->performanceCalendar->date;
                $item->date = $ticketGroup->first()->performanceCalendar->getFormatDate();
                $item->time = $ticketGroup->first()->performanceCalendar->getFormatTime();
                $item->title = $ticketGroup->first()->performanceCalendar->performance->translate->title;
                $item->totalAmount = $ticketGroup->count();
                $item->totalSum = 0;
                foreach ($ticketGroup as $ticket) {
                    foreach ($ticket->orders as $order) {
                        if (!in_array($order->id, $orderIds)) {
                            continue;
                        }
                        if ($order->isCashPayment()) {
                            $item->cashAmount++;
                            $item->cashSum += $ticket->seatPrice->priceZone->price;
                        } else if ($order->isCardPayment()) {
                            $item->cardAmount++;
                            $item->cardSum += $ticket->seatPrice->priceZone->price;
                        }

                        $item->totalSum += $ticket->seatPrice->priceZone->price;
                        if ($order->isReturned()) {
                            $item->returnedAmount++;
                            $item->returnedSum += $ticket->seatPrice->priceZone->price;
                        }
                    }
                }
                $eventsCollection->push($item);
            // }
        }
        $total = $this->formReportObject();
        foreach ($eventsCollection as $item) {
            $total->cashAmount += $item->cashAmount;
            $total->cardAmount += $item->cardAmount;
            $total->returnedAmount += $item->returnedAmount;
            $total->cashSum += $item->cashSum;
            $total->cardSum += $item->cardSum;
            $total->returnedSum += $item->returnedSum;
        }

        return response()->json([
            'events' => $eventsCollection,
            'total' => $total
        ]);
    }


    protected function formReportObject()
    {
        $item = new \stdClass();
        $item->cashAmount = 0;
        $item->cardAmount = 0;
        $item->distrCashAmount = 0;
        $item->distrCardAmount = 0;
        $item->onlineAmount = 0;
        $item->totalAmount = 0;
        $item->returnedAmount = 0;
        $item->cashSum = 0;
        $item->cardSum = 0;
        $item->distrCashSum = 0;
        $item->distrCardSum = 0;
        $item->onlineSum = 0;
        $item->totalSum = 0;
        $item->returnedSum = 0;
        return $item;
    }

    public function soldPeriod(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');

        $orders = Order::with([
            'tickets',
            'tickets.seatPrice',
            'tickets.seatPrice.priceZone',
        ])
            ->whereIn('status', [OrderStatus::SOLD])
            ->whereDate('created_at', '>=', $from)
            ->whereDate('created_at', '<=', $to);

        $orderIds = $orders->pluck('id')->toArray();
        $orders = $orders->get();

        $ticketIds = [];
        foreach ($orders as $order) {
            foreach ($order->tickets as $ticket) {
                $ticketIds[] = $ticket->id;
            }
        }

        $tickets = Ticket::with([
            'performanceCalendar',
            'performanceCalendar.performance',
            'performanceCalendar.performance.translate',
            'seatPrice',
            'seatPrice.priceZone',
            'orders'
        ])->whereIn('id', $ticketIds)->get();

        $ticketGroups = $tickets->groupBy('performance_calendar_id');

        $eventsCollection = new Collection();
        foreach ($ticketGroups as $ticketGroup) {
            $item = $this->formReportObject();
            // if( $ticketGroup->first()->performanceCalendar->date>= date($from.' 00:00:00') && $ticketGroup->first()->performanceCalendar->date<=date($to.' 23:59:59')){               
                $item->dateTime = $ticketGroup->first()->performanceCalendar->date;
                $item->date = $ticketGroup->first()->performanceCalendar->getFormatDate();
                $item->time = $ticketGroup->first()->performanceCalendar->getFormatTime();
                $item->title = $ticketGroup->first()->performanceCalendar->performance->translate->title;
                $item->hall = $ticketGroup->first()->performanceCalendar->performance->hall->translate->title;
                $item->totalAmount = $ticketGroup->count();
                $item->totalSum = 0;
                foreach ($ticketGroup as $ticket) {
                    foreach ($ticket->orders as $order) {
                        if (!in_array($order->id, $orderIds)) {
                            continue;
                        }
                        if ($order->isCashPayment() && $order->seller_id !== null) {
                            $item->cashAmount++;
                            $item->cashSum += $ticket->seatPrice->priceZone->price;
                        } else if ($order->isCardPayment() && $order->seller_id !== null) {
                            $item->cardAmount++;
                            $item->cardSum += $ticket->seatPrice->priceZone->price;
                        } else if ($order->isCardPayment() && ($order->buyer_id !== null || $order->buyer_id === null)) {
                            $item->onlineAmount++;
                            $item->onlineSum += $ticket->seatPrice->priceZone->price;
                        }
                        $item->totalSum += $ticket->seatPrice->priceZone->price;
                    }
                }
                $eventsCollection->push($item);
            // }
        }

        $total = $this->formReportObject();
        foreach ($eventsCollection as $item) {
            $total->cashAmount += $item->cashAmount;
            $total->cardAmount += $item->cardAmount;
            $total->onlineAmount += $item->onlineAmount;
            $total->cashSum += $item->cashSum;
            $total->cardSum += $item->cardSum;
            $total->onlineSum += $item->onlineSum;
        }

        return response()->json([
            'events' => $eventsCollection,
            'total' => $total
        ]);
    }

    public function distributorsSold(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');

        $orderGroups = Order::with([
            'buyer',
            'tickets',
            'tickets.seatPrice',
            'tickets.seatPrice.priceZone',
        ])
            ->whereIn('status', [OrderStatus::SOLD])
            ->where('seller_id', '!=', null)
            ->where('buyer_id', '!=', null)
            ->whereDate('created_at', '>=', $from)
            ->whereDate('created_at', '<=', $to)
            ->get()
            ->groupBy('buyer_id');

        $distributors = [];
        $total = [];
        $total['totalAmount'] = 0;
        $total['totalSum'] = 0;
        foreach ($orderGroups as $orders) {
            $distributorId = $orders->first()->buyer_id;
            foreach ($orders as $order) {
                $eventId = $order->tickets->first()->performance_calendar_id;
                $distributors[$distributorId][$eventId]['distributor'] = $distributors[$distributorId][$eventId]['distributor'] ?? $order->buyer->lastName;
                $distributors[$distributorId][$eventId]['title'] = $distributors[$distributorId][$eventId]['title'] ?? $order->tickets->first()->performanceCalendar->performance->translate->title;
                $distributors[$distributorId][$eventId]['dateTime'] = $distributors[$distributorId][$eventId]['date'] ?? $order->tickets->first()->performanceCalendar->date;
                $distributors[$distributorId][$eventId]['date'] = $distributors[$distributorId][$eventId]['date'] ?? $order->tickets->first()->performanceCalendar->getFormatDate();
                $distributors[$distributorId][$eventId]['time'] = $distributors[$distributorId][$eventId]['time'] ?? $order->tickets->first()->performanceCalendar->getFormatTime();
                $distributors[$distributorId][$eventId]['totalAmount'] = $distributors[$distributorId][$eventId]['totalAmount'] ?? 0;
                $distributors[$distributorId][$eventId]['totalSum'] = $distributors[$distributorId][$eventId]['totalSum'] ?? 0;
                foreach ($order->tickets as $ticket) {
                    $distributors[$distributorId][$eventId]['totalAmount']++;
                    $total['totalAmount']++;
                    $distributors[$distributorId][$eventId]['totalSum'] += $ticket->seatPrice->priceZone->price;
                    $total['totalSum'] += $ticket->seatPrice->priceZone->price;
                }
            }
        }

        return response()->json([
            'distributors' => $distributors,
            'total' => $total
        ]);
    }

    public function soldPriceGroups(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');

        $events = PerformanceCalendar::with([
            'performance',
            'performance.translate',
            'performance.hall',
            'performance.hall.translate',
            'hallPricePattern',
            'hallPricePattern.pricePattern',
            'hallPricePattern.pricePattern.priceZones',
        ])->whereDate('date', '>=', $from)
            ->whereDate('date', '<=', $to)
            ->where('areTicketsGenerated', true)
            ->orderBy('date')
            ->get();

        $ticketEventsCollection = new Collection();
        $total = $this->formReportObject();
        foreach ($events as $event) {
            $ticketEventCollection = new \stdClass();
            $ticketEventCollection->title = $event->performance->translate->title;
            $ticketEventCollection->dateTime = $event->date;
            $ticketEventCollection->date = $event->getFormatDate();
            $ticketEventCollection->time = $event->getFormatTime();
            $ticketEventCollection->hall = $event->performance->hall->translate->title;
            $eventTickets = $event->tickets()
                ->with(['seatPrice', 'seatPrice.priceZone'])
                ->where('isAvailable', false)
                ->where('distributor_id', null)
                ->get();
            $ticketEventCollection->prices = [];
            $prices = $event->hallPricePattern->pricePattern->priceZones->pluck('price')->toArray();
            foreach ($prices as $price) {
                $ticketEventCollection->prices[$price] = 0;
            }
            foreach ($eventTickets as $ticket) {
                $ticketEventCollection->prices[$ticket->seatPrice->priceZone->price]++;
                $total->totalAmount++;
                $total->totalSum += $ticket->seatPrice->priceZone->price;
            }
            $ticketEventsCollection->push($ticketEventCollection);
        }

        return response()->json([
            'events' => $ticketEventsCollection,
            'total' => $total
        ]);
    }

    public function eventTicketsSold(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');
        $param = $request->input('param', 'all');

        $events = PerformanceCalendar::with([
            'performance',
            'performance.translate',
            'performance.hall',
            'performance.hall.translate',
        ])->whereDate('date', '>=', $from)
            ->whereDate('date', '<=', $to)
            ->where('areTicketsGenerated', true)
            ->orderBy('date')
            ->get();

        $eventsCollection = new Collection();
        foreach ($events as $event) {
            $eventCollection = $this->formReportObject();
            $eventCollection->title = $event->performance->translate->title;
            $eventCollection->dateTime = $event->date;
            $eventCollection->date = $event->getFormatDate();
            $eventCollection->time = $event->getFormatTime();
            $eventCollection->hall = $event->performance->hall->translate->title;
            $eventTickets = $event->tickets()
                ->with(['seatPrice', 'seatPrice.priceZone', 'orders'])
                ->where('isAvailable', false)
                ->where('distributor_id', null)
                ->get();
            foreach ($eventTickets as $ticket) {
                $order = $ticket->orders->where('status', OrderStatus::SOLD)->first();
                if (!$order) {
                    continue;
                }
                if ($order->isCashPayment() && $order->seller_id !== null) {
                    $eventCollection->cashAmount++;
                    $eventCollection->cashSum += $ticket->seatPrice->priceZone->price;
                } else if ($order->isCardPayment() && $order->seller_id !== null) {
                    $eventCollection->cardAmount++;
                    $eventCollection->cardSum += $ticket->seatPrice->priceZone->price;
                } else if ($order->isCardPayment() && ($order->buyer_id !== null || $order->buyer_id === null)) {
                    $eventCollection->onlineAmount++;
                    $eventCollection->onlineSum += $ticket->seatPrice->priceZone->price;
                }
            }
            $eventsCollection->push($eventCollection);
        }

        $total = $this->formReportObject();
        foreach ($eventsCollection as $item) {
            $total->cashAmount += $item->cashAmount;
            $total->cardAmount += $item->cardAmount;
            $total->onlineAmount += $item->onlineAmount;
            $total->cashSum += $item->cashSum;
            $total->cardSum += $item->cardSum;
            $total->onlineSum += $item->onlineSum;
        }

        return response()->json([
            'param' => $param,
            'events' => $eventsCollection,
            'total' => $total
        ]);
    }

    public function eventSoldPriceGroups(Request $request)
    {
        $eventId = $request->input('eventId');

        $event = PerformanceCalendar::with([
            'performance',
            'performance.translate',
            'performance.hall',
            'performance.hall.translate',
            'hallPricePattern',
            'hallPricePattern.pricePattern',
            'hallPricePattern.pricePattern.priceZones',
        ])->find($eventId);

        $ticketEventCollection = new Collection();
        $ticketEventCollection->title = $event->performance->translate->title;
        $ticketEventCollection->date = $event->getFormatDate();
        $ticketEventCollection->time = $event->getFormatTime();
        $ticketEventCollection->hall = $event->performance->hall->translate->title;
        $eventTickets = $event->tickets()
            ->with([
                'seatPrice',
                'seatPrice.priceZone',
                'orders'
            ])
            ->where('isAvailable', false)
            ->where('distributor_id', null)
            ->get();
        $ticketEventCollection->prices = [];
        $prices = $event->hallPricePattern->pricePattern->priceZones->pluck('price')->toArray();
        foreach ($prices as $price) {
            $ticketEventCollection->prices[$price] = $this->formReportObject();
        }
        foreach ($eventTickets as $ticket) {
            $price = $ticket->seatPrice->priceZone->price;
            $order = $ticket->orders->where('status', OrderStatus::SOLD)->first();
            if (!$order) {
                continue;
            }
            if ($order->seller_id !== null && $order->buyer_id === null) {
                if ($order->isCashPayment()) {
                    $ticketEventCollection->prices[$price]->cashAmount++;
                    $ticketEventCollection->prices[$price]->cashSum += $price;
                } else if ($order->isCardPayment()) {
                    $ticketEventCollection->prices[$price]->cardAmount++;
                    $ticketEventCollection->prices[$price]->cardSum += $price;
                }
            } else if ($order->seller_id !== null && $order->buyer_id !== null) {
                if ($order->isCashPayment()) {
                    $ticketEventCollection->prices[$price]->distrCashAmount++;
                    $ticketEventCollection->prices[$price]->distrCashSum += $price;
                } else if ($order->isCardPayment()) {
                    $ticketEventCollection->prices[$price]->distrCardAmount++;
                    $ticketEventCollection->prices[$price]->distrCardSum += $price;
                }
            } else if ($order->seller_id === null && ($order->buyer_id !== null || $order->buyer_id === null)) {
                $ticketEventCollection->prices[$price]->onlineAmount++;
                $ticketEventCollection->prices[$price]->onlineSum += $price;
            }
        }

        $total = $this->formReportObject();
        foreach ($ticketEventCollection->prices as $price) {
            $total->cashAmount += $price->cashAmount;
            $total->cardAmount += $price->cardAmount;
            $total->distrCashAmount += $price->distrCashAmount;
            $total->distrCardAmount += $price->distrCardAmount;
            $total->onlineAmount += $price->onlineAmount;
            $total->cashSum += $price->cashSum;
            $total->cardSum += $price->cardSum;
            $total->distrCashSum += $price->distrCashSum;
            $total->distrCardSum += $price->distrCardSum;
            $total->onlineSum += $price->onlineSum;
        }

        return view('admin.reports.event-sold-price-groups', compact('total',
            'ticketEventCollection'
        ));
    }

    public function detailedSold(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');

        $events = PerformanceCalendar::with([
            'performance',
            'performance.translate',
            'performance.hall',
            'performance.hall.translate',
            'hallPricePattern',
            'hallPricePattern.pricePattern',
            'hallPricePattern.pricePattern.priceZones',
            'tickets' => function ($query) {
                $query->where('isAvailable', false)->where('distributor_id', null);
            },
            'tickets.seatPrice',
            'tickets.seatPrice.priceZone',
            'tickets.orders',
            'tickets.orders.seller',
            'tickets.orders.buyer',
        ])->whereDate('date', '>=', $from)
            ->whereDate('date', '<=', $to)
            ->where('areTicketsGenerated', true)
            ->orderBy('date')
            ->get();

        $ticketEventsCollection = new Collection();
        foreach ($events as $event) {
            $ticketEventCollection = new \stdClass();
            $ticketEventCollection->title = $event->performance->translate->title;
            $ticketEventCollection->dateTime = $event->date;
            $ticketEventCollection->date = $event->getFormatDate();
            $ticketEventCollection->time = $event->getFormatTime();
            $ticketEventCollection->hall = $event->performance->hall->translate->title;
            $ticketEventCollection->prices = [];
            $prices = $event->hallPricePattern->pricePattern->priceZones->pluck('price')->toArray();
            foreach ($prices as $price) {
                $ticketEventCollection->prices[$price] = new \stdClass();
                $ticketEventCollection->prices[$price]->distributors = [];
            }
            foreach ($event->tickets as $ticket) {
                $price = $ticket->seatPrice->priceZone->price;
                $order = $ticket->orders->where('status', OrderStatus::SOLD)->first();
                if (!$order) {
                    continue;
                }
                $item = $ticketEventCollection->prices[$price];
                if ($order->seller_id !== null && $order->buyer_id !== null) {
                    if (!isset($item->distributors[$order->buyer_id])) {
                        $item->distributors[$order->buyer_id] = $this->formReportObject();
                        $item->distributors[$order->buyer_id]->seller = $order->seller->fullName();
                        $item->distributors[$order->buyer_id]->seller_id = $order->seller_id;
                        $item->distributors[$order->buyer_id]->buyer = $order->buyer->lastName;
                        $item->distributors[$order->buyer_id]->buyer_id = $order->buyer_id;
                    }
                    if ($order->isCashPayment()) {
                        $item->distributors[$order->buyer_id]->cashAmount++;
                        $item->distributors[$order->buyer_id]->cashSum += $price;
                    } else if ($order->isCardPayment()) {
                        $item->distributors[$order->buyer_id]->cardAmount++;
                        $item->distributors[$order->buyer_id]->cardSum += $price;
                    }
                } else if ($order->seller_id !== null && $order->buyer_id === null) {
                    if (!isset($item->distributors['cash-box'])) {
                        $item->distributors['cash-box'] = $this->formReportObject();
                        $item->distributors['cash-box']->seller = $order->seller->fullName();
                        $item->distributors['cash-box']->seller_id = $order->seller_id;
                        $item->distributors['cash-box']->buyer = 'Каса';
                        $item->distributors['cash-box']->buyer_id = 'cash-box';
                    }
                    if ($order->isCashPayment()) {
                        $item->distributors['cash-box']->cashAmount++;
                        $item->distributors['cash-box']->cashSum += $price;
                    } else if ($order->isCardPayment()) {
                        $item->distributors['cash-box']->cardAmount++;
                        $item->distributors['cash-box']->cardSum += $price;
                    }
                } else if ($order->seller_id === null && ($order->buyer_id !== null || $order->buyer_id === null)) {
                    if (!isset($item->distributors['online'])) {
                        $item->distributors['online'] = $this->formReportObject();
                        $item->distributors['online']->seller = 'Сайт';
                        $item->distributors['online']->seller_id = 'online';
                        $item->distributors['online']->buyer = 'Сайт';
                        $item->distributors['online']->buyer_id = 'online';
                    }
                    $item->distributors['online']->cardAmount++;
                    $item->distributors['online']->cardSum += $price;
                }
            }
            $ticketEventsCollection->push($ticketEventCollection);
        }

        $total = $this->formReportObject();
        foreach ($ticketEventsCollection as $item) {
            foreach ($item->prices as $price => $priceItem) {
                foreach ($priceItem->distributors as $distributor) {
                    $total->cashAmount += $distributor->cashAmount;
                    $total->cardAmount += $distributor->cardAmount;
                    $total->onlineAmount += $distributor->onlineAmount;
                    $total->cashSum += $distributor->cashSum;
                    $total->cardSum += $distributor->cardSum;
                    $total->onlineSum += $distributor->onlineSum;
                }
            }
        }

        return response()->json([
            'events' => $ticketEventsCollection,
            'total' => $total
        ]);
    }

    public function detailedSoldByOrders(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');

        $orders = Order::with([
            'tickets'
        ])->whereIn('status', [OrderStatus::SOLD])
            ->whereDate('created_at', '>=', $from)
            ->whereDate('created_at', '<=', $to);

        $orders = $orders->get();

        $ticketIds = [];
        foreach ($orders as $order) {
            foreach ($order->tickets as $ticket) {
                $ticketIds[] = $ticket->id;
            }
        }

        $tickets = Ticket::with([
            'performanceCalendar',
            'performanceCalendar.performance',
            'performanceCalendar.performance.translate',
            'performanceCalendar.performance.hall',
            'performanceCalendar.performance.hall.translate',
            'performanceCalendar.hallPricePattern.pricePattern.priceZones',
            'seatPrice',
            'seatPrice.priceZone',
            'orders',
            'orders.buyer',
            'orders.seller',
        ])->whereIn('id', $ticketIds)->get();

        $ticketGroups = $tickets->groupBy('performance_calendar_id');
        $ticketEventsCollection = new Collection();
        foreach ($ticketGroups as $ticketGroup) {
            $ticketEventCollection = new \stdClass();
            $firstEventInGroup = $ticketGroup->first()->performanceCalendar;
            $ticketEventCollection->title = $firstEventInGroup->performance->translate->title;
            $ticketEventCollection->dateTime = $firstEventInGroup->date;
            $ticketEventCollection->date = $firstEventInGroup->getFormatDate();
            $ticketEventCollection->time = $firstEventInGroup->getFormatTime();
            $ticketEventCollection->hall = $firstEventInGroup->performance->hall->translate->title;
            $prices = $firstEventInGroup->hallPricePattern->pricePattern->priceZones->pluck('price')->toArray();
            foreach ($prices as $price) {
                $ticketEventCollection->prices[$price] = new \stdClass();
                $ticketEventCollection->prices[$price]->distributors = [];
            }
            foreach ($ticketGroup as $ticket) {
                $price = $ticket->seatPrice->priceZone->price;
                $order = $ticket->orders->where('status', OrderStatus::SOLD)->first();
                if (!$order) {
                    continue;
                }
                $item = $ticketEventCollection->prices[$price];
                if ($order->seller_id !== null && $order->buyer_id !== null) {
                    if (!isset($item->distributors[$order->buyer_id])) {
                        $item->distributors[$order->buyer_id] = $this->formReportObject();
                        $item->distributors[$order->buyer_id]->seller = $order->seller->fullName();
                        $item->distributors[$order->buyer_id]->seller_id = $order->seller_id;
                        $item->distributors[$order->buyer_id]->buyer = $order->buyer->lastName;
                        $item->distributors[$order->buyer_id]->buyer_id = $order->buyer_id;
                    }
                    if ($order->isCashPayment()) {
                        $item->distributors[$order->buyer_id]->cashAmount++;
                        $item->distributors[$order->buyer_id]->cashSum += $price;
                    } else if ($order->isCardPayment()) {
                        $item->distributors[$order->buyer_id]->cardAmount++;
                        $item->distributors[$order->buyer_id]->cardSum += $price;
                    }
                } else if ($order->seller_id !== null && $order->buyer_id === null) {
                    if (!isset($item->distributors['cash-box'])) {
                        $item->distributors['cash-box'] = $this->formReportObject();
                        $item->distributors['cash-box']->seller = $order->seller->fullName();
                        $item->distributors['cash-box']->seller_id = $order->seller_id;
                        $item->distributors['cash-box']->buyer = 'Каса';
                        $item->distributors['cash-box']->buyer_id = 'cash-box';
                    }
                    if ($order->isCashPayment()) {
                        $item->distributors['cash-box']->cashAmount++;
                        $item->distributors['cash-box']->cashSum += $price;
                    } else if ($order->isCardPayment()) {
                        $item->distributors['cash-box']->cardAmount++;
                        $item->distributors['cash-box']->cardSum += $price;
                    }
                } else if ($order->seller_id === null && ($order->buyer_id !== null || $order->buyer_id === null)) {
                    if (!isset($item->distributors['online'])) {
                        $item->distributors['online'] = $this->formReportObject();
                        $item->distributors['online']->seller = 'Сайт';
                        $item->distributors['online']->seller_id = 'online';
                        $item->distributors['online']->buyer = 'Сайт';
                        $item->distributors['online']->buyer_id = 'online';
                    }
                    $item->distributors['online']->cardAmount++;
                    $item->distributors['online']->cardSum += $price;
                }
            }
            $ticketEventsCollection->push($ticketEventCollection);
        }

        $total = $this->formReportObject();
        foreach ($ticketEventsCollection as $item) {
            foreach ($item->prices as $price => $priceItem) {
                foreach ($priceItem->distributors as $distributor) {
                    $total->cashAmount += $distributor->cashAmount;
                    $total->cardAmount += $distributor->cardAmount;
                    $total->onlineAmount += $distributor->onlineAmount;
                    $total->cashSum += $distributor->cashSum;
                    $total->cardSum += $distributor->cardSum;
                    $total->onlineSum += $distributor->onlineSum;
                }
            }
        }

        return response()->json([
            'events' => $ticketEventsCollection,
            'total' => $total
        ]);
    }

    public function eventDistributorBooked(Request $request)
    {
        $eventId = $request->input('eventId');
        $distributorId = $request->input('distributorId');
        return Excel::download(new EventDistributorBookedTicketsExport($eventId, $distributorId), 'Tickets.xlsx');
    }

    public function eventDistributorSold(Request $request)
    {
        $eventId = $request->input('eventId');
        $distributorId = $request->input('distributorId');
        return Excel::download(new EventDistributorSoldTicketsExport($eventId, $distributorId), 'Tickets.xlsx');
    }

    public function onlineSold(Request $request)
    {
        $from = $request->input('from');

        $orders = Order::with([
            'tickets'
        ])->whereIn('status', [OrderStatus::SOLD])
            ->whereDate('created_at', '>=', date($from." 00:00:00"))
            ->whereDate('created_at', '<=',  date($from." 23:59:59"));

        $orders = $orders->get();

        $ticketIds = [];
        foreach ($orders as $order) {
            foreach ($order->tickets as $ticket) {
                $ticketIds[] = $ticket->id;
            }
        }

        $tickets = Ticket::with([
            'performanceCalendar'=> function ($query) {
                $query->where('isSoldOnline', true);
            },
            'performanceCalendar.performance',
            'performanceCalendar.performance.translate',
            'performanceCalendar.performance.hall',
            'performanceCalendar.performance.hall.translate',
            'performanceCalendar.hallPricePattern.pricePattern.priceZones',
            'seatPrice',
            'seatPrice.priceZone',
            'seatPrice.seat',
            'seatPrice.seat.media',
            'seatPrice.seat.row',
            'seatPrice.seat.row.section',
            'seatPrice.seat.row.section.translate',
            'orders',
            'orders.buyer',
            'orders.seller',
        ])->whereIn('id', $ticketIds)->get();

        $ticketGroups = $tickets->groupBy('performance_calendar_id');
        $ticketEventsCollection = new Collection();
        foreach ($ticketGroups as $ticketGroup) {

            $ticketEventCollection = new \stdClass();
            $firstEventInGroup = $ticketGroup->first()->performanceCalendar;
            $ticketEventCollection->title = $firstEventInGroup->performance->translate->title;
            $ticketEventCollection->dateTime = $firstEventInGroup->date;
            $ticketEventCollection->date = $firstEventInGroup->getFormatDate();
            $ticketEventCollection->time = $firstEventInGroup->getFormatTime();
            $ticketEventCollection->hall = $firstEventInGroup->performance->hall->translate->title;

            $prices = $firstEventInGroup->hallPricePattern->pricePattern->priceZones->pluck('price')->toArray();
            foreach ($prices as $price) {
                $ticketEventCollection->prices[$price] = new \stdClass();
                $ticketEventCollection->prices[$price]->distributors = [];
            }
            $ticketEventCollection->tickets = $ticketGroup;
            foreach ($ticketGroup as $ticket) {
                $price = $ticket->seatPrice->priceZone->price;
                $order = $ticket->orders->where('status', OrderStatus::SOLD)->first();
                if (!$order) {
                    continue;
                }
                $item = $ticketEventCollection->prices[$price];
                // if ($order->seller_id === null && ($order->buyer_id !== null || $order->buyer_id === null)) {
                //    //online
                // }
            }

            $ticketEventsCollection->push($ticketEventCollection);
        }
        return response()->json([
            'events' => $ticketEventsCollection
        ]);
    }
}
