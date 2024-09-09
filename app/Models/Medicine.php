<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'packing',
        'exp_date',
        'in_stock'
    ];

    public function suppliers()
    {
        return $this->belongsToMany(Supplier::class, 'supplier_medicines');
    }

    public function purchase()
    {
        return $this->belongsTo(Purchase::class, 'medicine_id');
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class, 'medicine_id');
    }
}
