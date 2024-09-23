<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Redirect;
use Illuminate\Http\RedirectResponse;


class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notes = Note::where('user_id', auth()->id())
            ->select('title', 'created_at')
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
//        dd($request);
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'note' => 'required|string',
        ]);
//    dd($validated);
        $validated['title'] = $validated['title'] ?? 'Untitled Note';
//        dd($validated);
        Note::create([
            'title' => $validated['title'],
            'content' => $validated['note'],
            'user_id' => auth()->id(),
        ]);
//    dd("here");
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
//        dd($note);
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
            'note' => 'required|string',
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
}
