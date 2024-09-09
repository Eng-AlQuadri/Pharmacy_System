<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use App\Http\Resources\InvoiceResource;
use App\Models\Medicine;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return InvoiceResource::collection(
            Invoice::all()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvoiceRequest $request)
    {
        $data = $request->validated();

        $medicine = Medicine::findOrFail($request->medicine_id);

        // Check if the requested quantity is available
        if ((int)$medicine->in_stock < (int)$request->quantity) {

            return response()->json([

                'errors' => ['quantity' => ['Requested quantity exceeds available stock']]

            ], 422);
        }

        // Deduct the quantity from the medicine's stock
        (int)$medicine->in_stock -= (int)$request->quantity;

        $medicine->save();  // Save the updated stock

        $invoice = Invoice::create($data);

        return response(new InvoiceResource($invoice), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        return new InvoiceResource($invoice);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvoiceRequest $request, Invoice $invoice)
    {
        $data = $request->validated();

        $invoice->update($data);

        return new InvoiceResource($invoice);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return response('', 204);
    }

    public function getCount()
    {
        $invoiceCount = Invoice::count();

        return response()->json(['count' => $invoiceCount]);
    }
}
