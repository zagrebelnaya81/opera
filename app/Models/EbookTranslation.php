<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\EbookTranslation
 *
 * @property int $id
 * @property int $ebook_id
 * @property string $language
 * @property string $title
 * @property string|null $file
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\EbookTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\EbookTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\EbookTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\EbookTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\EbookTranslation whereEbookId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\EbookTranslation whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\EbookTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\EbookTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\EbookTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\EbookTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class EbookTranslation extends Model
{
  protected $fillable = ['ebook_id', 'language', 'title','file'];
}
