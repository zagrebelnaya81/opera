<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\BannerTranslation
 *
 * @property int $id
 * @property int $banner_id
 * @property string $language
 * @property string $title
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BannerTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BannerTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BannerTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BannerTranslation whereBannerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BannerTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BannerTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BannerTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BannerTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BannerTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class BannerTranslation extends Model
{
    protected $fillable = ['banner_id', 'language', 'title'];
}
