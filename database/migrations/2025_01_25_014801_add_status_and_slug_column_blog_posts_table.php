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
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropColumn('is_published');
            $table->enum('status', ['archive', 'draft', 'publish'])->default('draft')->after('content');
            $table->string('slug')->after('user_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->boolean('is_published')->default(false);
            $table->dropColumn(['status', 'slug']);
        });
    }
};
