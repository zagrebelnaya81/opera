<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\CountryTranslation
 *
 * @property int $id
 * @property int $country_id
 * @property string $language
 * @property string $title
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CountryTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CountryTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CountryTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CountryTranslation whereCountryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CountryTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CountryTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CountryTranslation whereTitle($value)
 * @mixin \Eloquent
 */
class CountryTranslation extends Model
{
  protected $fillable = ['country_id', 'language', 'title'];

  public $timestamps = false;
}
