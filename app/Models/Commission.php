<?php

namespace App\Models;

class Commission extends MultiLanguageModel
{
    protected $fillable = ['size'];

    public $timestamps = false;

    protected $multiLanguageForeignKey = 'commission_id';
    protected $multiLanguageLocalKey = 'id';

    public function multiLanguageModel()
    {
        return CommissionTranslation::class;
    }

    public function multiLanguageFields()
    {
        return ['title'];
    }
}
