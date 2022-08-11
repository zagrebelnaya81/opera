<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PerformanceActor
 *
 * @property int $id
 * @property int $performance_calendar_id
 * @property int $actor_id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property int|null $actor_role_id
 * @property-read \App\Models\Actor $actor
 * @property-read \App\Models\PerformanceCalendar $date
 * @property-read mixed $fullname
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Performance[] $performance
 * @property-read \App\Models\ActorRole $role
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceActor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceActor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceActor query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceActor whereActorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceActor whereActorRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceActor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceActor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceActor wherePerformanceCalendarId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceActor whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PerformanceActor extends Model
{
    protected $fillable = ['performance_calendar_id', 'actor_id', 'actor_role_id'];

    public function performance() {
      return $this->belongsToMany(Performance::class, 'performance_calendars', 'id', 'performance_id', 'performance_calendar_id');
    }

    public function date() {
      return $this->hasOne(PerformanceCalendar::class, 'id', 'performance_calendar_id');
    }

    public function actor() {
      return $this->belongsTo(Actor::class)->withDefault();
    }

    public function role() {
      return $this->belongsTo(ActorRole::class);
    }

    public function getFullnameAttribute() {
      return $this->actor->fullName;
    }
}
