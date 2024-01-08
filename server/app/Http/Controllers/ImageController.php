<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Exception;
use Illuminate\Support\Facades\Storage;

use SendGrid;

class ImageController extends Controller
{
    public function uploadImages(Request $request) {
        $request->validate([
            "images.*" => "required|image|mimes:jpeg,png,jpg,gif",
        ]);

        $employeeId = $request->input("employee_id");
        $roomId = $request->input("room_id");
        
        foreach ($request->file("images") as $file) {
            $path = $file->store("images", "public");

            Image::create([
                "employee_id" => $employeeId,
                "room_id" => $roomId,
                "status" => "pending",
                "local_path" => $path,
            ]);
        }

        return response()->json(["success" => true]);
    }

    public function getAcceptedImages($room_id) {
        $acceptedImages = Image::where("room_id", $room_id)
            ->where("status", "accepted")
            ->with("employee")
            ->get();

        $response = $acceptedImages->map(function ($image) {
            return [
                "id" => $image->id,
                "image_url" => $this->getImageUrl($image->local_path), 
                "uploaded_by" => [
                    "first_name" => $image->employee->first_name,
                    "last_name" => $image->employee->last_name
                ]
            ];
        });

        return response()->json($response);
    }

    public function getPendingImages($room_id) {
        $pendingImages = Image::where("room_id", $room_id)
            ->where("status", "pending")
            ->with("employee")
            ->get();

        $response = $pendingImages->map(function ($image) {
            return [
                "id" => $image->id,
                "employee_id" => $image->employee_id,
                "first_name" => $image->employee->first_name,
                "last_name" => $image->employee->last_name,
                "email" => $image->employee->email,
                "room_id" => $image->room_id,
                "status" => $image->status,
                "image_url" => $this->getImageUrl($image->local_path), 
            ];
        });

        return response()->json($response);
    }

    private function getImageUrl($localPath) {
        return asset(Storage::url($localPath));
    }

    public function processImage(Request $request) {
        $data = $request->validate([
            "id" => "required|exists:images,id",
            "email" => "required|email",
            "status" => "required|in:accept,reject",
        ]);
    
        $image = Image::findOrFail($data["id"]);
        
        if ($data["status"] === "accept") {
            $image->status = "accepted";
            $image->save();
    
            try {
                $this->sendAcceptImageEmail($data["email"]);
                return response()->json(["success" => true]);
            } catch (Exception $e) {
                return response(['Caught exception: '. $e->getMessage() ."\n"]);
            }
        } else {
            try {
                $this->rejectImageEmail($data["email"]);
                $this->deleteImage($image);
                return response()->json(["success" => true]);
            } catch (Exception $e) {
                return response(['Caught exception: '. $e->getMessage() ."\n"]);
            }
        }
    }

    protected function sendAcceptImageEmail($employeeEmail) {
        $message = "Your image was accepted";

        $email = new \SendGrid\Mail\Mail(); 
        $email->setFrom("studyfilteam@gmail.com", "Cleaning Room System");
        $email->setSubject("Image Accepted");
        $email->addTo($employeeEmail, $employeeEmail);
        $email->addContent("text/plain", "{$message}");
        $email->addContent("text/html", "{$message}");

        $sendgrid = new \SendGrid(getenv("SENDGRID_API_KEY"));

        $sendgrid->send($email);
        return ["success" => true];
    }

    protected function rejectImageEmail($employeeEmail) {
        $message = "Your image was rejected";

        $email = new \SendGrid\Mail\Mail(); 
        $email->setFrom("studyfilteam@gmail.com", "Cleaning Room System");
        $email->setSubject("Image Rejected");
        $email->addTo($employeeEmail, $employeeEmail);
        $email->addContent("text/plain", "{$message}");
        $email->addContent("text/html", "{$message}");

        $sendgrid = new \SendGrid(getenv("SENDGRID_API_KEY"));

        $sendgrid->send($email);
        return ["success" => true];
    }

    protected function deleteImage(Image $image) {
        if (Storage::disk('public')->exists($image->local_path)) {
            try {
                Storage::disk('public')->delete($image->local_path);
            } catch (\Exception $e) {
                return $e;
            }
            $image->delete();
        }
    }
}
