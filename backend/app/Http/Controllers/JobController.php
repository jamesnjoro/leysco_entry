<?php

namespace App\Http\Controllers;

use App\job;
use Illuminate\Http\Request;

class JobController extends Controller
{

    public function index()
    {
        return job::all();
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'description' => 'required|string',
        ]);

        $job = new job();
        $job->name = $request->name;
        $job->description = $request->description;
        $job->save();

        return response([
            'status' => 'success',
            'data' => $job
        ], 200);
    }


    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'description' => 'required|string',
        ]);

        $job = job::findOrFail($id);
        $job->name = $request->name;
        $job->description = $request->description;
        $job->update();

        return response([
            'status' => 'success'
        ], 200);
    }

    public function destroy($id)
    {
        $job = job::findOrFail($id);
        $job->delete();
        return ['message' => 'Job deleted'];
    }
}
