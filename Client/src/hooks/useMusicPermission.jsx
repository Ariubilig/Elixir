import { useState, useEffect } from 'react';

export const useMusicPermission = (loadingDone) => {
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [autoplayPermission, setAutoplayPermission] = useState(false);

  useEffect(() => {
    if (loadingDone) {
      const savedPermission = localStorage.getItem('musicPermission');
      
      if (savedPermission === 'agreed') {
        setAutoplayPermission(true);
        setShowMusicModal(false);
      } else {
        setShowMusicModal(true);
      }
    }
  }, [loadingDone]);

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

  return {
    showMusicModal,
    autoplayPermission,
    handleAccept,
    handleDecline
  };
};