<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\FaqCategory
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Faq[] $faqs
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FaqCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class FaqCategory extends MultiLanguageModel
{
  protected $multiLanguageForeignKey = 'faq_category_id';
  protected $multiLanguageLocalKey = 'id';

  public function multiLanguageModel()
  {
    return FaqCategoryTranslation::class;
  }

  public function multiLanguageFields()
  {
    return ['title'];
  }

  public  function faqs() {
    return $this->hasMany(Faq::class, 'category_id', 'id');
  }
}
