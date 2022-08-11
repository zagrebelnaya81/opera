<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ProjectCategoryTranslation
 *
 * @property int $id
 * @property int $project_cat_id
 * @property string $language
 * @property string $title
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectCategoryTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectCategoryTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectCategoryTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectCategoryTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectCategoryTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectCategoryTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectCategoryTranslation whereProjectCatId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectCategoryTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectCategoryTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProjectCategoryTranslation extends Model
{
  protected $table = 'project_cat_translations';
  protected $fillable = ['project_cat_id', 'language', 'title'];
}
