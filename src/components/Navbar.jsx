"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.config.js';
import { useRouter } from 'next/navigation';

// 🚨 CHANGE 1: Remove 'Booking' from the public links array
const publicNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    // { name: 'Booking', href: '/booking' }, <-- Removed this line
];

export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const isAuthenticated = !!user;

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setIsDropdownOpen(false);
            router.push('/login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const displayUser = {
        name: user?.displayName || user?.email?.split('@')[0] || 'User',
        email: user?.email || '',
    };
    
    const dashboardLink = isAuthenticated ? { name: 'My Bookings', href: '/booking' } : null; 

    const AuthControls = () => {
        if (loading) {
            return <div className="py-2 px-4 text-gray-500">Loading...</div>;
        }

        if (isAuthenticated) {
            return (
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-2 text-white bg-blue-600 hover:bg-blue-700 py-2 px-3 rounded-lg transition"
                    >
                        <span className="font-semibold truncate max-w-[100px]">{displayUser.name.split(' ')[0]}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 origin-top-right animate-fade-in">
                            <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                <p className="font-semibold truncate">{displayUser.name}</p>
                                <p className="text-xs text-gray-500 truncate">{displayUser.email}</p>
                            </div>
                            
                            <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
                                🏠 Dashboard
                            </Link>
                            <Link href="/add-event" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
                                Add Event
                            </Link> 
                            
                            <Link href="/booking" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
                                🎟️ My Bookings
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            );
        }
        return (
            <div className="flex space-x-3">
                <Link href="/register" className="py-2 px-4 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition hidden sm:inline-block">
                    Register
                </Link>
                <Link href="/login" className="py-2 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                    Login
                </Link>
            </div>
        );
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                        <span className="text-2xl font-bold text-blue-700">Event<span className="text-gray-900">Pro</span></span>
                    </Link>

                    <div className="hidden md:flex md:space-x-8 items-center">
                        {publicNavLinks.map((link) => ( 
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 hover:text-blue-600 font-medium transition py-1"
                            >
                                {link.name}
                            </Link>
                        ))}
                        
                        {dashboardLink && (<Link
                            key={dashboardLink.name}
                            href={dashboardLink.href} 
                            className="text-gray-600 hover:text-blue-600 font-medium transition py-1"
                        >
                            {dashboardLink.name}
                        </Link>
                        )}
                        <AuthControls />
                    </div>
                    
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {publicNavLinks.map((link) => ( 
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                        {dashboardLink && (
                            <Link
                                key={dashboardLink.name}
                                href={dashboardLink.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                {dashboardLink.name}
                            </Link>
                        )}
                        <div className="pt-2 border-t border-gray-100 px-3">
                            <AuthControls />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}