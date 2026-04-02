"use client";

import { useEffect } from "react";

function scrollToHashTarget() {
  const hash = window.location.hash;

  if (!hash) {
    return;
  }

  const target = document.querySelector<HTMLElement>(hash);

  if (!target) {
    return;
  }

  target.scrollIntoView({ block: "start" });
}

export default function SelectedWorksHashFix() {
  useEffect(() => {
    if (window.location.hash !== "#prints") {
      return;
    }

    const raf = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        scrollToHashTarget();
      });
    });

    const timeout = window.setTimeout(() => {
      scrollToHashTarget();
    }, 450);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };
  }, []);

  return null;
}
