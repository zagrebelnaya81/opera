<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Faq
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property int $category_id
 * @property-read \App\Models\FaqCategory $category
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Faq newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Faq newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Faq query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Faq whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Faq whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Faq whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Faq whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Faq extends MultiLanguageModel
{

  protected $table = 'faq';
  protected $fillable = ['category_id'];
  protected $multiLanguageForeignKey = 'faq_id';
  protected $multiLanguageLocalKey = 'id';

  public function multiLanguageModel()
  {
    return FaqTranslation::class;
  }
  public function multiLanguageFields()
  {
    return ['title', 'description'];
  }
  public function category()
  {
    return $this->belongsTo(FaqCategory::class, 'category_id');
  }
}
