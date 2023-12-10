<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index()
    {
        return Inertia::render('Company/Index', [
            'companies' => Company::query()->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Company/Form', [
            'company' => new Company,
        ]);
    }

    public function store(Request $request)
    {
        $input = $request->validate($this->validationRules());

        if($request->hasFile('logo'))
            $input['logo'] = $request->logo->store();

        $company = Company::create($input);

        return redirect()->route('companies.edit', $company);
    }

    public function show(Company $company)
    {
        return Inertia::render('Company/Show');
    }

    public function edit(Company $company)
    {
        return Inertia::render('Company/Form', [
            'company' => $company,
        ]);
    }

    public function update(Request $request, Company $company)
    {
        $input = $request->validate($this->validationRules());

        if($request->hasFile('logo'))
            $input['logo'] = $request->logo->store();

        $company->update($input);

        return redirect()->route('companies.edit', $company);
    }

    public function destroy(Company $company)
    {
        $company->delete();

        return redirect()->route('companies.index');
    }

    protected function validationRules(): array
    {
        return [
            'name' => 'required',
            'email' => 'required|email',
            'address' => 'nullable',
            'website' => 'nullable|url',
            'logo' => 'nullable|image|dimensions:min_width=100,min_height=200',
        ];
    }
}
