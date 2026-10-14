<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    // Fetch all tickets
    public function index()
    {
        return response()->json(Ticket::latest()->get(), 200);
    }

    // Create a new support ticket
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'nullable|string|in:low,medium,high,urgent',
            'status' => 'nullable|string|in:open,in-progress,resolved,closed',
            'category' => 'nullable|string|max:100',
            'user_email' => 'nullable|email|max:255',
        ]);

        $ticket = Ticket::create($validated);

        return response()->json([
            'message' => 'Ticket created successfully!',
            'ticket' => $ticket
        ], 201);
    }

    // View specific ticket details
    public function show(Ticket $ticket)
    {
        return response()->json($ticket, 200);
    }

    // Update a ticket (change status, assign priority, etc.)
    public function update(Request $request, Ticket $ticket)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'priority' => 'nullable|string|in:low,medium,high,urgent',
            'status' => 'nullable|string|in:open,in-progress,resolved,closed',
            'category' => 'nullable|string|max:100',
            'user_email' => 'nullable|email|max:255',
        ]);

        $ticket->update($validated);

        return response()->json([
            'message' => 'Ticket updated successfully!',
            'ticket' => $ticket
        ], 200);
    }

    // Delete a ticket
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return response()->json([
            'message' => 'Ticket deleted successfully!'
        ], 200);
    }
}
