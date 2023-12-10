<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index()
    {
        return Inertia::render('Employee/Index', [
            'employees' => Employee::query()->with('company')->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Employee/Form', [
            'employee' => new Employee,
            'companies' => Company::query()->pluck('name', 'id')
        ]);
    }

    public function store(Request $request)
    {
        $input = $request->validate($this->validationRules());

        $employee = Employee::create($input);

        return redirect()->route('employees.edit', $employee);
    }

    public function show(Employee $employee)
    {
        return redirect()->route('employees.edit', $employee);
    }

    public function edit(Employee $employee)
    {
        return Inertia::render('Employee/Form', [
            'employee' => $employee,
            'companies' => Company::query()->pluck('name', 'id')
        ]);
    }

    public function update(Request $request, Employee $employee)
    {
        $input = $request->validate($this->validationRules());

        $employee = $employee->update($input);

        return redirect()->route('employees.edit', $employee);
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->route('employees.index');
    }

    protected function validationRules(): array
    {
        return [
            'company_id' => Rule::in(Company::query()->pluck('id')),
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'nullable|email',
            'phone' => 'numeric',
        ];
    }
}
