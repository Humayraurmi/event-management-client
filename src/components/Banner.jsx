"use client";

import Link from "next/link";

export default function Hero() {
    return (
        <section className="w-full relative bg-gradient-to-br from-teal-100 via-white to-blue-100 overflow-hidden">

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-teal-300 opacity-20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full">
                <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 flex flex-col items-center text-center">

                    <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight max-w-3xl fadeUp">
                        Discover & Manage Events With <span className="text-teal-600">Ease</span>
                    </h1>

                    <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl fadeUp">
                        EventPro helps you explore, create, and manage events effortlessly.
                    </p>


                    <div className="mt-8 flex flex-col sm:flex-row gap-4 opacity-0 translate-y-4 animate-[fadeUp_0.8s_ease-out_0.4s_forwards]">

                        <Link
                            href="/events"
                            className="px-6 py-2.5 text-base font-semibold bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition shadow"
                        >
                            Explore Events
                        </Link>

                        <Link
                            href="/add-event"
                            className="px-6 py-2.5 text-base font-semibold border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition"
                        >
                            Create Event
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
        /* globals.css ba Hero.module.css e */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fadeUp {
  animation: fadeUp 0.8s ease-out forwards;
}

      `}</style>
        </section>
    );
}
