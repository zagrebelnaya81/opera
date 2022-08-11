<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\VideoCategory
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class VideoCategory extends MultiLanguageModel
{
  protected $multiLanguageForeignKey = 'video_category_id';
  protected $multiLanguageLocalKey = 'id';

  public function multiLanguageModel()
  {
    return VideoCategoryTranslation::class;
  }

  public function multiLanguageFields()
  {
    return ['title'];
  }

}
