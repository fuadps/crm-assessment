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
            'companies' => Company::query()->withCount('employees')->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Company/Form', [
            'company' => new Company,
            'employees' => [],
        ]);
    }

    public function store(Request $request)
    {
        $input = $request->validate($this->validationRules());

        if($request->hasFile('logo'))
            $input['logo'] = $request->logo->store('', 'public');

        $company = Company::create($input);

        return redirect()->route('companies.edit', $company);
    }

    public function show(Company $company)
    {
        return redirect()->route('companies.edit');
    }

    public function edit(Company $company)
    {
        return Inertia::render('Company/Form', [
            'company' => $company,
            'employees' => $company->employees,
        ]);
    }

    public function update(Request $request, Company $company)
    {
        $input = $request->validate($this->validationRules());

        if($request->hasFile('logo'))
            $input['logo'] = $request->logo->store('', 'public');

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
