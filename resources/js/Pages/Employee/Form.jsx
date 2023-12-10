import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Transition} from "@headlessui/react";

export default function Edit({ auth, employee, companies }) {
    const { data, setData, patch, post, errors, processing, recentlySuccessful } = useForm({
        first_name: employee.first_name,
        last_name: employee.last_name,
        company_id: employee.company_id,
        email: employee.email,
        phone: employee.phone,
    });

    const submit = (e) => {
        e.preventDefault();

        if(employee.id)
            patch(route('employees.update', employee.id));
        else
            post(route('employees.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Employees / {employee.id ? 'Edit' : 'Create'}</h2>}
        >
            <Head title="Companies" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-4 py-6">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">Employee Information</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                {employee.id ? 'Edit' : 'Create'} employee's profile information.
                            </p>
                        </header>

                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="first_name" value="First Name" />

                                <TextInput
                                    id="first_name"
                                    className="mt-1 block w-full"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError className="mt-2" message={errors.first_name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="first_name" value="Last Name" />

                                <TextInput
                                    id="last_name"
                                    className="mt-1 block w-full"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    required
                                />

                                <InputError className="mt-2" message={errors.last_name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="company_id" value="Company" />

                                <select value={data.company_id} onChange={(e) => setData('company_id', e.target.value)} name="company_id" id="company_id" className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full">
                                    <option value="">Select company</option>
                                    {Object.entries(companies).map(([key, name]) => (
                                        <option selected={data.company_id} key={key} value={key}>{name}</option>
                                    ))}
                                </select>


                                <InputError className="mt-2" message={errors.company_id} />
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
                                <InputLabel htmlFor="phone" value="Phone" />

                                <TextInput
                                    id="phone"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                />

                                <InputError className="mt-2" message={errors.phone} />
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
