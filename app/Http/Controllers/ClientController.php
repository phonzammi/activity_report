<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\Clients\ClientShowResource;
use App\Http\Resources\Clients\ClientsResource;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Client::class);

        $clients = Client::withCount('projects')->paginate();
        return Inertia::render("Client/Index", [
            'clients' => ClientsResource::collection($clients)
        ]);
    }

    public function create(Request $request): Response
    {
        $this->authorize('create', Client::class);
        return Inertia::render("Client/Create", [
            "redirectTo" => $request->from
        ]);
    }

    public function store(StoreClientRequest $request)
    {
        $this->authorize('create', Client::class);

        $posts = $request->validated();

        Client::create([
            'name' => $posts['client_name'],
            'logo_path' => $request->file('logo')->storePublicly("client-logos", ['disk' => 'public'])
        ]);

        if ($request->filled('redirect')) {
            return to_route($request->redirect)->with("success", "Client Baru Berhasil Ditambahkan");
        }

        return to_route('clients.index')->with("success", "Client Baru Berhasil Ditambahkan");
    }

    public function edit(Client $client)
    {
        $this->authorize('update', $client);

        return Inertia::render("Client/Edit", [
            'client' => new ClientShowResource($client)
        ]);
    }

    public function update(UpdateClientRequest $request, Client $client)
    {
        $this->authorize('update', $client);
        $posts = $request->validated();

        if (isset($posts['logo'])) {
            $client->updateClientLogo($posts['logo']);
        }

        $client->fill([
            'name' => $posts['client_name'],
        ]);

        $client->save();

        return to_route('clients.index')->with("success", "Berhasil Memperbarui Client");
    }

    public function delete(Client $client)
    {
        $this->authorize('delete', $client);
        $client->delete();

        return redirect()->back()->with("success", 'Berhasil Menghapus Client');
    }
}
