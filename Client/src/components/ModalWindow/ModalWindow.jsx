import React, { useState } from 'react';
import './ModalWindow.css';

const ModalWindow = ({ onAccept, onDecline, showRememberOption = false }) => {
  const [rememberChoice, setRememberChoice] = useState(true);

  const handleAccept = () => {
    onAccept(rememberChoice);
  };

  const handleDecline = () => {
    onDecline();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" 
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="100"
        data-aos-offset="0" 
        data-aos-duration="1000">
        <div className="modal-header">
          <h2>Music Player</h2>
        </div>
        <div className="modal-content">
          <p>Would you like to enable music?</p>
          {showRememberOption && (
            <label className="remember-choice">
              <input 
                type="checkbox" 
                checked={rememberChoice} 
                onChange={(e) => setRememberChoice(e.target.checked)} 
              />
              Remember my choice
            </label>
          )}
        </div>
        <div className="modal-footer">
          <button className="agree-btn" onClick={handleAccept}>Yeaaaa</button>
          <button className="decline-btn" onClick={handleDecline}>Nou</button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
