<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => response()->json([
    'name' => 'Helpdesk Hub API',
    'status' => 'running',
]));
