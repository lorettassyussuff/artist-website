"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Slide {
  title: string;
  year: string;
  medium?: string;
  exhibition: string;
  imageUrl: string;
}

const slides: Slide[] = [
  {
    title: "Joy Under the Sun",
    year: "2025",
    medium: "linocut",
    exhibition: "The Spaces Between, Arts SU Gallery",
    imageUrl: "https://placehold.co/1200x800/111111/333333",
  },
  {
    title: "Psalm 1: Reload It",
    year: "2025",
    exhibition: "The Spaces Between, Arts SU Gallery",
    imageUrl: "https://placehold.co/1200x800/111111/2a2a2a",
  },
  {
    title: "Mourning in Gaza",
    year: "2025",
    medium: "linocut",
    exhibition: "UAL Postgrad Show, Camberwell",
    imageUrl: "https://placehold.co/1200x800/111111/222222",
  },
  {
    title: "Psalm 2: Death Waiting",
    year: "2025",
    exhibition: "UAL Postgrad Show, Camberwell",
    imageUrl: "https://placehold.co/1200x800/111111/1a1a1a",
  },
];

export default function Slideshow() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = useCallback(
    (index: number) => {
      setVisible(false);
      setTimeout(() => {
        setCurrent(index);
        setVisible(true);
      }, 400);
    },
    []
  );

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "820px",
        margin: "0 auto",
        padding: "0 1.5rem",
      }}
    >
      {/* Image container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "3 / 2",
          overflow: "hidden",
          background: "#0a0a0a",
        }}
      >
        {/* Slide image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            fill
            style={{ objectFit: "cover" }}
            priority
            unoptimized
          />
        </div>

        {/* Prev button */}
        <button
          onClick={prev}
          aria-label="Previous"
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.4)",
            border: "none",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            padding: "0.6rem 0.8rem",
            fontSize: "1.2rem",
            lineHeight: 1,
            transition: "color 0.2s",
            zIndex: 10,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
          }
        >
          &#8592;
        </button>

        {/* Next button */}
        <button
          onClick={next}
          aria-label="Next"
          style={{
            position: "absolute",
            right: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.4)",
            border: "none",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            padding: "0.6rem 0.8rem",
            fontSize: "1.2rem",
            lineHeight: 1,
            transition: "color 0.2s",
            zIndex: 10,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
          }
        >
          &#8594;
        </button>
      </div>

      {/* Caption */}
      <div
        style={{
          marginTop: "1.25rem",
          textAlign: "center",
          minHeight: "3.5rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "0.95rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
            marginBottom: "0.3rem",
          }}
        >
          <em>{slide.title}</em>
          {slide.medium && (
            <span
              style={{ color: "rgba(255,255,255,0.50)", fontWeight: 400 }}
            >
              {" "}
              &mdash; {slide.year}, {slide.medium}
            </span>
          )}
          {!slide.medium && (
            <span
              style={{ color: "rgba(255,255,255,0.50)", fontWeight: 400 }}
            >
              {" "}
              ({slide.year})
            </span>
          )}
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.40)",
            fontSize: "0.78rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {slide.exhibition}
        </p>
      </div>

      {/* Dot indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.6rem",
          marginTop: "1.25rem",
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? "1.8rem" : "0.45rem",
              height: "0.45rem",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background: i === current ? "#ffc600" : "rgba(255,255,255,0.25)",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
