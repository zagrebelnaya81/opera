<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ArticleActor
 *
 * @property int $id
 * @property int $article_id
 * @property int $actor_id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleActor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleActor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleActor query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleActor whereActorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleActor whereArticleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleActor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleActor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleActor whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ArticleActor extends Model
{
    protected $fillable = ['article_id', 'actor_id'];
}
