"use client";

import { useBookingContext } from "@/components/BookingContext";
import { XCircle, Calendar, Tag, Eye, Trash2, Clock, List } from "lucide-react";
import { useRouter } from "next/navigation";

const API_BASE_URL = "https://event-management-server-ashy.vercel.app/";

export default function BookingsPage() {
    const { bookedEvents, removeBookedEvent } = useBookingContext();
    const router = useRouter();
    const bookings = bookedEvents || [];

    const handleView = (slug) => {
        console.log("Navigating to event slug:", slug);
        router.push(`/eventdetails?slug=${slug}`);

    };

    const handleDelete = (bookingSlug, title) => {
        const displayTitle = title || "this event";
        if (!window.confirm(`Delete booking for ${displayTitle}?`)) return;

        removeBookedEvent(bookingSlug);
    };

    if (bookedEvents === null)
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-xl font-medium text-gray-700 p-6 rounded-lg shadow-md bg-white">
                    Bookings are loading... ⏳
                </p>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50 px-6 md:px-12 py-10 font-sans">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-10 pb-3 border-b-4 border-indigo-200">
                    My Booking List 🎟
                </h1>

                {bookings.length === 0 ? (
                    <div className="text-center p-12 bg-white rounded-2xl shadow-xl border border-gray-200">
                        <XCircle size={48} className="mx-auto mb-4 text-indigo-500" />
                        <p className="text-xl font-semibold text-gray-800">
                            You have **no active bookings**.
                        </p>
                        <p className="text-gray-500 mt-1">
                            Go to the main page to book an exciting event!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div
                                key={booking.eventSlug}
                                className="bg-white p-6 md:px-8 md:py-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:ring-2 hover:ring-indigo-400 transition-all duration-300"
                            >
                                <div className="w-full sm:w-3/4">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                        {booking.eventTitle ?? "Untitled Event"}
                                    </h2>

                                    <div className="space-y-2 text-sm text-gray-700">
                                        <p className="flex items-center gap-2">
                                            <Calendar size={16} className="text-indigo-500" />
                                            Event Date:
                                            <span className="font-medium text-gray-900">
                                                {booking.eventFormattedDate || "Date N/A"}
                                            </span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Clock size={16} className="text-teal-500" />
                                            Time:
                                            <span className="font-medium text-gray-900">
                                                {booking.eventTime || "Time N/A"}
                                            </span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <List size={16} className="text-purple-500" />
                                            Category:
                                            <span className="font-medium text-gray-900">
                                                {booking.eventCategory || "N/A"}
                                            </span>
                                        </p>

                                        <p className="flex items-center gap-2 mt-4 pt-2 border-t border-gray-100">
                                            <Tag size={16} className="text-gray-500" />
                                            Booked On:
                                            <span className="font-medium text-gray-900">
                                                {booking.bookedAt ? new Date(booking.bookedAt).toLocaleDateString() : "Date N/A"}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
                                    <button
                                        onClick={() => handleView(booking.eventSlug)}
                                        className="flex items-center justify-center px-2 py-2 rounded-xl text-black font-semibold shadow-md transition transform hover:scale-[1.02] w-full sm:w-auto"
                                    >
                                        <Eye size={18} className="mr-1" />
                                        View
                                    </button>

                                    <button
                                        onClick={() => handleDelete(booking.eventSlug, booking.eventTitle)}
                                        className="flex items-center justify-center px-2 py-2 rounded-xl bg-amber-100 text-black font-semibold shadow-md transition transform hover:scale-[1.02] w-full sm:w-auto"
                                    >
                                        <Trash2 size={18} className="mr-1" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}