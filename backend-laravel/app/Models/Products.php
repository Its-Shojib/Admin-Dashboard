<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    // Specify the fields allowed for mass assignment
    protected $fillable = [
        'name',
        'category',
        'color',
        'brand',
        'price',
        'image',
        'details',
    ];
}
