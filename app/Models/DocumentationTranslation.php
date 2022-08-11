<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\DocumentationTranslation
 *
 * @property int $id
 * @property int $doc_id
 * @property string $language
 * @property string $title
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationTranslation whereDocId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class DocumentationTranslation extends Model
{
  protected $table = 'doc_translations';
  protected $fillable = ['doc_id', 'language', 'title'];
}
