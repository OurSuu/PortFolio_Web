import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground.jsx";

// (ตัวแปร Animation ... ไม่ต้องแก้)
const sentence = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.04,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Landing() {
  const navigate = useNavigate();

  // 1. (THE FIX) แยกข้อความออกจากกัน
  const line1 = "Hi, I'm ";
  const name = "Noppanat"; 

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center 
                    relative overflow-hidden px-4 text-center">
      
      <ParticleBackground />

      {/* 2. (THE FIX) แก้ไข H1 ให้ Render 2 ส่วน */}
      <motion.h1 
        className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-6 select-none"
        variants={sentence}
        initial="hidden"
        animate="visible"
      >
        {/* ส่วนที่ 1: "Hi, I'm " */}
        {line1.split("").map((char, index) => (
          <motion.span key={char + "-" + index} variants={letter} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
        
        {/* ส่วนที่ 2: "Noppanat" (หุ้มด้วย span ที่สั่ง 'ห้ามตัดคำ') */}
        <span className="inline-block whitespace-nowrap">
          {name.split("").map((char, index) => (
            <motion.span key={char + "-" + index} variants={letter} className="inline-block">
              {char}
            </motion.span>
          ))}
        </span>
      </motion.h1>

      {/* (motion.p ... ไม่ต้องแก้) */}
      <motion.p 
        className="text-gray-300 mb-10 text-lg md:text-xl max-w-lg select-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { delay: 1.5, duration: 0.5 },
          y: { delay: 1.5, duration: 0.5, ease: "easeOut" }
        }}
      >
        I create immersive web and game experiences.
      </motion.p>

      {/* (Button ... ไม่ต้องแก้) */}
      <motion.button 
        className="px-8 py-3 bg-[#08fdd8]/10 border border-[#08fdd8]/50 text-[#08fdd8] 
                   rounded-xl shadow-lg font-semibold
                   transition-all duration-300
                   hover:bg-[#08fdd8]/20 hover:border-[#08fdd8] hover:shadow-[0_0_20px_#08fdd8]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          boxShadow: [
            "0 0 10px rgba(8,253,216,0.3)", 
            "0 0 25px rgba(8,253,216,0.7)", 
            "0 0 10px rgba(8,253,216,0.3)"
          ]
        }}
        transition={{
          y: { delay: 1.8, duration: 0.5 },
          opacity: { delay: 1.8, duration: 0.5 },
          boxShadow: {
            delay: 2.0,
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }} 
        onClick={() => navigate("/main")}
      >
        View My Works
      </motion.button>
    </div>
  );
}
