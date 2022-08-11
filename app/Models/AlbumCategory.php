<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\AlbumCategory
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Album[] $albums
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class AlbumCategory extends MultiLanguageModel
{
    protected $multiLanguageForeignKey = 'album_category_id';
    protected $multiLanguageLocalKey = 'id';

    public function multiLanguageModel()
    {
      return AlbumCategoryTranslation::class;
    }

    public function multiLanguageFields()
    {
      return ['title'];
    }

    public function albums() {
      return $this->hasMany(Album::class, 'category_id', 'id');
    }

}
