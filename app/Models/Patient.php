<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use app\Models\Doctors;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone_number',
        'address',
        'doctor_ID'
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctor_ID');
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class, 'patient_id');
    }
}
