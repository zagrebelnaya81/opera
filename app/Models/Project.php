<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\Models\Media;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\HasMedia;

/**
 * App\Models\Project
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property int $category_id
 * @property-read \App\Models\ProjectCategory $category
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\MediaLibrary\Models\Media[] $media
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Project whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Project extends MultiLanguageModel implements HasMedia
{
  use HasMediaTrait;
  protected $table = 'projects';
  protected $fillable = ['category_id'];
  protected $multiLanguageForeignKey = 'project_id';
  protected $multiLanguageLocalKey = 'id';

  public function multiLanguageModel()
  {
    return ProjectTranslation::class;
  }
  public function multiLanguageFields()
  {
    return ['title','description'];
  }
  public function registerMediaCollections()
  {
    $this->addMediaCollection('posters')->registerMediaConversions(function (Media $media) {
      $this->addMediaConversion('thumb')->fit(Manipulations::FIT_CROP, 150, 150);
      $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 420, 275);
    });
  }
  public function category()
  {
    return $this->belongsTo(ProjectCategory::class, 'category_id');
  }
  protected function project() {
    return $this->hasMany(Project::class, 'project_id', 'id');
  }
  public function shortDescription($сharacterNumber) {
    return str_limit($this->translate->description, $сharacterNumber);
  }
}
