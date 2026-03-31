import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const PHONE = '923484272036';
const DEFAULT_MSG = 'Hi, can I have more details about this product?';

const WhatsAppButton = () => {
  const location = useLocation();
  const { products } = useContext(ShopContext);

  const productMatch = location.pathname.match(/^\/product\/(.+)$/);
  let message = DEFAULT_MSG;

  if (productMatch) {
    const productId = productMatch[1];
    const product = products.find((p) => p._id === productId);
    if (product) {
      message = `Hi, I'm interested in ${product.name}. Can I have more details about this product?`;
    }
  }

  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:bg-[#1ebe5d] hover:scale-110 transition-all duration-200"
      aria-label="Chat with us on WhatsApp"
    >
      {/* Tooltip */}
      <span className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with us on WhatsApp
      </span>

      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-7 h-7 fill-white"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.16c-1.47 0-2.91-.4-4.16-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.39c0-4.54 3.7-8.23 8.23-8.23s8.23 3.69 8.23 8.23-3.7 8.25-8.25 8.25zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
