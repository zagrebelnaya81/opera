<?php

namespace App\Console\Commands;

use App\Models\Performance;
use App\Models\PerformanceCalendarTranslation;
use Illuminate\Console\Command;

class DumpPerformanceDatesRelationsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dates:dump';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $performances = Performance::with('calendar')->get();

        $performances->map(function($performance){
            $media = $performance->getFirstMedia('posters');

            $dates = $performance->calendar;

            $translations = $performance->translations;

            $dates->map(function($date) use ($media, $translations){

                $date->clearMediaCollection('poster1');
                $date->clearMediaCollection('poster2');

                if($media){
                    $headers = get_headers($media->getUrl(), true);

                    if($headers[0] === 'HTTP/1.1 200 OK'){
                        $date->addMediaFromUrl($media->getUrl())->toMediaCollection('poster1');
                        $date->addMediaFromUrl($media->getUrl())->toMediaCollection('poster2');
                    }
                }

                $date->translations()->delete();

                foreach($translations as $translation){
                    PerformanceCalendarTranslation::create([
                        'performance_calendar_id' => $date->id,
                        'language' => $translation->language,
                        'descriptions' => $translation->descriptions ? $translation->descriptions : ''
                    ]);
                }

            });
        });


    }
}
