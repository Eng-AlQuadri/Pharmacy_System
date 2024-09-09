<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\MedicineController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\PurchaseController;
use App\Http\Controllers\Api\SupplierController;
use App\Http\Controllers\Api\UserController;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/doctors/count', [DoctorController::class, 'getCount']);

    Route::get('/patients/count', [PatientController::class, 'getCount']);

    Route::get('/medicines/count', [MedicineController::class, 'getCount']);

    Route::get('/suppliers/count', [SupplierController::class, 'getCount']);

    Route::get('/purchases/count', [PurchaseController::class, 'getCount']);

    Route::get('/invoices/count', [InvoiceController::class, 'getCount']);

    Route::apiResource('/doctors', DoctorController::class);

    Route::apiResource('/patients', PatientController::class);

    Route::apiResource('/suppliers', SupplierController::class);

    Route::apiResource('/medicines', MedicineController::class);

    Route::apiResource('/purchases', PurchaseController::class);

    Route::apiResource('/invoices', InvoiceController::class);

    Route::apiResource('/users', UserController::class);
});


Route::post('/signup', [AuthController::class, 'signup']);

Route::post('/login', [AuthController::class, 'login']);
