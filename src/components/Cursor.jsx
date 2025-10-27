// src/components/Cursor.jsx

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const numSegments = 15; 
const springConfig = { 
  stiffness: 400, 
  damping: 30,    
  mass: 0.1       
};

export default function Cursor() {
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const segmentsX = [useSpring(mouseX, springConfig)];
  const segmentsY = [useSpring(mouseY, springConfig)];

  for (let i = 1; i < numSegments; i++) {
    segmentsX.push(useSpring(segmentsX[i - 1], springConfig));
    segmentsY.push(useSpring(segmentsY[i - 1], springConfig));
  }

  return (
    <>
      {segmentsX.map((x, index) => (
        <motion.div
          key={index}
          className="fixed top-0 left-0 rounded-full 
                     pointer-events-none 
                     z-[60]
                     block pointer-coarse:hidden" // <-- 1. แก้ไขเป็นอันนี้ครับ
          style={{
            x: x, 
            y: segmentsY[index], 
            
            width: index === 0 ? 16 : 12,
            height: index === 0 ? 16 : 12,
            border: index === 0 ? "2px solid #08fdd8" : "none",
            backgroundColor: index === 0 ? "transparent" : "#08fdd8",

            opacity: (numSegments - index) / numSegments * 0.8,
            scale: (numSegments - index) / numSegments,

            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      ))}
    </>
  );
}