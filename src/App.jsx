import { useState, useEffect } from 'react'
import './App.css'
import Bg from './BackGround/Bg'

// Import icon images directly from assets
import instaLightIcon from '/img/icons/insta-light.png'
import instaDarkIcon from '/img/icons/insta-dark.png'
import phoneLightIcon from '/img/icons/phone-light.png'
import phoneDarkIcon from '/img/icons/phone-dark.png'

// Artists data for loading screen
const artists = ["RARI", "EMURACS", "SITAN", "SANDAN", "BELLATTIX", "NOEL"];

// Music content data
const musicContent = [
  {
    title: "Grim  - TARANTUULAI",
    thumbnail: `https://i.ytimg.com/vi/0hMYVg5IXHk/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYACzgWKAgwIABABGEogUShlMA8=&rs=AOn4CLCN1kbYQC5OXB3hdqFlkz5ir0p7iQ`,
    youtubeLink: "https://youtu.be/U01YNKD11o8",
  },
  {
    title: "Bellatrix  - Uuriin Gegee",
    thumbnail: `https://i.ytimg.com/an_webp/lwj7M1-Wy8Y/mqdefault_6s.webp?du=3000&sqp=CMLW7b8G&rs=AOn4CLD73ZIjHAdpTbuDItn1BqGme37ZKw`,
    youtubeLink: "https://youtu.be/lwj7M1-Wy8Y",
  },
  {
    title: "Emira ft Noel & Bellatrix - Untitled",
    thumbnail: `https://i.ytimg.com/vi/U01YNKD11o8/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYACzgWKAgwIABABGEogUihlMA8=&rs=AOn4CLBLIkf5CAv4-JLU3_DSDzEO-eENjw`,
    youtubeLink: "https://youtu.be/U01YNKD11o8",
  }
];

