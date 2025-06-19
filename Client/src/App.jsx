import './App.css';

import { useState, useEffect, useRef } from "react";
import { Routes, Route } from 'react-router-dom';

import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/UI/navbar/navbar';
import Footer from './components/UI/footer/footer';
import Home from './pages/home/home';
import Cart from './pages/cart/cart';

import Bg from './components/UX/BackGround/Bg';
import Load from './components/UX/load/load';
import MusicPlayer from './components/music/music';

function App() {

  const [loadingDone, setLoadingDone] = useState(false);
  const smoothWrapperRef = useRef(null);

  const NotFound = () => <div><h1>404 - Page Not Found</h1></div>;
////////////////////////////////////
  useEffect(() => {
    if (loadingDone && smoothWrapperRef.current) {
      // Add class to the background to ensure it's excluded from ScrollSmoother
      document.querySelector('.gradient-bg').classList.add('fixed-bg');
      
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        // Explicitly exclude background elements from smooth scrolling
        normalizeScroll: true,
        ignoreMobileResize: true
      });
    }
  }, [loadingDone]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);  
////////////////////////////////////
  return (
    <>
    <Bg />
    
    {!loadingDone ? (
      <Load onFinish={() => setLoadingDone(true)} />
    ) : (
      <>
        <Navbar />
        <MusicPlayer />

        <div id="smooth-wrapper" ref={smoothWrapperRef}>
          <div id="smooth-content">

            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/Cart" element={<Cart />} />

              <Route path="*" element={<NotFound />} />

            </Routes>
            
            <Footer />

          </div>
        </div>

        </>
      )}
    </>
  );
}

export default App;
