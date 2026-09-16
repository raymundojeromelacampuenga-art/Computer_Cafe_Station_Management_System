<?php

namespace App\Http\Controllers;

use App\Models\Station;
use Illuminate\Http\Request;

class StationController extends Controller
{
    public function index()
    {
        return response()->json(Station::latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'station_name' => 'required|string|max:100',
            'pc_number' => 'required|string|max:50',
            'tier_category' => 'required|string|max:50',
            'hourly_rate' => 'required|numeric|min:0',
        ]);

        $station = Station::create($validated);

        return response()->json($station, 201);
    }

    public function show(Station $station)
    {
        return response()->json($station);
    }
}
