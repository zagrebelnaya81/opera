<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

/**
 * App\Models\HallTranslation
 *
 * @property int $id
 * @property int $hall_id
 * @property string $language
 * @property string $title
 * @property string $description
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property string|null $slug
 * @property string|null $file_description
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallTranslation whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallTranslation whereFileDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallTranslation whereHallId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class HallTranslation extends Model
{
    use Sluggable;
    protected $fillable = ['hall_id', 'language', 'title', 'description', 'seo_title', 'seo_description', 'file_description'];

    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'title',
            ]
        ];
    }
}
