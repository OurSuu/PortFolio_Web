// src/components/Cursor.jsx

import { useEffect, useState } from "react"; // 1. อย่าลืม useState
import { motion, useMotionValue, useSpring } from "framer-motion";

const numSegments = 15; 
const springConfig = { 
  stiffness: 400, 
  damping: 30,    
  mass: 0.1       
};

export default function Cursor() {
  
  // 2. สร้างตัวแปรไว้จำว่า "เป็นมือถือไหม?" (เริ่มต้นให้เป็น false ก่อน)
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // 3. เช็คว่าเป็นมือถือไหม? (โค้ดที่คุณถาม)
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true); // ถ้าใช่ ให้จำว่าเป็นมือถือ
    }
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // ถ้าเป็นมือถือ ไม่ต้องเสียเวลาดักจับเมาส์
    if (isTouchDevice) return; 

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTouchDevice]); // ใส่ dependency เพื่อให้มันรู้ว่าค่าเปลี่ยน

  const segmentsX = [useSpring(mouseX, springConfig)];
  const segmentsY = [useSpring(mouseY, springConfig)];

  for (let i = 1; i < numSegments; i++) {
    segmentsX.push(useSpring(segmentsX[i - 1], springConfig));
    segmentsY.push(useSpring(segmentsY[i - 1], springConfig));
  }

  // 4. (สำคัญมาก) ถ้าเป็นมือถือ ให้จบการทำงานตรงนี้เลย ไม่ต้องวาดจุดออกมา
  if (isTouchDevice) {
    return null;
  }

  // ... ส่วนแสดงผลจุด (เหมือนเดิม) ...
  return (
    <>
      {segmentsX.map((x, index) => (
        <motion.div
          key={index}
          className="fixed top-0 left-0 rounded-full 
                     pointer-events-none 
                     z-[60]"
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