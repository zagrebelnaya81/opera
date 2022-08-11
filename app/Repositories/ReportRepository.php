<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\Performance;
use App\Models\PerformanceCalendar;
use App\Models\ReportConstructor;
use App\Repositories\Contracts\ReportRepositoryContract;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class ReportRepository implements ReportRepositoryContract {

    public function get(Request $request, ReportConstructor $reportConstructor)
    {
        $performances = DB::table('performances as p')
            ->select(
                'p.id',
                'pc.date',
                'pt.title as performance_title',
                'ht.title as hall_title',
                'o.status as order_status'
            )->leftJoin(
                'hall_translations as ht', 'p.hall_id', '=', 'ht.hall_id'
            )->leftJoin(
                'performance_calendars as pc', 'p.id', '=', 'pc.performance_id'
            )->leftJoin(
                'performance_translations as pt', 'p.id', '=', 'pt.performance_id'
            )->leftJoin(
                'tickets as t', 'pc.id', '=', 't.performance_calendar_id'
            )->leftJoin(
                'order_tickets as ot', 't.id', '=', 'ot.ticket_id'
            )->leftJoin(
                'orders as o', 'ot.order_id', '=', 'o.id'
            )->where([
                'pt.language' => 'ua',
                'ht.language' => 'ua'
            ]);

//        if($reportConstructor->reservation){
//            $performances->where('o.status', OrderStatus::BOOKED);
//        }

        if($request->has('from')){
            $performances->where('pc.date', '>=', $request->get('from'));
        }

        if($request->has('to')){
            $performances->where('pc.date', '<=', $request->get('to'));
        }

        $performances->groupBy('p.id');

        $performanceIds = $performances->pluck('id')->toArray();

        $query = DB::table(
            'performance_calendars as pc'
        )->select(
            'pc.performance_id as id',
            'pz.price as price',
            Db::raw('SUM(pz.price) as amount'),
            Db::raw('COUNT(*) as total')
        )->leftJoin(
            'tickets as t', 'pc.id', '=', 't.performance_calendar_id'
        )->leftJoin(
            'order_tickets as ot', 't.id', '=', 'ot.ticket_id'
        )->leftJoin(
            'orders as o', 'ot.order_id', '=', 'o.id'
        )->leftjoin(
            'seat_prices as sp', 't.seat_price_id', '=', 'sp.id'
        )->leftjoin(
            'price_zones as pz', 'sp.price_zone_id', '=', 'pz.id'
        )->whereIn(
            'pc.performance_id', $performanceIds
        );

        $reserved = $query->where('o.status', OrderStatus::WAITING_FOR_PAYMENT)
            ->groupBy('pc.performance_id')
            ->get()
            ->keyBy('id');

        $query = $query->groupBy('pc.performance_id');

        $all = $query->get()->keyBy('id');

        //dd($all->toArray());

        $cash = $query->where(
            'o.payment_type', '=', Order::CASH_PAYMENT
        )->get()->keyBy('id');

        $card = $query->where(
            'o.payment_type', '=', Order::CARD_PAYMENT
        )->get()->keyBy('id');

        $online = $query->where(
            'o.status', '=', OrderStatus::SOLD_ONLINE
        )->get()->keyBy('id');

        $booked = $query->where(
            'o.status', '=', OrderStatus::BOOKED
        )->get()->keyBy('id');

        $discount = $query->leftJoin(
            'discounts as d', 't.discount_id', '=', 'd.id'
        )->get()->keyBy('id');

        $performances = $performances->get()->mapWithKeys(function($performance) use (
            $all,
            $cash,
            $card,
            $online,
            $booked,
            $discount,
            $reserved
        ){
            return [
                $performance->id => [
                    'id' => $performance->id,
                    'performance_title' => $performance->performance_title,
                    'hall_title' => $performance->hall_title,
                    'reservation' => $performance->order_status === OrderStatus::BOOKED ? 'yes': 'no',
                    'date' => Carbon::parse($performance->date)->format('d.m.Y'),
                    'time' => Carbon::parse($performance->date)->format('H:s'),
                    'price' => $all[$performance->id]->price ?? 0,
                    'amount_all' => ($all[$performance->id]->amount ?? 0) - ($reserved[$performance->id]->amount ?? 0),
                    'amount_cash' => $cash[$performance->id]->amount ?? 0,
                    'amount_cashless' => $card[$performance->id]->amount ?? 0,
                    'amount_online' => $online[$performance->id]->amount ?? 0,
                    'amount_booked' => $booked[$performance->id]->amount ?? 0,
                    'amount_discount' => $discount[$performance->id]->amount ?? 0,
                    'quantity_all' => ($all[$performance->id]->total ?? 0) - ($reserved[$performance->id]->total ?? 0),
                    'quantity_cash' => $cash[$performance->id]->total ?? 0,
                    'quantity_cashless' => $card[$performance->id]->total ?? 0,
                    'quantity_online' => $online[$performance->id]->total ?? 0,
                    'quantity_booked' => $booked[$performance->id]->total ?? 0,
                    'quantity_discount' => $discount[$performance->id]->total ?? 0,
                    'amount_reserved_all' => $reserved[$performance->id]->amount ?? 0,
//                    'amount_reserved_cash' => $cash[$performance->id]->amount_reserved ?? 0,
//                    'amount_reserved_cashless' => $card[$performance->id]->amount_reserved ?? 0,
//                    'amount_reserved_online' => $online[$performance->id]->amount_reserved ?? 0,
//                    'amount_reserved_booked' => $booked[$performance->id]->amount_reserved ?? 0,
//                    'amount_reserved_discount' => $discount[$performance->id]->amount_reserved ?? 0,
                    'quantity_reserved_all' => $reserved[$performance->id]->total ?? 0,
//                    'quantity_reserved_cash' => $cash[$performance->id]->total_reserved ?? 0,
//                    'quantity_reserved_cashless' => $card[$performance->id]->total_reserved ?? 0,
//                    'quantity_reserved_online' => $online[$performance->id]->total_reserved ?? 0,
//                    'quantity_reserved_booked' => $booked[$performance->id]->total_reserved ?? 0,
//                    'quantity_reserved_discount' => $discount[$performance->id]->total_reserved ?? 0,
                ]
            ];
        });

        return array_values($performances->toArray());
    }

    function search(Request $request, ReportConstructor $reportConstructor){
        $reportConstructor = $reportConstructor->toArray();

        $query = DB::table(
            'performances as p2'
        )->leftJoin(
            'performance_calendars as pc2', 'p2.id', '=', 'pc2.performance_id'
        )->leftJoin(
            'tickets as t2', 'pc2.id', '=', 't2.performance_calendar_id'
        )->leftJoin(
            'order_tickets as ot2', 't2.id', '=', 'ot2.ticket_id'
        )->leftJoin(
            'orders as o2', 'ot2.order_id', '=', 'o2.id'
        )->leftJoin(
            'users as u2', 'o2.seller_id', '=', 'u2.id'
        )->leftJoin(
            'seat_prices as sp2', 't2.seat_price_id', '=', 'sp2.id'
        )->leftJoin(
            'price_zones as pz2', 'sp2.price_zone_id', '=', 'pz2.id'
        )->leftJoin(
            'discounts as d2', 't2.discount_id', '=', 'd2.id'
        );

        if($reportConstructor['cashier']){
            $query->whereRaw('`u2`.`id` = `u`.`id`');
        }

        if($reportConstructor['hall']){
            $query->whereRaw('`p2`.`hall_id` = `p`.`hall_id`');
        }

        if($reportConstructor['price']){
            $query->whereRaw('`pz2`.`price` = `pz`.`price`');
        }

        if($reportConstructor['distributor']){
            $query->whereRaw('`t2`.`distributor_id` = `t`.`distributor_id`');
        }

        if($reportConstructor['event']){
            $query->whereRaw('`p2`.`id` = `p`.`id`');
        }

        if($reportConstructor['date']){
            $query->whereRaw('DATE_FORMAT(`pc2`.`date`, "%Y-%m-%d") = p_date');
        }

        if($reportConstructor['time']){
            $query->whereRaw('DATE_FORMAT(`pc2`.`date`, "%H:%S") = p_time');
        }

        $query->where(function($query){
            $query->whereRaw('o2.status = ' . "'" .  OrderStatus::SOLD . "'");
            $query->orWhereRaw('o2.status = ' . "'" . OrderStatus::SOLD_ONLINE . "'");
            $query->orWhereRaw('o2.status = ' . "'" . OrderStatus::DISTRIBUTOR_SOLD . "'");
        });

        $amount = clone $query;
        $amount = $amount->select(
            DB::raw('SUM(pz2.price)')
        )->toSql();

        $amount_discount = clone $query;
        $amount_discount = $amount_discount->select(
            DB::raw('(SUM(pz2.price) - SUM(d2.size))')
        )->toSql();

        $amount_cash = clone $query;
        $amount_cash = $amount_cash->select(
            DB::raw('SUM(pz2.price)')
        )->whereRaw(
            'o2.payment_type = ' . Order::CASH_PAYMENT
        )->toSql();

        $amount_card = clone $query;
        $amount_card = $amount_card->select(
            DB::raw('SUM(pz2.price)')
        )->whereRaw(
            'o2.payment_type = ' . Order::CARD_PAYMENT
        )->toSql();

        $amount_online = clone $query;
        $amount_online = $amount_online->select(
            DB::raw('SUM(pz2.price)')
        )->whereRaw(
            "o2.status = '" . OrderStatus::SOLD_ONLINE . "'"
        )->toSql();

        $total = clone $query;
        $total = $total->select(
            DB::raw('COUNT(*)')
        )->toSql();

        $total_discount = $query;
        $total_discount = $total_discount->select(
            DB::raw('(COUNT(d2.size))')
        )->toSql();

        $total_cash = clone $query;
        $total_cash = $total_cash->select(
            DB::raw('COUNT(*)')
        )->whereRaw(
            'o2.payment_type = ' . Order::CASH_PAYMENT
        )->toSql();

        $total_card = clone $query;
        $total_card = $total_card->select(
            DB::raw('COUNT(*)')
        )->whereRaw(
            'o2.payment_type = ' . Order::CARD_PAYMENT
        )->toSql();

        $total_online = clone $query;
        $total_online = $total_online->select(
            DB::raw('COUNT(*)')
        )->whereRaw(
            "o2.status = '" . OrderStatus::SOLD_ONLINE . "'"
        )->toSql();

        $reports = DB::table('performances as p')
            ->select(
                'p.id',
                'd.title as distributor',
                'pc.performance_id',
                'pc.date',
                'pt.title as event',
                'ht.title as hall',
                'o.status as order_status',
                'pz.price',
                't.distributor_id'
                ,DB::raw('IF(' . $reportConstructor['reservation'] . ', "yes", "no") as reservation')
                ,DB::raw('DATE_FORMAT(pc.date, "%Y-%m-%d") as p_date')
                ,DB::raw('DATE_FORMAT(pc.date, "%H:%S") as p_time')
                ,DB::raw('DATE_FORMAT(pc.date, "%Y-%m-%d") as date')
                ,DB::raw('DATE_FORMAT(pc.date, "%H:%S") as time')
                ,DB::raw('IFNULL((' . $amount . '), 0) as amount_no_discount')
                ,DB::raw('IFNULL((' . $amount_discount . '), 0) as amount_discount')
                ,DB::raw('IFNULL((' . $amount_card . '), 0) as amount_cashless')
                ,DB::raw('IFNULL((' . $amount_cash . '), 0) as amount_cash')
                ,DB::raw('IFNULL((' . $amount_online . '), 0) as amount_online')
                ,DB::raw('(' . $total . ') as quantity_no_discount')
                ,DB::raw('(' . $total_discount . ') as quantity_discount')
                ,DB::raw('(' . $total_card . ') as quantity_cashless')
                ,DB::raw('(' . $total_cash . ') as quantity_cash')
                ,DB::raw('(' . $total_online . ') as quantity_online')
            )->leftJoin(
                'hall_translations as ht', 'p.hall_id', '=', 'ht.hall_id'
            )->leftJoin(
                'performance_calendars as pc', 'p.id', '=', 'pc.performance_id'
            )->leftJoin(
                'performance_translations as pt', 'p.id', '=', 'pt.performance_id'
            )->leftJoin(
                'tickets as t', 'pc.id', '=', 't.performance_calendar_id'
            )->leftJoin(
                'order_tickets as ot', 't.id', '=', 'ot.ticket_id'
            )->leftJoin(
                'orders as o', 'ot.order_id', '=', 'o.id'
            )->leftJoin(
                'seat_prices as sp', 't.seat_price_id', '=', 'sp.id'
            )->leftJoin(
                'price_zones as pz', 'sp.price_zone_id', '=', 'pz.id'
            )->leftJoin(
                'distributors as d', 't.distributor_id', '=', 'd.id'
            )->where([
                'pt.language' => 'ua',
                'ht.language' => 'ua',
            ]);

        $reports->whereNotNull('pz.price');

        if($reportConstructor['reservation']){
            $reports->where(function($query){
                $query->where('o.status', OrderStatus::BOOKED);
            });
        }else{
            $reports->where(function($query){
                $query->where('o.status', OrderStatus::SOLD);
                $query->orWhere('o.status', OrderStatus::SOLD_ONLINE);
                $query->orWhere('o.status', OrderStatus::DISTRIBUTOR_SOLD);
            });
        }

        if($request->has('from')){
            $reports->where('pc.date', '>=', $request->get('from'));
        }

        if($request->has('to')){
            $reports->where('pc.date', '<=', $request->get('to'));
        }

        if($reportConstructor['cashier']){
            $reports->addSelect(
                DB::raw('CONCAT(u.lastName, " ", u.firstName) AS cashier'),
                DB::raw('IF(r.id = 4, 1, 0) as is_distributor')
            );
            $reports->leftJoin(
                'users as u', 'o.seller_id', '=', 'u.id'
            )->leftJoin(
                'model_has_roles as ur', 'u.id', '=', 'ur.model_id'
            )->leftJoin(
                'roles as r', 'r.id', '=', 'ur.role_id'
            );
            $reports->groupBy('cashier');
            $reports->whereNotNull('o.seller_id');
        }

        if($reportConstructor['event']){
            $reports->groupBy('p.id');
        }

        if($reportConstructor['date']){
            $reports->groupBy('p_date');
        }

        if($reportConstructor['time']){
            $reports->groupBy('p_time');
        }

        if($reportConstructor['hall']){
            $reports->groupBy('p.hall_id');
        }

        if($reportConstructor['price']){
            $reports->groupBy('pz.price');
        }

        if($reportConstructor['distributor']){
            $reports->groupBy('t.distributor_id');
            $reports->whereNotNull('t.distributor_id');
        }

        //dd($reports->toSql());

        return $reports->get()->toArray();
    }
}
