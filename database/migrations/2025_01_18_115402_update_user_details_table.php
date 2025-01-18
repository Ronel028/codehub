<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_details', function (Blueprint $table) {
            $table->dropColumn(['last_name', 'experiences', 'soc_fb', 'soc_linkedin', 'soc_twitter']);
            $table->renameColumn('first_name', 'full_name');
            $table->renameColumn('middle_name', 'tagline');
            $table->renameColumn('about', 'bio');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_details', function (Blueprint $table) {
            $table->renameColumn('full_name', 'first_name');
            $table->renameColumn('tagline','middle_name');
            $table->string('last_name')->nullable();
            $table->json('experiences')->nullable();
            $table->string('soc_fb')->nullable();
            $table->string('soc_linkedin')->nullable();
            $table->string('soc_twitter')->nullable();
            $table->renameColumn('bio', 'about');
        });
    }
};
