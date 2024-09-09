<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DoctorResource extends JsonResource
{

    public static $wrap = false;

    public function toArray(Request $request)
    {
        return [
            'doctorID' => $this->doctorID,
            'name' => $this->name,
            'specialization' => $this->specialization,
            'address' => $this->address,
            'phone_number' => $this->phone_number
        ];
    }
}
