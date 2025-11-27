"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/components/firebase.config.js";
import { onAuthStateChanged } from "firebase/auth";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                router.push("/login");
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (isLoading) {
        return <p className="text-center mt-10 text-gray-500">Checking authentication...</p>;
    }

    if (!isAuthenticated) {
        return null; 
    }

    return children;
}
