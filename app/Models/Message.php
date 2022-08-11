<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Message
 *
 * @property int $id
 * @property int|null $read
 * @property int|null $send
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property string|null $description
 * @property string|null $answer
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Message newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Message newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Message query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Message whereAnswer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Message whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Message whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Message whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Message whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Message whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Message wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Message whereRead($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Message whereSend($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Message whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Message extends Model
{
  protected $fillable = ['read', 'name', 'title','phone','email', 'description','answer'];
}
