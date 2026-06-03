"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Menu */}
      {isOpen && (
        <div 
          className="mb-4 rounded-2xl border border-green-500/50 bg-gradient-to-br from-gray-800/95 via-gray-800/90 to-gray-900/95 p-6 shadow-2xl shadow-green-500/30 w-80 backdrop-blur-xl animate-[fadeIn_0.3s_ease-in-out]"
          data-aos="fade-up"
        >
          <div className="mb-4">
            <h3 className="font-nacelle font-semibold text-white mb-1 text-lg">Chat with us</h3>
            <p className="text-sm text-green-200/75">
              We're here to help! Send us a message on WhatsApp and we'll respond within 24 hours.
            </p>
          </div>
          <a
            href="https://wa.me/919524899042?text=Hi%20Code2Crest%2C%20I%20would%20like%20to%20discuss%20my%20project"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-center text-sm font-medium text-white transition duration-300 hover:shadow-xl hover:shadow-green-500/50 hover:scale-105 active:scale-95 font-semibold"
          >
            Start WhatsApp Chat
          </a>
        </div>
      )}

      {/* Floating Button with Glow */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us"
      >
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-green-600 blur-lg opacity-75 group-hover:opacity-100 animate-pulse" />
        
        {/* Middle glow ring */}
        <div className="absolute inset-0 rounded-full border-2 border-green-400/50 animate-pulse group-hover:border-green-400" />
        
        {/* Inner button */}
        <FaWhatsapp className="relative z-10 h-9 w-9" />
      </button>
    </div>
  );
}
