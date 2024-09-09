<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MedicineResourse extends JsonResource
{

    public static $wrap = false;

    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'packing' => $this->packing,
            'exp_date' => $this->exp_date,
            'in_stock' => $this->in_stock
        ];
    }
}
