import './App.css';

import { useState, useRef } from "react";
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/UI/navbar/navbar';
import Footer from './components/UI/footer/footer';
import Home from './pages/home/home';
import Cart from './pages/cart/cart';

import Bg from './components/UX/BackGround/Bg';
import Load from './components/UX/load/load';
import MusicPlayer from './components/music/music';
import ModalWindow from './components/ModalWindow/ModalWindow';

import { useScrollSmoother } from './hooks/useScrollSmoother';
import { useMusicPermission } from './hooks/useMusicPermission';
import { useAOS } from './hooks/useAOS';


function App() {

/////////////////////////////////////////////////////////////////////////
  const [loadingDone, setLoadingDone] = useState(false);
  const smoothWrapperRef = useRef(null);

  useScrollSmoother(smoothWrapperRef, loadingDone);
  useAOS();
  
  const {
    showMusicModal,
    autoplayPermission,
    handleAccept,
    handleDecline
  } = useMusicPermission(loadingDone);
/////////////////////////////////////////////////////////////////////////

const NotFound = () => (
  <div
    style={{
      margin: "10px auto",
      maxWidth: "600px",
      textAlign: "center",
      
    }}
  >
    <h1
      style={{
        margin: "30px 0",
        marginTop: "50%",
        marginBottom: "50%",
        fontSize: "4em",
        lineHeight: 1,
        letterSpacing: "-1px",
      }}
    >
      404 - Page Not Found
    </h1>
  </div>
);


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
            onAutoplayPermissionChange={(permission) => {}} // Remove if not needed
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