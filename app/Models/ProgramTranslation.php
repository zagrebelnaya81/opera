<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ProgramTranslation
 *
 * @property int $id
 * @property int $program_id
 * @property string $language
 * @property string $title
 * @property string $description
 * @property string|null $terms_description
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramTranslation whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramTranslation whereProgramId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramTranslation whereTermsDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProgramTranslation extends Model
{
  protected $fillable = ['program_id', 'language', 'title', 'description', 'terms_description', 'seo_title', 'seo_description'];
}
