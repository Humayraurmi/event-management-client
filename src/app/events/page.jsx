"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EventsPage() {
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("http://localhost:3000/events");
                const data = await res.json();
                setEvents(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchEvents();
    }, []);

    const filteredEvents = events.filter((event) => {
        const matchesSearch =
            event.title.toLowerCase().includes(search.toLowerCase()) ||
            event.shortDescription.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All" || event.metaInfo.category === category;
        return matchesSearch && matchesCategory;
    });

    const categories = ["All", ...new Set(events.map((e) => e.metaInfo.category))];

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Upcoming Events</h1>
                <p className="text-gray-600 mb-6">Explore events happening near you. Use the search or filter by category to find what interests you.</p>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 placeholder-gray-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <div
                                key={event.slug}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
                            >
                                <img
                                    src={event.imageUrl}
                                    alt={event.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800 mb-1">{event.title}</h2>
                                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                            {event.shortDescription}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center text-gray-700 text-sm">
                                        <span className="font-semibold">${event.metaInfo.price.toFixed(2)}</span>
                                        <button
                                            onClick={() => router.push(`/eventdetails?slug=${event.slug}`)}
                                            className="bg-blue-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center mt-6">
                            No events found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}