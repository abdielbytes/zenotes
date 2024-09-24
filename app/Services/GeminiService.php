<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use GenerativeAI\Gemini;

class GeminiService
{
    protected $gemini;

    public function __construct()
    {
        $apiKey = config('services.gemini.api_key');
        $this->gemini = new Gemini(['apiKey' => $apiKey]);
    }

    public function formatText($text)
    {
        try {
            $response = $this->gemini->models->gemini->generate([
                'prompt' => $text,
                // Adjust maxTokens and temperature as needed
                'maxTokens' => 1024,
                'temperature' => 0.7,
            ]);

            return $response->data->generatedText;
        } catch (\Exception $e) {
            Log::error('Gemini API error:', ['message' => $e->getMessage()]);
            return null; // Or handle the error in a more appropriate way
        }
    }
}
