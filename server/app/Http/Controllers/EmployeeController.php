<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Employee;

class EmployeeController extends Controller
{
    //
    public function index() {
        $employees = Employee::all();

        return response()->json(["employees" => $employees], 200);
    }

    public function addEmployee(Request $request) {
        $validatedData = $request->validate([
            "employee_id" => "required|string|unique:employees",
            "first_name" => "required|string",
            "last_name" => "required|string",
            "email" => "required|string|unique:employees",
            "password" => "required",
            "birthday" => "required|date",
            "contact_number" => "required|digits:11"
        ]);

        $validatedData["password"] = bcrypt($request["password"]);

        $employee = new Employee($validatedData);
        $employee->save();

        return response()->json(["success" => true], 200);
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            "employee_id" => "required|string",
            "password" => "required|string",
        ]);

        $credentials = $validatedData;

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            return response()->json(["success" => true, "user" => $user], 200);
        } else {
            return response()->json(["success" => false, "message" => "Invalid credentials"], 401);
        }
    }

    public function getNonAdminEmployees() {
        $nonAdminEmployees = Employee::nonAdmins();

        return response()->json(["non_admin_employees" => $nonAdminEmployees], 200);
    }

    public function getEmployeeRooms($id) {
        $employee = Employee::where("id", $id)->first();
    
        if (!$employee) {
            return response()->json(["message" => "Employee not found"], 404);
        }
    
        $rooms = $employee->rooms;
    
        return response()->json(["rooms" => $rooms], 200);
    }
}
