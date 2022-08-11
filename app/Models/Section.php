<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Section
 *
 * @property int $id
 * @property int $number
 * @property int $hall_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Hall $hall
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Row[] $rows
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Section newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Section newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Section query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Section whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Section whereHallId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Section whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Section whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Section whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Section extends MultiLanguageModel
{
    protected $fillable = ['number'];

    protected $multiLanguageForeignKey = 'section_id';
    protected $multiLanguageLocalKey = 'id';

    public function multiLanguageModel()
    {
        return SectionTranslation::class;
    }

    public function multiLanguageFields()
    {
        return ['title'];
    }

    public function hall() {
        return $this->belongsTo(Hall::class, 'hall_id');
    }

    public function rows() {
        return $this->hasMany(Row::class, 'section_id');
    }
}
