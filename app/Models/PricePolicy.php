<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PricePolicy extends Model
{
    use SoftDeletes;

    public $timestamps = false;

    protected $fillable = ['name', 'size', 'color_code'];
}
