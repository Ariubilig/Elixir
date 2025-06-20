import './MusicPlayer.css';
import { useEffect, useRef, useState } from 'react';
import AOS from 'aos';

import PlayIconSvg from '../../assets/icons/PlayIcon.svg';
import PauseIconSvg from '../../assets/icons/PauseIcon.svg';
import ForwardIconSvg from '../../assets/icons/ForwardIcon.svg';
import BackwardIconSvg from '../../assets/icons/BackwardIcon.svg';


const albums = [
  "7AM",
  "Setgel",
  "Paradise",
  "Untitled",
  "TARANTUULAI",
  "Waves"
];
const trackNames = [
  "Emira - 7AM",
  "Emira - Setgel",
  "Emira ft Noel - Paradise",
  "Emira ft Noel Bellatrix - Untitled",
  "Grim - TARANTUULAI",
  "Noel - Waves"
];
const trackUrls = [
  "/src/assets/Music/Emira - 7AM.mp3",
  "/src/assets/Music/Emira - Setgel.mp3",
  "/src/assets/Music/Emira ft Noel - Paradise.mp3",
  "/src/assets/Music/Emira ft Noel Bellatrix - Untitled.mp3",
  "/src/assets/Music/Grim - TARANTUULAI.mp3",
  "/src/assets/Music/Noel - Waves.mp3"
];
const artworkUrls = [
  "/src/assets/MusicImg/7AM.jpg",
  "/src/assets/MusicImg/Setgel.jpg",
  "/src/assets/MusicImg/Paradise.jpg",
  "/src/assets/MusicImg/Untitled.jpg",
  "/src/assets/MusicImg/TARANTUULAI.jpg",
  "/src/assets/MusicImg/Waves.jpg"
];


function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function MusicPlayer({ autoplayPermission, onAutoplayPermissionChange }) {

  useEffect(() => {
    AOS.refresh();
  }, []);

  const audioRef = useRef(new Audio());
  const [currIndex, setCurrIndex] = useState(() => {
    return Math.floor(Math.random() * trackUrls.length);     // Start random
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const seekRef = useRef();
  const playerRef = useRef(null);
///////////////////////////////////////////////////////////////////////////////////////////////
  const [position, setPosition] = useState(() => {
    const savedPosition = localStorage.getItem('musicPlayerPosition');
    if (savedPosition) {
      return JSON.parse(savedPosition);
    }
    return { x: 20, y: window.innerHeight - 120 };
  }); 

  const [isDragging, setIsDragging] = useState(false);

  const audio = audioRef.current;

  useEffect(() => {
    localStorage.setItem('musicPlayerPosition', JSON.stringify(position));
  }, [position]);

  // Auto play /////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const initializeAudio = async () => {
      audio.src = trackUrls[currIndex];
      audio.load();
      audio.volume = 0.15;
      
      if (autoplayPermission) {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Auto-play prevented by browser. User interaction required.");
          setIsPlaying(false);
        }
      }
    };
    
    initializeAudio();
  }, [autoplayPermission]);

  // Save position localStorage whenever it changes ///////////////////////////////////////////

  // Setup drag and drop
  useEffect(() => {
    const playerElement = playerRef.current;
    if (!playerElement) return;

    let offsetX, offsetY;

    const onMouseDown = (e) => {
      // Skip if clicking on a button or the seek bar
      if (
        e.target.tagName === 'BUTTON' || 
        e.target.closest('button') || 
        e.target.closest('#seek-bar-container')
      ) {
        return;
      }

      setIsDragging(true);
      const rect = playerElement.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      setPosition({ x, y });
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    playerElement.addEventListener('mousedown', onMouseDown);

    return () => {
      playerElement.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    audio.src = trackUrls[currIndex];
    audio.load();

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setCurrentTime(0);
      audio.volume = 0.10; // volume 0.10 = 10%
      if (autoplayPermission) {
        audio.play().catch(error => {
          console.log("Auto-play prevented by browser. User interaction required.");
        });
        setIsPlaying(autoplayPermission);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [currIndex, autoplayPermission]);

  useEffect(() => {
    const update = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', update);
    return () => {
      audio.removeEventListener('timeupdate', update);
    };
  }, []);

  const togglePlayPause = () => {
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
      if (onAutoplayPermissionChange) {
        onAutoplayPermissionChange(true);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const playNext = () => {
    setCurrIndex((i) => (i + 1) % trackUrls.length);
  };

  const playPrevious = () => {
    setCurrIndex((i) => (i - 1 + trackUrls.length) % trackUrls.length);
  };

  const seek = (e) => {
    if (isDragging) return;
    const rect = seekRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * duration;
  };

  return (
    <div 
      id="player-container" 
      ref={playerRef}
      style={{
        position: 'fixed', 
        top: position.y,
        left: position.x,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 1000,
        opacity: isPlaying ? 1 : 0.7
      }}
    >
      <div id="player"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="100"
          data-aos-offset="0" 
          data-aos-duration="2000">
        <div id="player-track" className={isPlaying ? 'active' : ''} 
             style={{ display: isPlaying ? 'block' : 'none' }}>
          <div id="album-name">{albums[currIndex]}</div>
          <div id="track-name">{trackNames[currIndex]}</div>
          <div id="track-time">
            <div id="current-time">{formatTime(currentTime)}</div>
            <div id="track-length">{formatTime(duration)}</div>
          </div>
          <div id="seek-bar-container" ref={seekRef} onClick={seek}>
            <div id="seek-bar" style={{ width: `${(currentTime / duration) * 100 || 0}%` }}></div>
          </div>
        </div>
        <div id="player-content">
          <div id="album-art" className={isPlaying ? 'active' : ''}>
            {artworkUrls.map((src, i) => (
              <img key={i} src={src} className={currIndex === i ? 'active' : ''} alt={trackNames[i]} />
            ))}
            <div id="buffer-box">Buffering ...</div>
          </div>
          <div id="player-controls">
            <button onClick={playPrevious} style={{ opacity: isPlaying ? 1 : 0.6 }}>
              <img src={BackwardIconSvg} className="control-icon" alt="Previous" />
            </button>
            <button onClick={togglePlayPause}>
              {isPlaying ? (
                <img src={PauseIconSvg} className="control-icon" alt="Pause" />
              ) : (
                <img src={PlayIconSvg} className="control-icon" alt="Play" />
              )}
            </button>
            <button onClick={playNext} style={{ opacity: isPlaying ? 1 : 0.6 }}>
              <img src={ForwardIconSvg} className="control-icon" alt="Next" />
            </button>
          </div>
          <div className="drag-handle">::</div>
        </div>
      </div>
    </div>
  );
}