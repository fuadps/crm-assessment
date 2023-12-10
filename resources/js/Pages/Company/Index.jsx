import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, usePage} from '@inertiajs/react';
import Pagination from "@/Components/Pagination.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

export default function Dashboard({ auth }) {
    const { companies } = usePage().props;
    const { data, links } = companies;

    const handleDelete = (company) => {
        if(! confirm('Are you sure you want to delete this?'))
            return

        router.delete(route('companies.destroy', company.id))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Companies</h2>}
        >
            <Head title="Companies" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-4 py-6">
                        <div>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="sm:flex sm:items-center">
                                    <div className="sm:flex-auto">
                                        <p className="mt-2 text-sm text-gray-700">
                                            A list of all the companies in the database including their name, email, address, and website.
                                        </p>
                                    </div>
                                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                        <Link
                                            href={route('companies.create')}
                                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Add New Company
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
                                                Name
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
                                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                                            >
                                                Address
                                            </th>
                                            <th
                                                scope="col"
                                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                                            >
                                                Website
                                            </th>
                                            <th
                                                scope="col"
                                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                                            >
                                                Total Employees
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {data.map((company) => (
                                            <tr key={company.email}>
                                                <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                                                    {company.name}
                                                    <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                                    <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                                </td>
                                                <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{company.email}</td>
                                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{company.address}</td>
                                                <td className="px-3 py-4 text-sm text-gray-500">{company.website}</td>
                                                <td className="px-3 py-4 text-sm text-gray-500">{company.employees_count}</td>
                                                <td className="relative py-4 pl-3 text-right text-sm font-medium">
                                                    <Link href={route('companies.edit', company.id)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                                                        Edit<span className="sr-only">, {company.name}</span>
                                                    </Link>

                                                    <DangerButton onClick={() => handleDelete(company)}>
                                                        Delete<span className="sr-only">, {company.name}</span>
                                                    </DangerButton>
                                                </td>
                                            </tr>
                                        ))}

                                        {!data.length && (
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
                    <Pagination links={links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
