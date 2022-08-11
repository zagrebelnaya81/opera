<?php

namespace App\Exports;

use App\Models\Subscription;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Events\AfterSheet;

class ExportSubscribers implements FromQuery, WithHeadings, ShouldAutoSize, WithEvents, WithMapping, FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings():array{
        return [
            '#',
            'Lastname',
            'Firstname',
            'Email',
            'Phone',
            'Status'
        ];
    }
    public function query()
    {
        $subscribers = Subscription::latest()->get();
        return $subscribers;
    }

    public function map($subscriber): array
    {
        if($subscriber->email){
            return [
                $subscriber->id,
                $subscriber->user->lastName ?? null,
                $subscriber->user->firstName ?? null,
                $subscriber->email ?? null,
                $subscriber->user->phone ?? null,
                $subscriber->status() ?? null,
            ];
        }
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class    => function(AfterSheet $event) {
                $cellRange = 'A1:W1';
                $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->setSize(12);
                $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->setBold(true);
            },
        ];
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Subscription::latest()->get();
    }
}
