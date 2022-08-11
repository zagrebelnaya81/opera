<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'template_id'
    ];

    public function template(){
        return $this->belongsTo(ReportConstructor::class, 'template_id');
    }
}
