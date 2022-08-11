<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ProjectCategory
 *
 * @property int $id
 * @property string|null $name
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project[] $projects
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProjectCategory extends MultiLanguageModel
{
  protected $table = 'project_cats';
  protected $multiLanguageForeignKey = 'project_cat_id';
  protected $multiLanguageLocalKey = 'id';

  public function multiLanguageModel()
  {
    return ProjectCategoryTranslation::class;
  }

  public function multiLanguageFields()
  {
    return ['title'];
  }

  public  function projects() {
    return $this->hasMany(Project::class, 'category_id', 'id');
  }
}
