<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $primaryKey = 'doctorID'; // Tell Eloquent to use doctorID as the primary key
    public $incrementing = true; // If doctorID is auto-incrementing
    protected $keyType = 'int'; // Ensure it's treated as an integer

    protected $fillable = [
        'name',
        'specialization',
        'address',
        'phone_number'
    ];
}
