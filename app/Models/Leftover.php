<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Leftover
 *
 * @property int $id
 * @property int $user_id
 * @property float $start_sum
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Leftover newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Leftover newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Leftover query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Leftover whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Leftover whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Leftover whereStartSum($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Leftover whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Leftover whereUserId($value)
 * @mixin \Eloquent
 */
class Leftover extends Model
{
    protected $fillable = ['user_id', 'start_sum'];

    public function user() {
        return $this->hasOne(User::class, 'user_id', 'id');
    }
}
