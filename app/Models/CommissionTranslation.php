<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommissionTranslation extends Model
{
    protected $fillable = ['commission_id', 'language', 'title'];

    public $timestamps = false;
}
