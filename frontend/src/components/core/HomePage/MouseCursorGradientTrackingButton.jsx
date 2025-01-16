// import React, { useRef } from 'react';

// const MouseCursorGradientTrackingButton = ({ children }) => {
//   const btnRef = useRef(null);

//   const handleMouseMove = (e) => {
//     const rect = btnRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     btnRef.current.style.setProperty('--x', `${x}px`);
//     btnRef.current.style.setProperty('--y', `${y}px`);
//   };

//   return (
//     <div
//       className="mouse-cursor-gradient-tracking"
//       ref={btnRef}
//       onMouseMove={handleMouseMove}
//     >
//       {children}
//     </div>
//   );
// };

// export default MouseCursorGradientTrackingButton;



import React, { useRef } from 'react';

const MouseCursorGradientTrackingButton = ({ children, gradientColor }) => {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    btnRef.current.style.setProperty('--x', `${x}px`);
    btnRef.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <div
      className="mouse-cursor-gradient-tracking"
      ref={btnRef}
      onMouseMove={handleMouseMove}
      style={{ '--gradient-color': gradientColor }}  // Apply gradient color dynamically
    >
      {children}
    </div>
  );
};

export default MouseCursorGradientTrackingButton;
