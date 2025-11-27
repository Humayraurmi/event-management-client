"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Alice Rahman",
      role: "Entrepreneur",
      imageUrl: "https://i.ibb.co.com/cShYsgxH/dr-1.jpg",
      message:
        "The Annual Tech Innovation Summit was amazing! I learned so much about AI and networking with industry leaders.",
    },
    {
      id: 2,
      name: "Rafiq Ahmed",
      role: "Food Blogger",
      imageUrl: "https://i.ibb.co.com/Zp5KCp7K/amit.webp",
      message:
        "The Dhaka Food & Music Festival was a delight! Great food, lively music, and a fun atmosphere for the whole family.",
    },
    {
      id: 3,
      name: "Sofia Khan",
      role: "Photographer",
      imageUrl: "https://i.ibb.co.com/qHdrz1B/download-11.jpg",
      message:
        "The Photography Workshop was fantastic. The hands-on guidance from Hasan Khan improved my skills tremendously.",
    },
  ];

  const cardVariants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", bounce: 0.3, duration: 0.8 }
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-black mb-12">
        What People Are Saying
      </h2>

      <div className="flex flex-wrap justify-center gap-10">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            className="w-full sm:w-3/4 lg:w-[calc(50%-1.25rem)] max-w-md mx-auto bg-gradient-to-tr from-white to-blue-50 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center hover:-translate-y-3 hover:scale-105 transition duration-500 ease-in-out relative"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={cardVariants}
            transition={{ delay: index * 0.2 }}
          >

            <span className="absolute top-4 left-4 text-blue-200 text-4xl font-bold select-none">
              “
            </span>

            <img
              src={testimonial.imageUrl}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full object-cover mb-5 border-4 border-blue-400 shadow-inner"
            />

            <p className="text-gray-800 italic mb-3 relative z-10">
              {testimonial.message}
            </p>

            <h3 className="text-lg font-bold text-black z-10">
              {testimonial.name}
            </h3>
            <span className="text-sm text-gray-500 z-10">{testimonial.role}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}