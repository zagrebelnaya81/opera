<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Season
 *
 * @property int $id
 * @property int $number
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Album[] $albums
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Season newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Season newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Season query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Season whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Season whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Season whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Season whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Season extends MultiLanguageModel
{
  protected $fillable = ['number'];

  protected $multiLanguageForeignKey = 'season_id';
  protected $multiLanguageLocalKey = 'id';

  public function multiLanguageModel()
  {
    return SeasonTranslation::class;
  }

  public function multiLanguageFields()
  {
    return ['title'];
  }

  public function albums() {
    return $this->hasMany(Album::class, 'category_id', 'id');
  }

}
