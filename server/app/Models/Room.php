<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Employee;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        "room_number",
        "room_name",
        "capacity",
    ];

    public function employees() {
        return $this->belongsToMany(Employee::class)->withTimestamps();
    }
}
