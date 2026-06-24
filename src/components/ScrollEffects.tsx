'use client';

import { useEffect } from 'react';

export function ScrollEffects() {
  useEffect(() => {
    document.documentElement.classList.add('motion-ready');
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.scroll-card'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    );

    cards.forEach((card, index) => {
      card.style.setProperty('--stagger-delay', `${Math.min(index % 6, 5) * 70}ms`);
      observer.observe(card);
    });

    const parallaxImages = Array.from(document.querySelectorAll<HTMLElement>('.parallax-image'));
    let ticking = false;

    const updateParallax = () => {
      ticking = false;
      const viewportHeight = window.innerHeight || 1;
      parallaxImages.forEach((image) => {
        const rect = image.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > viewportHeight + 120) return;
        const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
        const y = Math.max(-18, Math.min(18, progress * -34));
        image.style.transform = `scale(1.08) translate3d(0, ${y}px, 0)`;
      });
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('motion-ready');
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return null;
}
