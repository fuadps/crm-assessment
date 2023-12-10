import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Transition} from "@headlessui/react";

export default function Edit({ auth, company }) {
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
            patch(route('companies.update', company.id));
        else
            post(route('companies.store'));
    };

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
