<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'patient_id' => $this->patient_id,
            'medicine_id' => $this->medicine_id,
            'date' => $this->date,
            'quantity' => $this->quantity
        ];
    }
}
