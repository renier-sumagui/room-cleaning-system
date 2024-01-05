<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\ImageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware("auth:sanctum")->get("/user", function (Request $request) {
    return $request->user();
});

Route::get("/employees", [EmployeeController::class, "index"]);
Route::get("/employees/non-admins", [EmployeeController::class, "getNonAdminEmployees"]);
Route::get("/employees/{employeeId}/rooms", [EmployeeController::class, "getEmployeeRooms"]);

Route::post("/employees/create", [EmployeeController::class, "addEmployee"]);
Route::post("/employees/login", [EmployeeController::class, "login"]);

Route::get("/rooms", [RoomController::class, "index"]);
Route::post("/rooms/create", [RoomController::class, "createRoomWithEmployees"]);

Route::post("/images/upload", [ImageController::class, "uploadImages"]);
Route::get("/images/room/{room_id}", [ImageController::class, "getPendingImages"]);
Route::post("/images/process", [ImageController::class, "processImage"]);