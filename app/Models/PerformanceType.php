<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App;

/**
 * App\Models\PerformanceType
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property string $name
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceType query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceType whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PerformanceType extends Model
{
    protected $fillable = ['name'];
    public function translate($language = null)
    {
        if (!$language) {
            $language = App::getLocale();
        }
        return $this->hasOne('App\Models\PerformanceTypeTranslation', 'performance_type_id', 'id')
          ->where('language', $language);
    }
}
