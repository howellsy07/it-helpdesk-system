<?php

namespace Database\Seeders;

use App\Models\Ticket;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Ticket::query()->firstOrCreate(
            ['title' => 'Welcome to Helpdesk Hub'],
            [
                'description' => 'This sample ticket confirms that your support queue is ready.',
                'priority' => 'low',
                'status' => 'open',
                'category' => 'software',
                'user_email' => 'itadmin@example.com',
            ],
        );
    }
}
