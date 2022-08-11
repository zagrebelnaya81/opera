<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ServiceTranslation
 *
 * @property int $id
 * @property int $service_id
 * @property string $language
 * @property string $title
 * @property string $description
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ServiceTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ServiceTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ServiceTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ServiceTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ServiceTranslation whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ServiceTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ServiceTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ServiceTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ServiceTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ServiceTranslation whereServiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ServiceTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ServiceTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ServiceTranslation extends Model
{
  protected $fillable = ['service_id', 'language', 'title', 'description', 'seo_title', 'seo_description'];
}
