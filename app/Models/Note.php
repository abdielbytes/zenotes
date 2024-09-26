<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\SoftDeletes;

class Note extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['title', 'content', 'user_id'];


    public static function boot()
    {
        parent::boot();

        static::creating(function ($note) {
            $note->user_id = Auth::id();
        });
    }

    public function tags():BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }
}

