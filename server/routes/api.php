<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\StudentController;

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

// EMPLOYEES
Route::get("/employees", [EmployeeController::class, "index"]);
Route::get("/employees/non-admins", [EmployeeController::class, "getNonAdminEmployees"]);
Route::get("/employees/{employeeId}/rooms", [EmployeeController::class, "getEmployeeRooms"]);
Route::get("/employees/{employeeId}/students", [EmployeeController::class, "getAssignedStudents"]);
Route::get("/employees/{employeeId}/students/excel", [EmployeeController::class, "exportAssignedStudentsExcel"]);

Route::post("/employees/create", [EmployeeController::class, "addEmployee"]);
Route::post("/employees/login", [EmployeeController::class, "login"]);

// ROOMS
Route::get("/rooms", [RoomController::class, "index"]);
Route::post("/rooms/create", [RoomController::class, "createRoomWithEmployees"]);


// IMAGES
Route::get("/images/room/accepted/{room_id}", [ImageController::class, "getAcceptedImages"]);
Route::get("/images/room/{room_id}", [ImageController::class, "getPendingImages"]);
Route::post("/images/upload", [ImageController::class, "uploadImages"]);
Route::post("/images/process", [ImageController::class, "processImage"]);

// STUDENTS
Route::get("/students/all", [StudentController::class, "getAllStudents"]);
Route::post("/students/create", [StudentController::class, "createStudent"]);
Route::post("/students/excel-update", [StudentController::class, "excelUpdate"]);