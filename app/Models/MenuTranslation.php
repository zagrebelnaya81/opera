<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\MenuTranslation
 *
 * @property int $id
 * @property int $menu_id
 * @property string $language
 * @property string $menu
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MenuTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MenuTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MenuTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MenuTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MenuTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MenuTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MenuTranslation whereMenu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MenuTranslation whereMenuId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MenuTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class MenuTranslation extends Model
{
    protected $fillable = ['menu_id', 'language', 'menu'];
}
