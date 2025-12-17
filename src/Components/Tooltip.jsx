import React, {useState} from 'react'

const Tooltip = ({text, children}) => {
    const [show, setShow] = useState(false);

  return (
    <span className='relative inline-flex' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black text-xs px-2 py-1 rounded whitespace-nowrap z-[9999] shadow-lg text-red-600 pointer-events-none">{text}</span>
      )}

    </span>
  )
}

export default Tooltip


