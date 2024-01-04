<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Room;

class RoomController extends Controller
{
    //
    public function index() {
        $rooms = Room::all();

        return response()->json(["rooms" => $rooms], 201);
    }

    public function createRoomWithEmployees(Request $request) {
        $validatedData = $request->validate([
            "room_number" => "required|string",
            "room_name" => "required|string",
            "capacity" => "required",
            "employee_ids" => "required|array",
            "employee_ids.*" => "exists:employees,id",
        ]);

        $room = Room::create([
            "room_number" => $validatedData["room_number"],
            "room_name" => $validatedData["room_name"],
            "capacity" => $validatedData["capacity"],
        ]);

        $room->employees()->sync($validatedData["employee_ids"]);

        return response()->json(["success" => true], 201);
    }

}
