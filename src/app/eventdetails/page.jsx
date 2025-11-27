"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ShoppingCart, Calendar, MapPin, Tag, Clock } from "lucide-react";
import { useBookingContext } from "@/components/BookingContext";
import { auth } from "@/components/firebase.config.js";
import { onAuthStateChanged } from "firebase/auth";

export default function EventDetailsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug');

    const { addBookedEvent, isEventInBookings } = useBookingContext();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isBooking, setIsBooking] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    const handleBooking = async () => {
        if (!event || isBooking || isBooked) return;

        setIsBooking(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            addBookedEvent(event);
            setIsBooked(true);
            alert(`✅ Success! You have booked a ticket for "${event.title}".`);
        } catch (err) {
            console.error(err);
            alert("❌ Booking failed. Please try again.");
        } finally {
            setIsBooking(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/login");
            } else {
                setAuthChecked(true);
            }
        });
        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        if (!authChecked) return; 

        const fetchEvent = async () => {
            setLoading(true);
            if (!slug) {
                setEvent(null);
                setLoading(false);
                return;
            }
            try {
                const res = await fetch(`http://localhost:3000/events/${slug}`);
                if (!res.ok) {
                    setEvent(null);
                    setLoading(false);
                    return;
                }
                const data = await res.json();
                setEvent(data);
                setIsBooked(isEventInBookings(slug));
            } catch (err) {
                console.error(err);
                setEvent(null);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [slug, isEventInBookings, authChecked]);

    if (!authChecked) return <p className="text-center mt-10 text-gray-500">Checking authentication...</p>;
    if (loading) return <p className="text-center mt-10 text-gray-700">Loading event details...</p>;
    if (!event) return (
        <div className="text-center mt-20 p-6">
            <h2 className="text-2xl font-bold text-red-600">Event Not Found 😔</h2>
            <p className="mt-2 text-gray-600">The requested event could not be loaded or does not exist.</p>
            <button
                onClick={() => router.back()}
                className="mt-6 bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition duration-300"
            >
                Go Back
            </button>
        </div>
    );

    let buttonText = "Book Now";
    let buttonClassName = "bg-green-600 text-black hover:bg-green-700";

    if (isBooking) {
        buttonText = "Booking...";
        buttonClassName = "bg-yellow-400 text-black cursor-not-allowed";
    } else if (isBooked) {
        buttonText = "Already Booked ✅";
        buttonClassName = "bg-gray-400 text-black cursor-not-allowed";
    }

    return (
        <div className="min-h-screen bg-gray-100 pb-24 p-4 flex flex-col items-center">
            <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 mb-4">
                <div className="relative">
                    <img src={event.imageUrl} alt={event.title} className="w-full h-[200px] sm:h-[250px] object-cover"/>
                    {event.metaInfo.price !== undefined && (
                        <span className="absolute top-3 right-3 bg-red-600 text-white text-lg font-bold px-3 py-1 rounded-full shadow-lg">
                            ${event.metaInfo.price.toFixed(2)}
                        </span>
                    )}
                </div>

                <div className="p-4 sm:p-6 space-y-6">
                    <div className="flex justify-between items-start border-b pb-4 border-gray-200">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{event.title}</h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                        <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <Calendar size={18} className="text-blue-600" />
                            <span>Date: {event.metaInfo.formattedDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <Clock size={18} className="text-blue-600" />
                            <span>Time: {event.metaInfo.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <MapPin size={18} className="text-blue-600" />
                            <span>Location: {event.metaInfo.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-purple-50 p-3 rounded-lg border border-purple-200">
                            <Tag size={18} className="text-purple-600" />
                            <span>Category: {event.metaInfo.category}</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2 border-b pb-1">About This Event</h2>
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{event.fullDescription}</p>
                    </div>

                    <button
                        onClick={() => router.back()}
                        className="mt-4 bg-gray-200 text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition duration-300"
                    >
                        ← Back to Events
                    </button>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t border-gray-200 z-50">
                <div className="flex justify-center w-full">
                    <button
                        onClick={handleBooking}
                        disabled={isBooking || isBooked}
                        className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-lg font-bold w-full sm:w-auto transition duration-300 ${buttonClassName}`}
                    >
                        <ShoppingCart size={20} />
                        <span className="whitespace-nowrap">{buttonText}</span>
                        {isBooking && <span className="ml-2 animate-spin">⏳</span>}
                    </button>
                </div>
            </div>
        </div>
    );
}
