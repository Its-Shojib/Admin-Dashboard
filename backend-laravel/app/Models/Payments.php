<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    // Specify the table name (if not the default "payments")
    protected $table = 'payments';

    // Add `items` to the fillable array to allow mass assignment
    protected $fillable = [
        'items',
    ];

    // Cast `items` to an array
    protected $casts = [
        'items' => 'array',
    ];
}

