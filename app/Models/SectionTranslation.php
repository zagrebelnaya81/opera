<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\SectionTranslation
 *
 * @property int $id
 * @property int $section_id
 * @property string $language
 * @property string $title
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SectionTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SectionTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SectionTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SectionTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SectionTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SectionTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SectionTranslation whereSectionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SectionTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SectionTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class SectionTranslation extends Model
{
    protected $fillable = ['section_id', 'language', 'title'];
}
