<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

/**
 * App\Models\TicketTemplate
 *
 * @property int $id
 * @property string $title
 * @property string $json_code
 * @property int $width
 * @property int $height
 * @property int $is_active_cash_box
 * @property int $is_active_online
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\MediaLibrary\Models\Media[] $media
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TicketTemplate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TicketTemplate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TicketTemplate query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TicketTemplate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TicketTemplate whereHeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TicketTemplate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TicketTemplate whereIsActiveCashBox($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TicketTemplate whereIsActiveOnline($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TicketTemplate whereJsonCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TicketTemplate whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TicketTemplate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TicketTemplate whereWidth($value)
 * @mixin \Eloquent
 */
class TicketTemplate extends Model implements HasMedia
{
    use HasMediaTrait;

    protected $fillable = ['title', 'json_code', 'html_code', 'width', 'height', 'is_active_cash_box', 'is_active_online'];

    public function registerMediaCollections() {
        $this->addMediaCollection('posters');
    }
}
