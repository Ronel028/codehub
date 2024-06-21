<?php

// Autoload Laravel's dependencies
require __DIR__ . '/../vendor/autoload.php';

// Boot Laravel application
$app = require_once __DIR__ . '/../bootstrap/app.php';

// Set up the application
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Run artisan command
try {
    \Illuminate\Support\Facades\Artisan::call('storage:link');
    echo "Storage link created successfully.";
} catch (Exception $e) {
    echo "Failed to create storage link: " . $e->getMessage();
}
