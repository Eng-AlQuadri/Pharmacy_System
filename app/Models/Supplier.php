<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'address',
        'contact_number'
    ];

    public function medicines()
    {
        return $this->belongsToMany(Medicine::class, 'supplier_medicines');
    }

    public function purchase()
    {
        return $this->belongsTo(Purchase::class, 'supplier_id');
    }
}
