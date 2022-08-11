<?php

namespace App\Models;

/**
 * App\Models\Country
 *
 * @property int $id
 * @property string $code
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Country newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Country newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Country query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Country whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Country whereId($value)
 * @mixin \Eloquent
 */
class Country extends MultiLanguageModel
{
    protected $fillable = ['code'];

    public $timestamps = false;

    protected $multiLanguageForeignKey = 'country_id';
    protected $multiLanguageLocalKey = 'id';

    public function multiLanguageModel()
    {
        return CountryTranslation::class;
    }

    public function multiLanguageFields()
    {
        return ['title'];
    }
}
