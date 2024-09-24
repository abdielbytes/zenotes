<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Http;



class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notes = Note::where('user_id', auth()->id())
            ->select('id', 'title', 'created_at')
            ->latest()
            ->paginate(10);
        return Inertia::render('Notes/Index', ['notes' => $notes]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Notes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'required|string',
        ]);
        $validated['title'] = $validated['title'] ?? 'Untitled Note';
        Note::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'user_id' => auth()->id(),
        ]);
        return Redirect::route('notes.index')->with('success', 'Note created successfully!');
    }



    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        if ($note->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access');
        }
        return Inertia::render('Notes/Show', ['note' => $note]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note)
    {
        if ($note->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access');
        }

        return Inertia::render('Notes/Edit', ['note' => $note]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        if ($note->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access');
        }

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'required|string',
        ]);

        $note->update($validated);

        return Redirect::route('notes.index')->with('success', 'Note updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        if ($note->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access');
        }

        $note->delete();

        return Redirect::route('notes.index')->with('success', 'Note deleted successfully!');
    }

//    public function format(Note $note, GeminiService $geminiService)
//    {
//        // Get the current content of the note
//        $content = $note->content;
//
//        // Use Gemini service to format the content
//        $formattedText = $geminiService->formatText($content);
//
//        // Update the note with the formatted content
//        $note->content = $formattedText;
//        $note->save();
//
//        // Redirect back to the note details page or wherever you want
//        return redirect()->route('notes.show', $note);
//    }
    public function formatText(Note $note)
    {
        $apiKey = config('services.gemini.api_key'); // Ensure API key is valid
        $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' . $apiKey;

        $text = $note->content;

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($url, [
                'contents' => [
                    [
                        'parts' => [
                            [
                                'text' => "Take the following text and correct any grammatical mistakes. Then, format it clearly for students. Use headings where necessary, bullet points for lists, and ensure the tone is appropriate for educational use: " . $text,
                            ]
                        ]
                    ]
                ]
            ]);

            // Check if request was successful
            if ($response->successful()) {
                $data = $response->json();

                // Parse the generated text from the response
                $generatedText = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

                if ($generatedText) {
                    // Update the notes table with the formatted text
                    $note->content = $generatedText;
                    $note->save();

                    return "Note updated successfully.";
                } else {
                    return "No generated text found.";
                }
            } else {
                // Handle API error response
                return "Error: " . $response->status() . " - " . $response->body();
            }
        } catch (\Exception $e) {
            // Log the error and provide user-friendly error message
            \Log::error('Error formatting text: ' . $e->getMessage());
            return "An error occurred while processing your request. Please try again later.";
        }
    }



}
