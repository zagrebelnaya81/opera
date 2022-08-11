<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\FaqCategoryTranslation
 *
 * @property int $id
 * @property int $faq_category_id
 * @property string $language
 * @property string $title
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqCategoryTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqCategoryTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqCategoryTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqCategoryTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqCategoryTranslation whereFaqCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqCategoryTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqCategoryTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqCategoryTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqCategoryTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class FaqCategoryTranslation extends Model
{
  protected $fillable = ['faq_category_id', 'language', 'title'];

}
