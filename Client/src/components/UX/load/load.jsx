import './load.css';
import React from 'react';

const loadingNames = ["RARI", "EMURACS", "SITAN", "SANDAN", "BELLATTIX", "NOEL"];


const Load = ({ onFinish }) => {

  const [currentLoadName, setCurrentLoadName] = React.useState(0);
  const [shouldShow, setShouldShow] = React.useState(true);

  React.useEffect(() => { // Check session has already loaded
    
    const sessionLoaded = sessionStorage.getItem('sessionLoaded');
    if (sessionLoaded) { // Skip loading screen if already loaded in this session
      
      setShouldShow(false);
      if (onFinish) onFinish();
      return;
      
    }

    // Show loading screen for first load in this session
    const interval = setInterval(() => {
      setCurrentLoadName((prev) => (prev + 1) % loadingNames.length);
    }, 500);

    const timer = setTimeout(() => {
      // Mark the site has been loaded in this session
      sessionStorage.setItem('sessionLoaded', 'true');
      if (onFinish) onFinish();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  // Don't render anything if we should skip the loading screen
  if (!shouldShow) {
    return null;
  }

  return (
    <div className="loading-screen">
      {loadingNames[currentLoadName]}
    </div>
  );

};

export default Load;