<?php

namespace App\Models;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Donation
 *
 * @property int $id
 * @property int $payment_id
 * @property string $payment_status
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string|null $phone
 * @property float $amount
 * @property string|null $comment
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $date_time
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Donation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Donation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Donation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Donation whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Donation whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Donation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Donation whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Donation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Donation whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Donation wherePaymentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Donation wherePaymentStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Donation wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Donation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Donation extends Model
{
    protected $fillable = ['payment_id', 'payment_status', 'first_name', 'last_name', 'phone', 'amount', 'comment'];

    protected $appends = ['date_time'];

    public function fullName() {
        return $this->last_name . ' ' . $this->first_name;
    }

    public function getDateTimeAttribute() {
        return Carbon::parse($this->created_at)->toDateTimeString();
    }
}
