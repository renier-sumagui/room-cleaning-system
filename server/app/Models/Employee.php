<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Room;

class Employee extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        "employee_id",
        "is_admin",
        "first_name",
        "last_name",
        "email",
        "password",
        "birthday",
        "contact_number",
    ];

    protected $hidden = [
        "password",
        "birthday"
    ];

    public static function nonAdmins() {
        return self::where("is_admin", false)->get();
    }

    public function rooms() {
        return $this->belongsToMany(Room::class, "employee_room", "employee_id", "room_id");
    }

    public function students() {
        return $this->belongsToMany(Student::class);
    }
}