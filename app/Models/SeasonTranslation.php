<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\SeasonTranslation
 *
 * @property int $id
 * @property int $season_id
 * @property string $language
 * @property string $title
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeasonTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeasonTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeasonTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeasonTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeasonTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeasonTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeasonTranslation whereSeasonId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeasonTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeasonTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class SeasonTranslation extends Model
{
  protected $fillable = ['season_id', 'language', 'title'];
}
