
"use client";

import { CheckCircleIcon } from '@heroicons/react/24/outline'; 
import { motion } from "framer-motion"; 

export default function Features() {
  const features = [
    {
      name: "Easy Ticket Booking",
      description: "Book any event ticket in less than 60 seconds with our simple checkout process.",
      icon: <CheckCircleIcon className="w-8 h-8 text-blue-600" />,
    },
    {
      name: "24/7 Live Support",
      description: "Our dedicated support team is always available to help you with any queries or issues.",
      icon: <CheckCircleIcon className="w-8 h-8 text-blue-600" />,
    },
    {
      name: "Secure Online Payment",
      description: "All payments are processed securely securely using encrypted gateway, ensuring your data is safe.",
      icon: <CheckCircleIcon className="w-8 h-8 text-blue-600" />,
    },
    {
      name: "Instant Confirmation",
      description: "Receive instant email and SMS confirmation upon successful booking of your event.",
      icon: <CheckCircleIcon className="w-8 h-8 text-blue-600" />,
    },
  ];

  const featureCardVariants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", bounce: 0.3, duration: 0.8 }
    }
  };

  return (
    <div className="py-10"> 
      <h2 className="text-3xl font-bold text-center mb-10 text-black">
        Why Choose Us?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial="offscreen" 
            whileInView="onscreen" 
            viewport={{ once: true, amount: 0.5 }} 
            variants={featureCardVariants} 
            transition={{ delay: index * 0.15 }} 
            className="w-full max-w-sm p-6 bg-blue-50 rounded-xl shadow-lg border border-blue-100 
                       hover:shadow-xl hover:border-blue-300 transition duration-300 transform hover:-translate-y-1" 
          >
            <div className="flex justify-center items-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-black text-center mb-2">
              {feature.name}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}