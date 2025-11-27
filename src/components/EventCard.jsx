"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EventCards() {
    const [events, setEvents] = useState([]);
    const router = useRouter(); 

    useEffect(() => {
        fetch("event-management-server-ashy.vercel.app/events")
            .then(res => res.json())
            .then(data => setEvents(data.slice(0, 3)));
    }, []);

    if (events.length === 0) {
        return (
            <div className="w-full text-center py-10">
                <h2 className="text-3xl font-bold text-center mb-10 text-black">
                    Featured Events
                </h2>
                <p className="text-center text-gray-500">Loading events...</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-10 text-black">
                Featured Events
            </h2>
            <div className="flex flex-wrap justify-center gap-5"> 
                {events.map((event, index) =>
                    <div
                        key={event._id}
                        className={`
 w-full
 sm:w-3/4
 md:w-[calc(50%-0.75rem)]
 max-w-md
 ${index === 2 ? 'mx-auto md:w-3/4 lg:w-[calc(50%-0.75rem)]' : ''}
 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 duration-300 cursor-pointer group
 `}
                    >
                        <img
                            className="h-40 w-full object-cover group-hover:scale-105 duration-300"
                            src={event.imageUrl}
                            alt={event.title}
                        />

                        <div className="p-3 space-y-1">
                            <span className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
                                {event?.metaInfo?.category}
                            </span>

                            <h3 className="text-lg font-semibold text-black group-hover:text-blue-600 duration-200">
                                {event.title}
                            </h3>

                            <p className="text-gray-800 group-hover:text-blue-600 text-sm duration-200">
                                {event.shortDescription}
                            </p>
                            <div className="flex justify-between items-center pt-2.5">
                                <p className="text-gray-800 font-medium group-hover:text-blue-600 duration-200">
                                    📅 {event?.metaInfo?.formattedDate}
                                </p>

                                <span className="font-bold text-black group-hover:text-blue-600 duration-200">
                                    {event?.metaInfo?.price === 0
                                        ? "Free"
                                        : `$${event?.metaInfo?.price}`}
                                </span>
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
                )}
            </div>
        </div>
    );
}