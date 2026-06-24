'use client';

import { useEffect } from 'react';

export function ScrollEffects() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.scroll-card'));
    const parallaxImages = Array.from(document.querySelectorAll<HTMLElement>('.parallax-image'));
    let ticking = false;

    document.documentElement.classList.add('motion-ready');

    cards.forEach((card, index) => {
      const direction = index % 3 === 0 ? '-26px' : index % 3 === 1 ? '0px' : '26px';
      card.style.setProperty('--stagger-delay', `${Math.min(index % 5, 4) * 55}ms`);
      card.style.setProperty('--enter-x', direction);
    });

    const updateMotion = () => {
      ticking = false;
      const viewportHeight = window.innerHeight || 1;
      const lowerTrigger = viewportHeight * 0.9;
      const upperTrigger = viewportHeight * 0.08;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const isInside = rect.top < lowerTrigger && rect.bottom > upperTrigger;
        card.classList.toggle('in-view', isInside);
        card.classList.toggle('out-above', rect.bottom <= upperTrigger);
        card.classList.toggle('out-below', rect.top >= lowerTrigger);
      });

      parallaxImages.forEach((image) => {
        const rect = image.getBoundingClientRect();
        if (rect.bottom < -140 || rect.top > viewportHeight + 140) return;
        const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
        const y = Math.max(-6, Math.min(6, progress * -10));
        image.style.transform = `scale(1.025) translate3d(0, ${y}px, 0)`;
      });
    };

    const requestUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateMotion);
        ticking = true;
      }
    };

    updateMotion();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      document.documentElement.classList.remove('motion-ready');
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return null;
}
