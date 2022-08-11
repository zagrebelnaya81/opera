<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\SettingTranslation
 *
 * @property int $id
 * @property int $setting_id
 * @property string $language
 * @property string $title
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SettingTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SettingTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SettingTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SettingTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SettingTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SettingTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SettingTranslation whereSettingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SettingTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SettingTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class SettingTranslation extends Model
{
    protected $fillable = ['setting_id', 'language', 'title'];
}
