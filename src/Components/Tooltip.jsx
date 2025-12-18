import React, {useState} from 'react'

const Tooltip = ({ text, children }) => {
  const [show, setShow] = useState(false);

  return (
    <span
      className="fixed right-3 top-1/2 -translate-y-1/2 z-50 group"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}

      {show && (
        <span className="absolute right-full mr-1 top-1/2 -translate-y-1/2 bg-white/20 text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg text-white pointer-events-none">
          {text}
        </span>
      )}
    </span>
  );
};


export default Tooltip


