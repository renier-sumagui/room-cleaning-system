<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Imports\StudentsImport;
use Maatwebsite\Excel\Facades\Excel;

class StudentController extends Controller
{
    //
    public function createStudent(Request $request) {
        $validatedData = $request->validate([
            "firstName" => "string|required",
            "lastName" => "string|required",
            "email" => "string|required|unique:students",
            "birthday" => "date|required",
            "teachers" => "required|array",
            "teachers" => "exists:employees,id"
        ]);

        $student = Student::create([
            "first_name" => $validatedData["firstName"],
            "last_name" => $validatedData["lastName"],
            "email" => $validatedData["email"],
            "birthday" => $validatedData["birthday"]
        ]);

        $student->employees()->attach($validatedData["teachers"], ['created_at' => now(), 'updated_at' => now()]);

        return response()->json(["success" => true]);
    }

    public function getAllStudents() {
        $students = Student::all();

        return response()->json($students);
    }

    public function excelUpdate(Request $request) {
        $request->validate([
            'formData' => 'required|mimes:xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]);

        $file = $request->file("formData");

        $data = Excel::toArray([], $file);

        $arr = [];

        foreach($data[0] as $row) {
            $student = Student::find($row[0]);
            $grade = $row[5];
            $status = "";

            if ($student !== null) {
                if ($grade !== null) {
                    if ($grade >= 5) {
                        $status = "Passed";
                    } else {
                        $status = "Failed";
                    }

                    $student->grade = $grade;
                    $student->status = $status;
                    $student->save();
                }
            }
        }

        return response()->json(["success" => true]);
    }
}


