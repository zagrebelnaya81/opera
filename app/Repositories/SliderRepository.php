<?php

namespace App\Repositories;
use App\Models\SliderTranslation;

class SliderRepository extends Repository
{
  /**
   * Specify Model class name
   *
   * @return mixed
   */
  function model()
  {
    return 'App\Models\Slider';
  }

  public function createSlide($data)
  {
    $slide = [
      'page_url' => $data['page_url'],
    ];

    $slide = $this->create($slide);

      $this->addTranslationSlide($data, $slide);

    return $slide;
  }

  public function editSlide($data, $slide)
  {
    $array = [
        'page_url' => $data['page_url'],
    ];
    $this->update($array, ['id' => $slide->id]);

    $this->editTranslationSlide($data, $slide);
  }

  public function addTranslationSlide($data, $slide)
  {
    foreach(get_languages() as $lang => $val) {
      SliderTranslation::create([
        'slider_id' => $slide->id,
        'language' => $lang,
        'title' => $data['title_' . $lang],
      ]);
    }
  }

  public function editTranslationSlide($data, $slide)
  {
    foreach(get_languages() as $lang => $val) {
      $slideTranslation = SliderTranslation::where(['slider_id' => $slide->id, 'language' => $lang])->first();
        $slideTranslation->update([
        'slider_id' => $slide->id,
        'language' => $lang,
        'title' => $data['title_' . $lang],
      ]);
    }
  }
}
