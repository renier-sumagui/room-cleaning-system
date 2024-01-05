<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = ['employee_id', 'room_id', 'status', 'local_path'];

    public function employee() {
        return $this->belongsTo(Employee::class);
    }

    public function room() {
        return $this->belongsTo(Employee::class);
    }
}
