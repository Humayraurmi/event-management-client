"use client";

import { createContext, useContext, useState, useEffect } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookedEvents, setBookedEvents] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("bookedEvents");
        if (stored) setBookedEvents(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem("bookedEvents", JSON.stringify(bookedEvents));
    }, [bookedEvents]);

    const addBookedEvent = (event) => {
        const booking = {
            eventSlug: event.slug,
            eventTitle: event.title,
            eventFormattedDate: event.metaInfo?.formattedDate || "Date N/A",
            eventTime: event.metaInfo?.time || "Time N/A",
            eventCategory: event.metaInfo?.category || "N/A",
            bookedAt: new Date().toISOString(),
        };
        setBookedEvents(prev => [...prev, booking]);
    };

    const removeBookedEvent = (slugToRemove) => {
        setBookedEvents(prev => prev.filter(booking => booking.eventSlug !== slugToRemove));
    };

    const isEventInBookings = (slug) => {
        return bookedEvents.some(b => b.eventSlug === slug);
    };

    const refreshBookedEvents = () => {
    };

    return (
        <BookingContext.Provider 
            value={{ 
                bookedEvents, 
                addBookedEvent, 
                removeBookedEvent, 
                isEventInBookings, 
                refreshBookedEvents 
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBookingContext = () => useContext(BookingContext);