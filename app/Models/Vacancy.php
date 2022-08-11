<?php

namespace App\Models;

/**
 * App\Models\Vacancy
 *
 * @property int $id
 * @property int|null $is_active
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vacancy newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vacancy newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vacancy query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vacancy whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vacancy whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vacancy whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vacancy whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Vacancy extends multiLanguageModel
{
  protected $fillable = ['is_active'];
  protected $multiLanguageForeignKey = 'vacancy_id';
  protected $multiLanguageLocalKey = 'id';

  public function multiLanguageModel()
  {
    return VacancyTranslation::class;
  }
  public function multiLanguageFields()
  {
    return ['title', 'description', 'add_description'];
  }
  public function shortDescription($сharacterNumber) {
    return str_limit($this->translate->description, $сharacterNumber);
  }
}
