<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Medicine;
use App\Http\Requests\StoreMedicineRequest;
use App\Http\Requests\UpdateMedicineRequest;
use App\Http\Resources\MedicineResourse;
use PHPUnit\Framework\Attributes\Medium;

class MedicineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return MedicineResourse::collection(
            Medicine::all()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMedicineRequest $request)
    {
        $data = $request->validated();

        $medicine = Medicine::create($data);

        return response(new MedicineResourse($medicine), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Medicine $medicine)
    {
        return new MedicineResourse($medicine);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMedicineRequest $request, Medicine $medicine)
    {
        $data = $request->validated();

        $medicine->update($data);

        return new MedicineResourse($medicine);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Medicine $medicine)
    {
        $medicine->delete();

        return response('', 204);
    }

    public function getCount()
    {
        $medicineCount = Medicine::count();

        return response()->json(['count' => $medicineCount]);
    }
}
