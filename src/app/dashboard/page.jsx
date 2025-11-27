'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_BASE_URL = 'https://event-management-server-ashy.vercel.app/';

const showToast = (message, type = 'success') => {
    console.log(`Toast: ${message} (${type})`);
};

export default function EventsDashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    if (loading) {
        return <div className="text-center py-20 text-lg font-medium text-gray-600">Loading user data...</div>;
    }
    if (!user) {
        router.push('/login');
        return null;
    }

    useEffect(() => {
        const fetchEvents = async () => {
            if (!user) return;
            setIsLoading(true);
            setError(null);

            try {
                const res = await fetch(`${API_BASE_URL}/events`);
                const data = await res.json();

                if (res.ok) {
                    setEvents(data.events || data);
                } else {
                    setError(data.message || "Failed to fetch events.");
                    showToast(data.message || "Failed to fetch events.", 'error');
                }
            } catch (err) {
                setError("Network error or server connection failed.");
                showToast("Network error or server connection failed.", 'error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10 border-b pb-4">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center sm:text-left">
                        Manage Events
                    </h1>

                    <Link 
                        href="/add-event" 
                        className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition font-medium text-sm sm:text-base text-center"
                    >
                        + Add New Event
                    </Link>
                </div>

                {isLoading && (
                    <div className="text-center py-10 text-xl text-blue-600">Loading events...</div>
                )}

                {error && (
                    <div className="text-center py-10 text-xl text-red-600 border border-red-300 p-4 rounded-lg bg-red-50">
                        Error: {error}
                    </div>
                )}

                {!isLoading && !error && events.length === 0 && (
                    <div className="text-center py-10 text-xl text-gray-500">
                        No events found. Start by adding one!
                    </div>
                )}

                {!isLoading && events.length > 0 && (
                    <div className="bg-white shadow-xl rounded-xl border border-gray-200">

                        <div className="w-full overflow-x-auto">
                            <table className="table-auto w-full border-collapse">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-2 sm:px-8 py-4 text-left text-sm sm:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-2 sm:px-8 py-4 text-left text-sm sm:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-2 sm:px-8 py-4 text-left text-sm sm:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-2 sm:px-8 py-4 text-left text-sm sm:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                                            Featured
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white">
                                    {events.map((event) => (
                                        <tr 
                                            key={event.id} 
                                            className="hover:bg-gray-50 transition duration-150 border-b border-gray-300"
                                        >
                                            <td className="px-2 sm:px-8 py-4 font-medium text-gray-900 text-sm sm:text-lg break-words">
                                                <Link
                                                    href={`/eventdetails?slug=${event.slug}`}
                                                    className="text-blue-600 hover:text-blue-800 transition"
                                                >
                                                    {event.title}
                                                </Link>
                                            </td>

                                            <td className="px-2 sm:px-8 py-4 text-gray-700 text-sm sm:text-lg break-words">
                                                {event.metaInfo?.formattedDate || event.metaInfo?.date || 'N/A'}
                                            </td>

                                            <td className="px-2 sm:px-8 py-4 text-gray-700 text-sm sm:text-lg break-words">
                                                {event.metaInfo?.category || 'General'}
                                            </td>

                                            <td className="px-2 sm:px-8 py-4">
                                                {(() => {
                                                    const featured = event.isFeatured === true || event.isFeatured === "true";

                                                    return (
                                                        <span
                                                            className={`inline-block px-3 py-1 text-xs sm:text-base font-semibold rounded-full shadow-sm 
                                                            ${featured 
                                                                ? 'bg-gray-200 text-gray-700' 
                                                                : 'bg-gray-200 text-red-700' 
                                                            }`}
                                                        >
                                                            {featured ? 'Featured' : 'Regular'}
                                                        </span>
                                                    );
                                                })()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 border-t text-sm sm:text-base text-gray-500 bg-gray-50 rounded-b-xl text-center">
                            Note: You can edit an event by clicking on its title.
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}