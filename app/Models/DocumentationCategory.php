<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\DocumentationCategory
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Documentation[] $documentations
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class DocumentationCategory extends MultiLanguageModel
{
  protected $table = 'doc_categories';
  protected $multiLanguageForeignKey = 'doc_category_id';
  protected $multiLanguageLocalKey = 'id';

  public function multiLanguageModel()
  {
    return DocumentationCategoryTranslation::class;
  }

  public function multiLanguageFields()
  {
    return ['title'];
  }

  public  function documentations() {
    return $this->hasMany(Documentation::class, 'category_id', 'id');
  }
}
