import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, useForm, usePage} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Transition} from "@headlessui/react";
import DangerButton from "@/Components/DangerButton.jsx";
import Pagination from "@/Components/Pagination.jsx";

export default function Edit({ auth, company, employees }) {
    console.log(company)
    const { data, setData, patch, post, errors, processing, recentlySuccessful } = useForm({
        name: company.name,
        email: company.email,
        address: company.address,
        website: company.website,
        logo: company.logo,
    });

    const submit = (e) => {
        e.preventDefault();

        if(company.id)
            router.post(route('companies.update', company.id), {
                _method: 'patch ',
                ...data,
            })
        else
            post(route('companies.store'));
    };

    const handleDelete = (employee) => {
        if(! confirm('Are you sure you want to delete this?'))
            return

        router.delete(route('employees.destroy', employee.id))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Companies / {company.id ? 'Edit' : 'Create'}</h2>}
        >
            <Head title="Companies" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-4 py-6">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">Company Information</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                {company.id ? 'Edit' : 'Create'} company's profile information.
                            </p>
                        </header>

                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError className="mt-2" message={errors.email} />
                            </div>

                            <div>
                                <InputLabel htmlFor="address" value="Address" />

                                <TextInput
                                    id="address"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                />

                                <InputError className="mt-2" message={errors.address} />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Website" />

                                <TextInput
                                    id="website"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.website}
                                    onChange={(e) => setData('website', e.target.value)}
                                />

                                <InputError className="mt-2" message={errors.website} />
                            </div>

                            <div>
                                <InputLabel htmlFor="logo" value="Logo" />

                                {company.logo && (
                                    <img src={ '/storage/' + company.logo } alt="logo"/>
                                )}

                                <input
                                    id="logo"
                                    type="file"
                                    className="mt-1 block w-full"
                                    // value={data.logo}
                                    onChange={(e) => setData('logo', e.target.files[0])}
                                />

                                <InputError className="mt-2" message={errors.logo} />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600">Saved.</p>
                                </Transition>
                            </div>
                        </form>
                    </div>

                    {company.id && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-4 py-6 mt-8">
                            <div>
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                    <div className="sm:flex sm:items-center">
                                        <div className="sm:flex-auto">
                                            <p className="mt-2 text-sm text-gray-700">
                                                A list of all the employees in the {company.name}.
                                            </p>
                                        </div>
                                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                            <Link
                                                href={route('employees.create')}
                                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Add New Employee
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 flow-root overflow-hidden">
                                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                        <table className="w-full text-left">
                                            <thead className="bg-white">
                                            <tr>
                                                <th scope="col" className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                                                    First Name
                                                    <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                                                    <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                                                </th>

                                                <th scope="col" className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                                                    Last Name
                                                    <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                                                    <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                                                >
                                                    Email
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                                                >
                                                    Phone
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {employees.map((employee) => (
                                                <tr key={employee.email}>
                                                    <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                                                        {employee.first_name}
                                                    </td>
                                                    <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{employee.last_name}</td>
                                                    <td className="px-3 py-4 text-sm text-gray-500">{employee.email}</td>
                                                    <td className="px-3 py-4 text-sm text-gray-500">{employee.phone}</td>
                                                    <td className="relative py-4 pl-3 text-right text-sm font-medium">
                                                        <Link href={route('employees.edit', employee.id)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                                                            Edit<span className="sr-only">, {employee.first_name}</span>
                                                        </Link>

                                                        <DangerButton onClick={() => handleDelete(employee)}>
                                                            Delete<span className="sr-only">, {employee.first_name}</span>
                                                        </DangerButton>
                                                    </td>
                                                </tr>
                                            ))}

                                            {!employees.length && (
                                                <>
                                                    <tr>
                                                        <td colSpan="5" className="text-center px-3 py-4 text-sm text-gray-500 sm:table-cell">No record(s)</td>
                                                    </tr>
                                                </>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
