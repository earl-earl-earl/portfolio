"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX, FiZoomIn, FiZoomOut } from "react-icons/fi";

interface ProjectImagePreviewProps {
  images: string[];
  title: string;
}

export default function ProjectImagePreview({ images, title }: ProjectImagePreviewProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Use useSyncExternalStore to safely check if we are on the client side (mounted)
  // without triggering a synchronous setState cascading render warning.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  
  const slideshowIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setIsHovered(false);
    setZoomLevel(1);
    setIsDragging(false);
  };

  // Reset zoom and drag state on slide change directly in event handlers.
  // This avoids cascading renders from updating state inside a useEffect hook.

  // Update container dimensions when lightbox is open or slide changes
  useEffect(() => {
    if (isLightboxOpen && containerRef.current) {
      // Small timeout to allow the browser to lay out the element
      const timer = setTimeout(() => {
        if (containerRef.current) {
          setDimensions({
            width: containerRef.current.clientWidth,
            height: containerRef.current.clientHeight
          });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isLightboxOpen, lightboxIndex]);

  // Slideshow effect on hover
  useEffect(() => {
    if (isHovered && images.length > 1) {
      slideshowIntervalRef.current = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % images.length);
      }, 3000);
    } else {
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
        slideshowIntervalRef.current = null;
      }
    }

    return () => {
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
      }
    };
  }, [isHovered, images]);

  // Lightbox key down navigation and lock scroll
  useEffect(() => {
    if (!isLightboxOpen) return;

    // Prevent body scrolling
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % images.length);
        setZoomLevel(1);
        setIsDragging(false);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
        setZoomLevel(1);
        setIsDragging(false);
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, images]);

  const handleOpenLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Open lightbox starting at the current hovered slide index
    setLightboxIndex(currentSlideIndex);
    setZoomLevel(1);
    setIsDragging(false);
    setIsLightboxOpen(true);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoomLevel(1);
    setIsDragging(false);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % images.length);
    setZoomLevel(1);
    setIsDragging(false);
  };

  // If no images provided, show fallback mockup container
  if (!images || images.length === 0) {
    return (
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 p-4 text-center">
        <span className="text-xs font-mono tracking-wider font-semibold bg-black/60 px-3 py-1.5 rounded-full border border-white/5 text-foreground/90 shadow-md">
          {title} Sandbox
        </span>
        <span className="text-[10px] text-muted-foreground font-mono">
          System Dashboard Mockup
        </span>
      </div>
    );
  }

  // Active preview image source
  const currentPreviewSrc = images[currentSlideIndex];

  const dragLimitX = ((zoomLevel - 1) * dimensions.width) / 2;
  const dragLimitY = ((zoomLevel - 1) * dimensions.height) / 2;

  return (
    <div
      className="relative w-full h-full cursor-pointer overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentSlideIndex(0);
      }}
      onClick={handleOpenLightbox}
    >
      {/* Slideshow Display */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={currentPreviewSrc}
              alt={`${title} Preview ${currentSlideIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={currentSlideIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Darken Hover Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-45" : "opacity-0"
        }`}
      />

      {/* Centered Click To View Alert */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-background font-mono text-xs font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <FiMaximize2 className="w-3.5 h-3.5" />
          <span>Click to view</span>
        </div>
      </div>

      {/* Lightbox Portal */}
      {isLightboxOpen && mounted && createPortal(
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            closeLightbox();
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-cyan/50 text-white hover:text-accent-cyan transition-all duration-200 cursor-pointer z-55"
            aria-label="Close Lightbox"
          >
            <FiX size={16} />
          </button>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-cyan/50 text-white hover:text-accent-cyan transition-all duration-200 cursor-pointer z-55"
            aria-label="Previous Image"
          >
            <FiChevronLeft size={18} />
          </button>

          {/* Image Container */}
          <div 
            className="relative max-w-[85vw] max-h-[75vh] w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative w-full h-full max-w-300 flex items-center justify-center overflow-hidden"
              >
                <div 
                  ref={containerRef}
                  className="relative w-full h-full overflow-hidden rounded-lg border border-white/5"
                >
                  <motion.div
                    drag={zoomLevel > 1}
                    dragConstraints={{
                      left: -dragLimitX,
                      right: dragLimitX,
                      top: -dragLimitY,
                      bottom: dragLimitY
                    }}
                    dragElastic={0.15}
                    animate={{
                      scale: zoomLevel,
                      x: zoomLevel === 1 ? 0 : undefined,
                      y: zoomLevel === 1 ? 0 : undefined
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                    onTap={() => {
                      setZoomLevel((prev) => (prev > 1 ? 1 : 2));
                    }}
                    className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                    style={{ 
                      cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "pointer",
                      touchAction: "none"
                    }}
                  >
                    <Image
                      src={images[lightboxIndex]}
                      alt={`${title} Lightbox ${lightboxIndex + 1}`}
                      fill
                      sizes="90vw"
                      className="object-contain select-none pointer-events-none"
                      priority
                    />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-cyan/50 text-white hover:text-accent-cyan transition-all duration-200 cursor-pointer z-55"
            aria-label="Next Image"
          >
            <FiChevronRight size={18} />
          </button>

          {/* Zoom Slider Control */}
          <div 
            className="mt-4 flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 select-none z-55 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomLevel((prev) => Math.max(1, prev - 0.2))}
              className="text-white/60 hover:text-accent-cyan transition-colors"
              title="Zoom Out"
            >
              <FiZoomOut size={16} />
            </button>
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={zoomLevel}
              onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
              className="w-32 sm:w-48 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent-cyan outline-none"
            />
            <button
              onClick={() => setZoomLevel((prev) => Math.min(3, prev + 0.2))}
              className="text-white/60 hover:text-accent-cyan transition-colors"
              title="Zoom In"
            >
              <FiZoomIn size={16} />
            </button>
            <span className="text-[10px] font-mono text-muted-foreground w-8 text-right">
              {zoomLevel.toFixed(1)}x
            </span>
          </div>

          {/* Image Counter & Title below the image */}
          <div 
            className="mt-4 flex flex-col items-center gap-1 select-none pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-sm font-clash font-medium text-foreground tracking-wide">
              {title}
            </span>
            <span className="text-xs font-mono text-muted-foreground bg-white/5 border border-white/10 px-3 py-1 rounded-full mt-1">
              {lightboxIndex + 1} / {images.length}
            </span>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
