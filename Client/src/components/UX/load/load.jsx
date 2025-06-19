import './load.css';
import React from 'react';

const loadingNames = ["RARI", "EMURACS", "SITAN", "SANDAN", "BELLATTIX", "NOEL"];

const Load = ({ onFinish }) => {
  const [currentLoadName, setCurrentLoadName] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLoadName((prev) => (prev + 1) % loadingNames.length);
    }, 500);

    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (

    <div className="loading-screen">
      {loadingNames[currentLoadName]}
    </div>

  );
};

export default Load;
