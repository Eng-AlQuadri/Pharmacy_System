<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupplierMedicines extends Model
{
    use HasFactory;

    protected $fillable = [
        'medicine_id',
        'supplier_id'
    ];

    // public function purchase()
    // {
    //     return $this->belongsTo(Purchase::class, 'supplier_medicines');
    // }
}
