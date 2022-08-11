<?php

namespace App\Models;

use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

/**
 * App\Models\ActorRole
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\MediaLibrary\Models\Media[] $media
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorRole newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorRole newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorRole query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorRole whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorRole whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorRole whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ActorRole extends MultiLanguageModel implements HasMedia
{
  use HasMediaTrait;

  protected $fillable = ['performance_id'];

  protected $multiLanguageForeignKey = 'actor_role_id';
  protected $multiLanguageLocalKey = 'id';

  public function multiLanguageModel()
  {
    return ActorRoleTranslation::class;
  }

  public function multiLanguageFields()
  {
    return ['title'];
  }

    public function performance()
    {
        return $this->belongsTo(Performance::class)->withDefault();
    }
}
