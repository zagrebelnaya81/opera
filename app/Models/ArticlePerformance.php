<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ArticlePerformance
 *
 * @property int $id
 * @property int $article_id
 * @property int $performance_id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticlePerformance newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticlePerformance newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticlePerformance query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticlePerformance whereArticleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticlePerformance whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticlePerformance whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticlePerformance wherePerformanceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticlePerformance whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ArticlePerformance extends Model
{
    protected $fillable = ['article_id', 'performance_id'];
}
