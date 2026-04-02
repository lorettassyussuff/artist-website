"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { PrintCard } from "@/lib/sanity/queries";

type PrintCarouselProps = {
  prints: PrintCard[];
};

export default function PrintCarousel({ prints }: PrintCarouselProps) {
  const transitionTimeoutRef = useRef<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  function goToIndex(nextIndex: number, nextDirection: "next" | "prev") {
    if (nextIndex === currentIndex) {
      return;
    }

    if (transitionTimeoutRef.current !== null) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    setDirection(nextDirection);
    setIsEntering(false);
    setIsTransitioning(true);

    transitionTimeoutRef.current = window.setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsTransitioning(false);
      setIsEntering(true);

      transitionTimeoutRef.current = window.setTimeout(() => {
        setIsEntering(false);
        transitionTimeoutRef.current = null;
      }, 260);
    }, 220);
  }

  const previous = () => {
    goToIndex((currentIndex - 1 + prints.length) % prints.length, "prev");
  };

  const next = () => {
    goToIndex((currentIndex + 1) % prints.length, "next");
  };

  return (
    <div className="print-carousel">
      <div className="print-carousel-frame">
        <button
          type="button"
          className="print-carousel-button print-carousel-button-left"
          onClick={previous}
          aria-label="Previous print"
        >
          ←
        </button>

        <figure
          className={`print-carousel-card${
            isTransitioning ? " is-transitioning" : ""
          }${isEntering ? " is-entering" : ""}${
            direction === "prev" ? " is-prev" : " is-next"
          }`}
        >
          <Image
            src={prints[currentIndex].src}
            alt={prints[currentIndex].title}
            width={1200}
            height={1600}
            className="print-image"
          />
        </figure>

        <button
          type="button"
          className="print-carousel-button print-carousel-button-right"
          onClick={next}
          aria-label="Next print"
        >
          →
        </button>
      </div>

      <div className="print-caption">
        <p className="print-title">{prints[currentIndex].title}</p>
        <p className="print-medium">{prints[currentIndex].medium}</p>
        <p className="print-credit">{prints[currentIndex].credit}</p>
      </div>

      <div className="print-carousel-dots" aria-label="Print navigation">
        {prints.map((print, index) => (
          <button
            key={print.src}
            type="button"
            className={`print-carousel-dot${
              index === currentIndex ? " active" : ""
            }`}
            onClick={() =>
              goToIndex(index, index > currentIndex ? "next" : "prev")
            }
            aria-label={`Go to print ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
