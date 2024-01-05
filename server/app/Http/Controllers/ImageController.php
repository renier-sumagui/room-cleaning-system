<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Exception;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;

use App\Mail\AcceptanceEmail;
use App\Mail\RejectionEmail;

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
            $from = "studyfilteam@gmail.com";
            $to = $data["email"];
            $topic = "Accepted";
            $message = "Your image was accepted";
    
            $email = new \SendGrid\Mail\Mail(); 
            $email->setFrom("studyfilteam@gmail.com", "Cleaning Room System");
            $email->setSubject("Image Accepted");
            $email->addTo($to, $to);
            $email->addContent("text/plain", "{$message}");
            $email->addContent(
                "text/html", "{$message}"
            );
            $sendgrid = new \SendGrid(getenv("SENDGRID_API_KEY"));
            try {
                $response = $sendgrid->send($email);
                return response()->json(["success" => true]);
            } catch (Exception $e) {
                return response(['Caught exception: '. $e->getMessage() ."\n"]);
            }
        } else {
            $this->deleteImage($image);

            $from = "studyfilteam@gmail.com";
            $to = $data["email"];
            $topic = "Rejected";
            $message = "Your image was rejected";
    
            $email = new \SendGrid\Mail\Mail(); 
            $email->setFrom("studyfilteam@gmail.com", "Cleaning Room System");
            $email->setSubject("Image Rejected");
            $email->addTo($to, $to);
            $email->addContent("text/plain", "{$message}");
            $email->addContent(
                "text/html", "{$message}"
            );
            $sendgrid = new \SendGrid(getenv("SENDGRID_API_KEY"));
            try {
                $response = $sendgrid->send($email);
                return response()->json(["success" => true]);
            } catch (Exception $e) {
                return response(['Caught exception: '. $e->getMessage() ."\n"]);
            }
        }
    
        // return response()->json(["success" => true]);
    }

    protected function acceptImage(Image $image, $employeeEmail) {
        $image->update(["status" => "accepted"]);
        


    }

    protected function rejectImage(Image $image, $employeeEmail) {
        $this->deleteImage($image);
        
        Mail::to($employeeEmail)->send(new RejectionEmail($employeeEmail));
    }

    protected function deleteImage(Image $image) {
        Storage::disk("public")->delete($image->local_path);
        $image->delete();
    }
}