function App() {
  // Get initial dark mode preference before rendering anything
  const prefersDarkMode = localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);
  const [loading, setLoading] = useState(true);
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);

  // Apply theme immediately before component mounts
  useEffect(() => {
    // Apply theme settings before any rendering
    document.documentElement.classList.toggle('dark', prefersDarkMode);
    
    if (prefersDarkMode) {
      document.documentElement.style.setProperty('--bg-color', 'var(--bg-color-dark)');
      document.documentElement.style.setProperty('--text-color', 'var(--text-color-dark)');
      document.documentElement.style.setProperty('--color-bg1', 'hsl(0, 0%, 0%)');
      document.documentElement.style.setProperty('--color-bg2', 'hsl(0, 0%, 0%)');
    } else {
      document.documentElement.style.setProperty('--bg-color', 'var(--bg-color-light)');
      document.documentElement.style.setProperty('--text-color', 'var(--text-color-light)');
      document.documentElement.style.setProperty('--color-bg1', 'hsl(0, 0%, 90%)');
      document.documentElement.style.setProperty('--color-bg2', 'hsl(0, 0%, 80%)');
    }
  }, []); // Empty dependency array so this only runs once

  useEffect(() => {
    // Add transitioning class before changing theme
    document.documentElement.classList.add('transitioning');
    
    // Set dark mode class on html element
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    // Apply CSS variables directly
    if (isDarkMode) {
      document.documentElement.style.setProperty('--bg-color', 'var(--bg-color-dark)');
      document.documentElement.style.setProperty('--text-color', 'var(--text-color-dark)');
      document.documentElement.style.setProperty('--color-bg1', 'hsl(0, 0%, 0%)');
      document.documentElement.style.setProperty('--color-bg2', 'hsl(0, 0%, 0%)');
    } else {
      document.documentElement.style.setProperty('--bg-color', 'var(--bg-color-light)');
      document.documentElement.style.setProperty('--text-color', 'var(--text-color-light)');
      document.documentElement.style.setProperty('--color-bg1', 'hsl(0, 0%, 90%)');
      document.documentElement.style.setProperty('--color-bg2', 'hsl(0, 0%, 80%)');
    }
    
    // Force update the moving-text spans color immediately
    const movingTextSpans = document.querySelectorAll('.moving-text span');
    if (movingTextSpans.length) {
      movingTextSpans.forEach(span => {
        span.style.color = isDarkMode ? 'var(--text-color-dark)' : 'var(--text-color-light)';
      });
    }
    
    // Force update shopping cart and copyright text
    const shoppingCartIcon = document.querySelector('.shopping-cart .material-symbols-outlined');
    if (shoppingCartIcon) {
      shoppingCartIcon.style.color = isDarkMode ? 'var(--text-color-dark)' : 'var(--text-color-light)';
    }
    
    const copyrightText = document.querySelector('.copyright-text');
    if (copyrightText) {
      copyrightText.style.color = isDarkMode ? 'var(--text-color-dark)' : 'var(--text-color-light)';
    }
    
    // Save preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Remove transitioning class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('transitioning');
    }, 700); // Match with CSS transition duration
  }, [isDarkMode]);

  // Apply correct theme to loading screen immediately
  useEffect(() => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
      loadingScreen.style.color = isDarkMode ? 'var(--text-color-dark)' : 'var(--text-color-light)';
    }
  }, [isDarkMode, currentArtistIndex]);
  
  // Loading screen effect
  useEffect(() => {
    if (loading) {
      document.body.classList.add('loading');
      
      // Apply theme to loading screen immediately
      const loadingScreen = document.querySelector('.loading-screen');
      if (loadingScreen) {
        loadingScreen.style.color = isDarkMode ? 'var(--text-color-dark)' : 'var(--text-color-light)';
      }
      
      const interval = setInterval(() => {
        setCurrentArtistIndex(prev => (prev + 1) % artists.length);
      }, 500);
      
      // Hide loading screen after 3 seconds
      const timeout = setTimeout(() => {
        setLoading(false);
        document.body.classList.remove('loading');
      }, 3000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [loading, isDarkMode]);
  
  const toggleDarkMode = () => {
    // Add transitioning class before changing theme
    document.documentElement.classList.add('transitioning');
    
    // Toggle dark mode
    setIsDarkMode(prev => !prev);
    
    // Remove transitioning class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('transitioning');
    }, 700); // Match with CSS transition duration
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  };

  // Disable smooth scrolling everywhere
  useEffect(() => {
    // Ensure no smooth scrolling anywhere
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    
    // For mobile devices, ensure no snap scrolling
    if (window.innerWidth <= 768) {
      const scrollContainer = document.querySelector('.scroll-container');
      if (scrollContainer) {
        scrollContainer.style.scrollSnapType = 'none';
        scrollContainer.style.scrollBehavior = 'auto';
      }
    }
  }, []);

  return (
    <>
      <Bg />
      
      {loading ? (
        <div className="loading-screen">
          {artists[currentArtistIndex]}
        </div>
      ) : (
        <div className="scroll-container">
          <header className="w-full">
            <div className="header-content">
              <div className="text-2xl anton logo-text" onClick={scrollToTop}>ELIXIR KOMBINAT</div>
              <div className="flex items-center space-x-4" id="header-buttons">
                <button className="p-2 border border-gray-700 rounded-full text-lg flex items-center shopping-cart" aria-label="Shopping cart">
                  <span className="material-symbols-outlined">shopping_cart</span>
                </button>
                <button 
                  className="p-2 border border-gray-700 rounded-full text-lg flex items-center dark-mode-toggle"
                  onClick={toggleDarkMode}
                >
                  <span className="material-symbols-outlined">
                    {isDarkMode ? 'light_mode' : 'dark_mode'}
                  </span>
                </button>
              </div>
            </div>
            <div className="header-line"></div>
          </header>

          {/* First Page */}
          <section className="full-page-section first-section">
            <div className="content-wrapper">
              <div className="text-9xl font-bold flex space-x-2 moving-text protest-revolution">
                <span>E</span><span>L</span><span>I</span><span>X</span><span>I</span><span>R</span>
              </div>
              <div className="mt-8 text-center text-base max-w-md shadows-into-light">    
                WE'RE A GROUP OF YOUNG PEOPLE STARTING OUR OWN CLOTHING BRAND /STARTING FROM THE BOTTOM/
              </div>
              <div className="mt-8 text-center max-w-md shadows-into-light custom-text">
                COMING SOON
              </div>
            </div>
          </section>

          {/* Second Page */}
          <section className="full-page-section second-section">
            <div className="content-wrapper">
              <div className="music-section-wrapper">
                <div className="music-content">
                  {musicContent.map((song, index) => (
                    <div key={index} className={`music-row ${index % 2 === 0 ? 'left' : 'right'}`}>
                      {index % 2 === 0 ? (
                        <>
                          <div className="music-item">
                            <a href={song.youtubeLink} target="_blank" rel="noreferrer" className="thumbnail-container">
                              <img 
                                src={song.thumbnail} 
                                alt={song.title} 
                                className="music-thumbnail" 
                              />
                              <div className="thumbnail-fallback">YouTube Video</div>
                            </a>
                          </div>
                          <div className="music-info shadows-into-light">
                            <h3 className="song-title">{song.title}</h3>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="music-info shadows-into-light">
                            <h3 className="song-title">{song.title}</h3>
                          </div>
                          <div className="music-item">
                            <a href={song.youtubeLink} target="_blank" rel="noreferrer" className="thumbnail-container">
                              <img 
                                src={song.thumbnail} 
                                alt={song.title} 
                                className="music-thumbnail" 
                              />
                              <div className="thumbnail-fallback">YouTube Video</div>
                            </a>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Third Page */}
          <section className="full-page-section third-section">
            <div className="content-wrapper">
              {/* Add your third page content here */}
            </div>
          </section>

          <footer className="py-12 px-8">
            <div className="header-line"></div>
            <div className="max-w-6xl mx-auto flex flex-col items-center justify-center width-90">
              <div className="flex space-x-6 mb-4">
                <a href="https://www.instagram.com/elixir_recordsofficial" target="_blank" rel="noreferrer" className="hover:opacity-70 cursor-pointer relative" style={{width: '24px', height: '24px'}}>
                  <img 
                    src={instaLightIcon} 
                    alt="Instagram" 
                    width="24" 
                    height="24" 
                    style={{
                      opacity: isDarkMode ? 0 : 1,
                      transition: 'opacity 0.5s ease',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }} 
                  />
                  <img 
                    src={instaDarkIcon} 
                    alt="Instagram" 
                    width="24" 
                    height="24" 
                    style={{
                      opacity: isDarkMode ? 1 : 0,
                      transition: 'opacity 0.5s ease',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }} 
                  />
                </a>
                <a href="tel:+976########" className="hover:opacity-70 cursor-pointer relative" style={{width: '24px', height: '24px'}}>
                  <img 
                    src={phoneLightIcon} 
                    alt="Phone" 
                    width="24" 
                    height="24" 
                    style={{
                      opacity: isDarkMode ? 0 : 1,
                      transition: 'opacity 0.5s ease',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }} 
                  />
                  <img 
                    src={phoneDarkIcon} 
                    alt="Phone" 
                    width="24" 
                    height="24" 
                    style={{
                      opacity: isDarkMode ? 1 : 0,
                      transition: 'opacity 0.5s ease',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }} 
                  />
                </a>
              </div>
              <div className="text-center text-sm copyright-text">
                © {new Date().getFullYear()} ELIXIR Records
              </div>
            </div>
          </footer>
      </div>
      )}
    </>
  )
}

export default App
