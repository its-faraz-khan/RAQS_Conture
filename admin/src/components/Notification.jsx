import React, { useState, useEffect, useRef } from 'react';

const Notification = () => {
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef(null);
  const clearTimer = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      const { message } = e.detail;

      clearTimeout(hideTimer.current);
      clearTimeout(clearTimer.current);

      setMsg(message);
      setVisible(true);

      hideTimer.current = setTimeout(() => setVisible(false), 1200);
      clearTimer.current = setTimeout(() => setMsg(''), 1500);
    };

    window.addEventListener('app-notify', handler);
    return () => {
      window.removeEventListener('app-notify', handler);
      clearTimeout(hideTimer.current);
      clearTimeout(clearTimer.current);
    };
  }, []);

  if (!msg) return null;

  return (
    <div
      className={`fixed top-[60px] left-0 right-0 flex justify-center z-[9999] pointer-events-none transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="bg-white border border-gray-200 shadow-md rounded-full px-6 py-2.5 select-none">
        <p className="text-sm font-medium text-gray-700 tracking-wide">{msg}</p>
      </div>
    </div>
  );
};

export default Notification;
