import './App.css';

import { useState, useEffect, useRef } from "react";
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/UI/navbar/navbar';
import Footer from './components/UI/footer/footer';
import Home from './pages/home/home';
import Cart from './pages/cart/cart';

import Bg from './components/UX/BackGround/Bg';
import Load from './components/UX/load/load';
import MusicPlayer from './components/music/music';
import ModalWindow from './components/ModalWindow/ModalWindow';

import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {

  const [loadingDone, setLoadingDone] = useState(false);
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [autoplayPermission, setAutoplayPermission] = useState(false);
  const smoothWrapperRef = useRef(null);

  const NotFound = () => <div><h1>404 - Page Not Found</h1></div>;
////////////////////////////////////
  useEffect(() => {
    if (loadingDone && smoothWrapperRef.current) {
    
      document.querySelector('.gradient-bg').classList.add('fixed-bg');
      
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,

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
  //////////////////////////////////////////////////////////////////////////// Modal window based on choice
  useEffect(() => {
    if (loadingDone) {
      const savedPermission = localStorage.getItem('musicPermission');
      
      if (savedPermission === 'agreed') {
        // User previously agreed, don't show modal
        setShowMusicModal(false);
      } else {
        // No saved preference, show the modal
        setShowMusicModal(true);
      }
    }
  }, [loadingDone]);
  // Handle music permission choices
  const handleAccept = (rememberChoice) => {
    setAutoplayPermission(true);
    setShowMusicModal(false);
    
    if (rememberChoice) {
      localStorage.setItem('musicPermission', 'agreed');
    }
  };
  
  const handleDecline = () => {
    setAutoplayPermission(false);
    setShowMusicModal(false);
  };
////////////////////////////////////
  return (
    <>
    <Bg />
    
    {!loadingDone ? (
      <Load onFinish={() => setLoadingDone(true)} />
    ) : (
      <>
        <Navbar />
        <MusicPlayer 
          key={autoplayPermission ? "music-enabled" : "music-disabled"}
          autoplayPermission={autoplayPermission} 
          onAutoplayPermissionChange={setAutoplayPermission} 
        />
        {showMusicModal && (
          <ModalWindow 
            onAccept={handleAccept}
            onDecline={handleDecline}
            showRememberOption={true}
          />
        )}

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