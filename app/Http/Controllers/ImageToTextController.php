<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageToTextController extends Controller
{
    //\OCR::scan($imagePath);

    public function image()
    {
        return view('lara_ocr.upload_image');
    }
    public function convertImageToText(Request $request)
    {

    }
}
