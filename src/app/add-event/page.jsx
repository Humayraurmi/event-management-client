'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext'; 
import Link from 'next/link';

const showToast = (message, type = 'success') => {
    console.log(`Toast: ${message} (${type})`);
};

const INITIAL_FORM_STATE = {
    title: '',
    shortDescription: '',
    fullDescription: '',
    imageUrl: '',
    metaInfo: {
        date: '',
        formattedDate: '',
        time: '',
        price: 0,
        priority: 'Medium',
        category: 'Technology',
        location: ''
    },
    isFeatured: false
};

const API_BASE_URL = 'event-management-server-ashy.vercel.app'; 

export default function AddEventPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (loading) {
        return <div className="text-center py-20 text-lg font-medium text-gray-600">Loading user data...</div>;
    }
    if (!user) {
        router.push('/login');
        return null;
    }
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name.startsWith('metaInfo.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                metaInfo: {
                    ...prev.metaInfo,
                    [field]: type === 'number' ? parseFloat(value) : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        let formattedDate = formData.metaInfo.date;
        if (formData.metaInfo.date) {
            try {
                formattedDate = new Date(formData.metaInfo.date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric'
                });
            } catch (e) {
            }
        }

        const dataToSend = {
            ...formData,
            slug,
            metaInfo: {
                ...formData.metaInfo,
                formattedDate: formattedDate,
                price: parseFloat(formData.metaInfo.price) || 0,
            }
        };

        try {
            const res = await fetch(`${API_BASE_URL}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await res.json();

            if (res.ok) {
                showToast(result.message || "Event added successfully!", 'success');
                setFormData(INITIAL_FORM_STATE); 
                                router.push('/dashboard/events'); 
                
            } else {
                showToast(result.message || "Failed to add event. Check server logs.", 'error');
            }

        } catch (error) {
            showToast("Network Error: Could not reach the server.", 'error');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 max-w-7xl mx-auto"> 
            <div className="max-w-4xl mx-auto py-10 px-6 sm:px-8 lg:px-10">
                <h1 className="text-4xl font-extrabold mb-10 text-gray-900 border-b pb-4 text-center">New Event Submission</h1>
                
                <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
                    
                    <h2 className="text-2xl font-bold p-5 text-blue-700 pb-3 border-b border-blue-100">Event Details</h2>
                    
                    <div className="space-y-6 p-5">
                        <div className='px-5'>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>
                       
                        <div className='px-5'>
                            <label htmlFor="shortDescription" className="block text-sm font-semibold text-gray-700 mb-1">Short Description</label>
                            <input type="text" id="shortDescription" name="shortDescription" value={formData.shortDescription} onChange={handleChange} required
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>

                        <div className='px-5'>
                            <label htmlFor="fullDescription" className="block text-sm font-semibold text-gray-700 mb-1">Full Description</label>
                            <textarea id="fullDescription" name="fullDescription" rows="4" value={formData.fullDescription} onChange={handleChange} required
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>
                        
                        <div className='px-5'>
                            <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-1">Image URL (Optional)</label>
                            <input type="url" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-blue-700 pt-6 px-5 pb-3 border-b border-blue-100">Date, Price & Location</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5">
                        <div className='px-5'>
                            <label htmlFor="metaInfo.date" className="block text-sm font-semibold text-gray-700 mb-1">Date/Start Date</label>
                            <input type="date" id="metaInfo.date" name="metaInfo.date" value={formData.metaInfo.date} onChange={handleChange} required
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>
                        <div className='px-5'>
                            <label htmlFor="metaInfo.time" className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
                            <input type="text" id="metaInfo.time" name="metaInfo.time" value={formData.metaInfo.time} onChange={handleChange} placeholder="e.g., 7:00 PM - 9:30 PM" required
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>
                        <div className='px-5'>
                            <label htmlFor="metaInfo.price" className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
                            <input type="number" id="metaInfo.price" name="metaInfo.price" value={formData.metaInfo.price} onChange={handleChange} required
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5">
                        <div className='px-5'>
                            <label htmlFor="metaInfo.location" className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                            <input type="text" id="metaInfo.location" name="metaInfo.location" value={formData.metaInfo.location} onChange={handleChange} required
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>
                        <div className='px-5'>
                            <label htmlFor="metaInfo.category" className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                            <select id="metaInfo.category" name="metaInfo.category" value={formData.metaInfo.category} onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                                <option value="Technology">Technology</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Education">Education</option>
                                <option value="Business">Business</option>
                                <option value="Arts">Arts</option>
                                <option value="Sports">Sports</option>
                                <option value="Community">Community</option>
                            </select>
                        </div>
                        <div className='px-5'>
                            <label htmlFor="metaInfo.priority" className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
                            <select id="metaInfo.priority" name="metaInfo.priority" value={formData.metaInfo.priority} onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-start pt-6 border-t border-gray-100 p-5">
                        <div className="flex items-center h-5">
                            <input id="isFeatured" name="isFeatured" type="checkbox" checked={formData.isFeatured} onChange={handleChange}
                                className="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="isFeatured" className="font-semibold text-gray-900">Mark as Featured</label>
                            <p className="text-gray-500 mt-0.5">Feature this event on the homepage for increased visibility.</p>
                        </div>
                    </div>


                    <div className="pt-4 pb-4"> 
                        <button type="submit" disabled={isSubmitting}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 transition duration-300">
                            {isSubmitting ? 'Adding Event...' : 'Submit Event'}
                        </button>
                    </div>

                </form>
                <div className="text-center mt-6">
                    <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
                        ← Back to Event Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}