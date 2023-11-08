<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\Projects\ProjectShowResource;
use App\Http\Resources\Projects\ProjectsResource;
use App\Models\Client;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index() : Response
    {
        $this->authorize('viewAny', Project::class);
        $projects = Project::with('client')->paginate();

        return Inertia::render("Project/Index", [
            'projects' => ProjectsResource::collection($projects)
        ]);
    }

    public function create(Request $request)
    {
        $this->authorize('create', Project::class);
        $clients = Client::all();
        return Inertia::render("Project/Create", [
            "clients" => $clients,
            "redirectTo" => $request->from
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        $this->authorize('create', Project::class);

        $posts = $request->validated();

        unset($posts['redirect']);

        Project::create($posts);

        if ($request->filled('redirect')) {
            return to_route($request->redirect)->with("success", "Project Baru Berhasil Ditambahkan");
        }

        return to_route('projects.index')->with("success", "Project Baru Berhasil Ditambahkan");
    }

    public function edit(Project $project)
    {
        $this->authorize('update', $project);
        $clients = Client::all();

        return Inertia::render("Project/Edit", [
            "clients" => $clients,
            'project' => new ProjectShowResource($project->loadMissing('client'))
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $this->authorize('update', $project);

        $posts = $request->validated();

        $project->update($posts);

        return to_route('projects.index')->with("success", "Berhasil Memperbarui Project.");
    }

    public function delete(Project $project)
    {
        $this->authorize('delete', $project);

        if($project->delete()){
            Storage::disk('public')->deleteDirectory("clients/{$project->client_id}/projects/{$project->id}/");
        }

        return redirect()->back()->with("success", 'Berhasil Menghapus Project');
    }

}
