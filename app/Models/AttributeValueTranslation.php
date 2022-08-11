<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\AttributeValueTranslation
 *
 * @property int $id
 * @property int $attribute_value_id
 * @property string $language
 * @property string $title
 * @property string $descriptions
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AttributeValueTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AttributeValueTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AttributeValueTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AttributeValueTranslation whereAttributeValueId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AttributeValueTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AttributeValueTranslation whereDescriptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AttributeValueTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AttributeValueTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AttributeValueTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AttributeValueTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class AttributeValueTranslation extends Model
{
  protected $fillable = ['attribute_value_id', 'language', 'title', 'descriptions'];
}
