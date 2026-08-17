import { useEffect, useState } from 'react';

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        .preloader-wrapper {
          width: 100%;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 111;
          background: #fff;
          pointer-events: none;
        }
        .preloader-wrapper .preloader {
          margin: 20% auto 0;
          transform: translateZ(0);
          position: relative;
        }
        .preloader:before,
        .preloader:after {
          content: '';
          position: absolute;
          top: 0;
        }
        .preloader:before,
        .preloader:after,
        .preloader {
          border-radius: 50%;
          width: 2em;
          height: 2em;
          animation: preloader-bounce 1.2s infinite ease-in-out;
        }
        .preloader {
          animation-delay: -0.16s;
        }
        .preloader:before {
          left: -3.5em;
          animation-delay: -0.32s;
        }
        .preloader:after {
          left: 3.5em;
        }
        @keyframes preloader-bounce {
          0%, 80%, 100% {
            box-shadow: 0 2em 0 -1em #6BB252;
          }
          40% {
            box-shadow: 0 2em 0 0 #6BB252;
          }
        }
      `}</style>
      <div className="preloader-wrapper">
        <div className="preloader" />
      </div>
    </>
  );
}
