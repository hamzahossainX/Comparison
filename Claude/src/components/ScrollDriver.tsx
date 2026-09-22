'use client';

import { useEffect } from 'react';
import { clamp01, SECTION_IDS, scrollState } from '@/lib/scroll-store';

/**
 * Measures the hero and showcase sections on every animation frame and writes
 * normalised progress into the shared scroll store. It also fades the WebGL
 * layer out once the object has finished its story, so the spec and grid
 * sections sit on clean, undisturbed backgrounds.
 *
 * Renders nothing.
 */
export default function ScrollDriver() {
  useEffect(() => {
    let frame = 0;
    let running = true;

    const canvasLayer = document.getElementById('webgl-layer');

    const measure = () => {
      if (!running) return;

      const viewport = window.innerHeight;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - viewport;

      scrollState.y = window.scrollY;
      scrollState.page = scrollable > 0 ? clamp01(window.scrollY / scrollable) : 0;

      const hero = document.getElementById(SECTION_IDS.hero);
      if (hero) {
        const { top, height } = hero.getBoundingClientRect();
        scrollState.hero = clamp01(-top / (height || 1));
      }

      const showcase = document.getElementById(SECTION_IDS.showcase);
      if (showcase) {
        const { top, height } = showcase.getBoundingClientRect();
        // The sticky pane is one viewport tall, so the travelled distance is
        // the section height minus that pane.
        const travel = Math.max(height - viewport, 1);
        const progress = clamp01(-top / travel);

        scrollState.showcase = progress;
        scrollState.chapter = Math.min(2, Math.floor(progress * 3));

        // Present through the hero and showcase, then dissolve.
        const fadeOut = clamp01((top + height - viewport * 0.65) / (viewport * 0.45));
        scrollState.presence = progress >= 1 ? fadeOut : 1;
      }

      if (canvasLayer) {
        canvasLayer.style.opacity = scrollState.presence.toFixed(3);
        canvasLayer.style.visibility = scrollState.presence < 0.01 ? 'hidden' : 'visible';
      }

      frame = window.requestAnimationFrame(measure);
    };

    frame = window.requestAnimationFrame(measure);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
