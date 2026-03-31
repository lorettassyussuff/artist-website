"use client";

import Image from "next/image";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

type HeroCarouselProps = {
  images: string[];
};

export default function HeroCarousel({ images }: HeroCarouselProps) {
  return (
    <div className="hero-carousel" aria-label="Installation shots">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        slidesPerView={1}
        loop={images.length > 1}
        speed={900}
        allowTouchMove={false}
        autoplay={
          images.length > 1
            ? {
                delay: 4200,
                disableOnInteraction: false,
              }
            : false
        }
      >
        {images.map((src, index) => (
          <SwiperSlide key={src} className="hero-carousel-slide">
          <Image
            src={src}
            alt={`Installation view ${index + 1} featuring Loretta Yussuff's work.`}
            fill
            sizes="(max-width: 900px) 100vw, 58vw"
            style={{ objectFit: "cover" }}
            priority={index === 0}
            unoptimized
          />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
