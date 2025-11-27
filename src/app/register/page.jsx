"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/components/firebase.config";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const { updateUserProfile } = useAuth();

    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
            router.push("/");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await createUserWithEmailAndPassword(auth, email, password);

            await updateUserProfile(name, photoURL);

            router.push("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-200">

                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Create an Account
                </h2>

                {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

                <form onSubmit={handleRegister} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Photo URL (optional)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />


                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        Register
                    </button>
                </form>

                <div className="my-4 flex items-center gap-3">
                    <div className="h-px bg-gray-300 flex-1"></div>
                    <p className="text-gray-500 text-sm">or</p>
                    <div className="h-px bg-gray-300 flex-1"></div>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        className="w-5 h-5"
                    />
                    <span className="text-gray-700 font-medium">Continue with Google</span>
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a className="text-blue-600 hover:underline" href="/login">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
