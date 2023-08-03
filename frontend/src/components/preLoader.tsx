import React, { useEffect, useState } from 'react';

const Preloader: React.FC = () => {
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setTyping(false);
    }, 2000);

    return () => clearTimeout(typingTimeout);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gradient-to-br from-#f72585 to-#480ca8 z-50">
      <div className="preloader-container">
        {typing ? (
          <>
            <div className="preloader-letter">T</div>
            <div className="preloader-letter">h</div>
            <div className="preloader-letter">i</div>
            <div className="preloader-letter">n</div>
            <div className="preloader-letter">k</div>
            <div className="preloader-letter">.</div>
            <div className="preloader-letter">D</div>
            <div className="preloader-letter">e</div>
            <div className="preloader-letter">v</div>
            <div className="preloader-letter">s</div>
          </>
        ) : (
          <>
            <div className="preloader-letter invisible">T</div>
            <div className="preloader-letter invisible">h</div>
            <div className="preloader-letter invisible">i</div>
            <div className="preloader-letter invisible">n</div>
            <div className="preloader-letter invisible">k</div>
            <div className="preloader-letter invisible">.</div>
            <div className="preloader-letter invisible">D</div>
            <div className="preloader-letter invisible">e</div>
            <div className="preloader-letter invisible">v</div>
            <div className="preloader-letter invisible">s</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Preloader;
