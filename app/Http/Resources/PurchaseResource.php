<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'voucher_number' => $this->voucher_number,
            'supplier_id' => $this->supplier_id,
            'medicine_id' => $this->medicine_id,
            'status' => $this->status,
        ];
    }
}
