<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeeRoomTable extends Migration
{
    public function up()
    {
        Schema::create('employee_room', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('employee_id');
            $table->unsignedBigInteger('room_id');
            $table->boolean('is_admin');
            $table->timestamps();

            $table->foreign('employee_id')->references('id')->on('employees')->onDelete('cascade');
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');

            $table->unique(['employee_id', 'room_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('employee_room');
    }
}