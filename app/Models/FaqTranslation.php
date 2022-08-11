<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\FaqTranslation
 *
 * @property int $id
 * @property int $faq_id
 * @property string $language
 * @property string $title
 * @property string $description
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqTranslation whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqTranslation whereFaqId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class FaqTranslation extends Model
{
    protected $fillable = ['faq_id', 'language', 'title', 'description', 'seo_title', 'seo_description'];
}
