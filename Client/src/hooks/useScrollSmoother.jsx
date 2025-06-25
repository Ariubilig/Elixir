import { useEffect } from 'react';
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const useScrollSmoother = (wrapperRef, loadingDone) => {
  useEffect(() => {
    if (loadingDone && wrapperRef.current) {
      document.querySelector('.gradient-bg')?.classList.add('fixed-bg');
      
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true
      });
    }
  }, [loadingDone, wrapperRef]);
};