<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Distributor
 *
 * @property int $id
 * @property string $title
 * @property string|null $email
 * @property int|null $phone
 * @property string $color_code
 * @property int|null $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Distributor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Distributor newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Distributor onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Distributor query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Distributor whereColorCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Distributor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Distributor whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Distributor whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Distributor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Distributor wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Distributor whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Distributor whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Distributor whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Distributor withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Distributor withoutTrashed()
 * @mixin \Eloquent
 */
class Distributor extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    const INDIVIDUAL_ENTREPRENEUR = 'individual_entrepreneur';
    const REMOTE_CASH_BOX = 'remote_cash_box';
    const COMPANY = 'company';

    const TYPES = [
        self::INDIVIDUAL_ENTREPRENEUR => 'Фізична особа-підприємець',
        self::REMOTE_CASH_BOX => 'Віддалена каса',
        self::COMPANY => 'Компанія',
    ];

    protected $fillable = ['title', 'email', 'phone', 'color_code', 'user_id', 'is_active', 'type'];

    protected $appends = ['token'];

    public static function types() {
        return self::TYPES;
    }

    public function getType() {
        return self::TYPES[$this->type];
    }

    public function getEntityTypeAttribute()
    {
        return $this->getType();
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function getTokenAttribute()
    {
        return $this->user->token();
    }
}
