// src/components/PhoneFrame.tsx
import React from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-purple-900 to-black p-4 sm:p-8">
      {/* Phone Body */}
      <div className="relative mx-auto w-[360px] h-[760px] sm:w-[375px] sm:h-[812px] bg-neutral-800 rounded-[60px] shadow-2xl p-3 border-4 border-neutral-900">
        {/* Notch */}
        <div className="absolute top-[13px] left-1/2 -translate-x-1/2 w-[130px] h-[28px] bg-neutral-900 rounded-b-[18px] z-20 flex items-center justify-center space-x-2">
          <div className="w-10 h-1.5 bg-neutral-700 rounded-full"></div> {/* Speaker grille line */}
        </div>

        {/* Screen */}
        <div className="w-full h-full bg-black rounded-[48px] overflow-hidden relative">
          {children}
        </div>

        {/* Side Buttons (Visual Only) */}
        <div className="absolute -left-[5px] top-[120px] w-1 h-[50px] bg-neutral-700 rounded-l-sm opacity-80"></div>
        <div className="absolute -left-[5px] top-[180px] w-1 h-[50px] bg-neutral-700 rounded-l-sm opacity-80"></div>
        <div className="absolute -right-[5px] top-[150px] w-1 h-[80px] bg-neutral-700 rounded-r-sm opacity-80"></div>
      </div>
    </div>
  );
};

export default PhoneFrame;