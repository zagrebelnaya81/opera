<?php

namespace App\Models;

/**
 * App\Models\PartnerCategory
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Partner[] $partners
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PartnerCategory extends MultiLanguageModel
{
  protected $multiLanguageForeignKey = 'partner_category_id';
  protected $multiLanguageLocalKey = 'id';

  public function multiLanguageModel()
  {
    return PartnerCategoryTranslation::class;
  }

  public function multiLanguageFields()
  {
    return ['title'];
  }

  public function partners() {
    return $this->hasMany(Partner::class, 'category_id', 'id');
  }

}
