<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ArticleCategory
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property string $page
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategory wherePage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ArticleCategory extends MultiLanguageModel
{
    protected $fillable = ['page'];
    protected $multiLanguageForeignKey = 'article_category_id';
    protected $multiLanguageLocalKey = 'id';

    public function multiLanguageModel()
    {
      return ArticleCategoryTranslation::class;
    }

    public function multiLanguageFields()
    {
      return ['title'];
    }

    protected function articles() {
      return $this->hasMany(Article::class, 'category_id', 'id');
    }
}
