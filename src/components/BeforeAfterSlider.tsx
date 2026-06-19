'use client';

import React, { useState } from 'react';
import { Eye } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before Treatment',
  afterLabel = 'After Smile'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-100 select-none group">
      {/* Before Image (Background) */}
      <img
        src={beforeImage}
        alt={beforeLabel}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      
      <div className="absolute left-4 bottom-4 bg-slate-900/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold z-20">
        {beforeLabel}
      </div>

      {/* After Image (Foreground, clipped) */}
      <div
        className="absolute inset-0 overflow-hidden z-10"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={afterImage}
          alt={afterLabel}
          // The image needs to be the full width of the container, otherwise it gets squeezed
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: '100%', height: '100%', minWidth: '100%' }}
          loading="lazy"
        />
      </div>
      
      <div
        className="absolute bottom-4 bg-primary/95 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold z-20 transition-all duration-75"
        style={{ left: `calc(${sliderPosition}% - 110px)` }}
      >
        {afterLabel}
      </div>

      {/* Drag Bar Indicator */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-primary text-white border-2 border-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Eye className="h-4.5 w-4.5" />
        </div>
      </div>

      {/* Actual Range Slider (Hidden input covering the card) */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 slider-thumb-custom"
      />
    </div>
  );
};
