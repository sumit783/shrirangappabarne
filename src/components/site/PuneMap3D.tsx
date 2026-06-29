"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

// The 6 Assembly constituencies in Maval Lok Sabha
const locations = [
  { id: "panvel", name: "पनवेल", x: 20, y: 30 },
  { id: "karjat", name: "कर्जत", x: 30, y: 15 },
  { id: "uran", name: "उरण", x: 10, y: 40 },
  { id: "maval", name: "मावळ", x: 50, y: 35 },
  { id: "chinchwad", name: "चिंचवड", x: 70, y: 45 },
  { id: "pimpri", name: "पिंपरी", x: 85, y: 50 },
];

export function PuneMap3D({ className }: { className?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div 
      className={cn(
        "relative w-full aspect-square md:aspect-video flex items-center justify-center overflow-visible",
        className
      )}
    >
      {/* 3D Container - Tilts the map */}
      <div 
        className="relative w-[75%] h-[75%] transition-transform duration-1000 ease-out hover:scale-105"
        style={{
          transformStyle: "preserve-3d",
          transform: "perspective(1000px) rotateX(60deg) rotateZ(-35deg)",
        }}
      >
        {/* Base Map Platform */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-orange-100/80 to-orange-300/40 rounded-[3rem] border border-orange-500/30 backdrop-blur-sm"
          style={{
            transform: "translateZ(0px)",
            boxShadow: "20px 20px 50px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.4)"
          }}
        >
          {/* Abstract topography layers */}
          <div 
            className="absolute inset-6 rounded-[2.5rem] bg-orange-500/10 border border-orange-400/20"
            style={{ transform: "translateZ(15px)" }}
          />
          <div 
            className="absolute inset-12 rounded-[2rem] bg-orange-500/15 border border-orange-400/30"
            style={{ transform: "translateZ(30px)" }}
          />
        </div>

        {/* 3D Pins / Markers */}
        {locations.map((loc) => {
          const isHovered = hovered === loc.id;
          return (
            <div
              key={loc.id}
              className="absolute group cursor-pointer"
              style={{
                left: `${loc.x}%`,
                top: `${loc.y}%`,
                // Keep the marker exactly at this point in the 3D plane, 
                // but cancel out the rotation so it stands straight up facing the camera
                transform: `translateZ(${isHovered ? '80px' : '50px'}) rotateZ(35deg) rotateX(-60deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              onMouseEnter={() => setHovered(loc.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Pin Base (Stem) */}
              <div className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 rounded-full transition-all duration-300 origin-bottom",
                isHovered ? "h-16 bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)]" : "h-10 bg-orange-400/80"
              )}>
                {/* Pin Head */}
                <div className={cn(
                  "absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-[3px] border-white transition-all duration-300 shadow-md",
                  isHovered ? "bg-orange-600 scale-125" : "bg-orange-500"
                )} />
              </div>
              
              {/* Shadow on the map plane */}
              <div 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-black/30 rounded-full blur-[2px] transition-all duration-300"
                style={{ 
                  transform: "rotateX(60deg) rotateZ(-35deg)",
                  opacity: isHovered ? 0.2 : 0.4,
                  transformOrigin: "center center"
                }}
              />
              
              {/* Floating Label */}
              <div 
                className={cn(
                  "absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold shadow-xl transition-all duration-300 backdrop-blur-md",
                  isHovered 
                    ? "bg-white text-orange-600 scale-110 border-orange-200 border" 
                    : "bg-white/90 text-gray-600 border border-transparent"
                )}
              >
                {loc.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
