<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DocumentationCategory;

/**
 * App\Models\Documentation
 *
 * @property int $id
 * @property string|null $file
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property int $category_id
 * @property-read \App\Models\DocumentationCategory $category
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Documentation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Documentation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Documentation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Documentation whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Documentation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Documentation whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Documentation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Documentation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Documentation extends MultiLanguageModel
{
  protected $table = 'docs';
  protected $fillable = ['category_id','file'];
  protected $multiLanguageForeignKey = 'doc_id';
  protected $multiLanguageLocalKey = 'id';

  public function multiLanguageModel()
  {
    return DocumentationTranslation::class;
  }
  public function multiLanguageFields()
  {
    return ['title'];
  }
  public function category()
  {
    return $this->belongsTo(DocumentationCategory::class, 'category_id');
  }
  protected function documentation() {
    return $this->hasMany(Documentation::class, 'doc_id', 'id');
  }
  public function shortDescription($сharacterNumber) {
    return str_limit($this->translate->title, $сharacterNumber);
  }
}
