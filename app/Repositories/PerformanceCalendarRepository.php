<?php

namespace App\Repositories;

use App\Models\Color;
use App\Models\PerformanceCalendar;
use App\Models\PerformanceCalendarTranslation;
use App\Models\PricePattern;
use App\Models\PriceZone;
use Illuminate\Container\Container as App;

class PerformanceCalendarRepository extends Repository
{
    protected $homePageRepository;

    public function __construct(App $app, HomePageRepository $homePageRepository)
    {
        parent::__construct($app);
        $this->homePageRepository = $homePageRepository;
    }

    /**
     * Specify Model class name
     *
     * @return mixed
     */
    function model()
    {
        return PerformanceCalendar::class;
    }

    public function editPerformanceCalendar($data, $id)
    {
        $array = [
            'hall_price_pattern_id' => $data['hall_price_pattern_id'] ?? null,
            'isSoldInCashBox' => $data['isSoldInCashBox'] ?? false,
            'isSoldOnline' => $data['isSoldOnline'] ?? false,
        ];

        $this->update($array, ['id' => $id]);
    }

    public function ticketsWereGenerated($id) {
        $array = [
            'areTicketsGenerated'  => true,
        ];
        $this->update($array, ['id' => $id]);
    }

    public function ticketsWereDeleted($id) {
        $array = [
            'areTicketsGenerated'  => false,
        ];
        $this->update($array, ['id' => $id]);
    }

    public function delete($id)
    {
        $event = $this->find($id);
        $homePageComponents = $event->homePageComponents;
        foreach ($homePageComponents as $homePageComponent) {
            $this->homePageRepository->delete($homePageComponent->id);
        }


        return $this->model->destroy($id);
    }

    public function updateOrCreateTranslation($data, int $id)
    {
        foreach (get_languages() as $lang => $val) {
            PerformanceCalendarTranslation::updateOrCreate([
                'performance_calendar_id' => $id,
                'language' => $lang
            ],[
                'descriptions' => $data['descriptions_' . $lang]
            ]);
        }
    }

    public function getMultiLangModelById($id)
    {
        $model = $this->find($id);
        foreach ($model->multiLanguageFields() as $multiLanguageField) {
            foreach (get_languages() as $language => $value) {
                $field = $multiLanguageField . '_' . $language;
                $model->$field = $model->translate($language)->first()->$multiLanguageField;
            }
        }
        return $model;
    }
}
