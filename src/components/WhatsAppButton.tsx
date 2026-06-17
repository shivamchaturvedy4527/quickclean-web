"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  number: string;
  message: string;
}

export function WhatsAppButton({ number, message }: WhatsAppButtonProps) {
  const cleanNumber = number.replace(/\D/g, "");
  const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
