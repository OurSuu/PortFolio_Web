// src/pages/Main.jsx

import { motion } from "framer-motion";
import ParticleBackground from "../components/ParticleBackground.jsx";
import ProjectShowcase from "../components/ProjectShowcase.jsx";
import { FaGithub, FaYoutube } from "react-icons/fa";

// (fadeInUp, allProjects ... ไม่ต้องแก้)
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const allProjects = [
  { 
    title: "My Game", 
    type: "Game", 
    details: "รายละเอียดของเกมแรก...\n- พัฒนาด้วย Unity\n- ใช้เวลาทำ 3 เดือน",
    imageUrl: "/game-image.png",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  { 
    title: "KeyVault Website", 
    type: "Website", 
    details: "รายละเอียดของเว็บ KeyVault...\n- ระบบจัดการรหัสผ่าน\n- สร้างด้วย React, Vite, Tailwind",
    imageUrl: "/KeyVaultImg.png",
    link: "https://keyvault-mwda.onrender.com"
  },
  { 
    title: "เกมที่สอง (แนว RPG)", 
    type: "Game", 
    details: "รายละเอียดของเกมที่สอง...\n- ทำด้วย Godot",
    imageUrl: "https://via.placeholder.com/800x600.png?text=Game+2",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  // ... เพิ่มโปรเจกต์ที่ 3, 4, 5... ตรงนี้ได้เลย
];

export default function Main() {
  
  return (
    <div className="min-h-screen px-6 md:px-20 py-10 pt-32 
                    relative flex flex-col gap-20 md:gap-32"> 
      
      <ParticleBackground />

      {/* 1. (แก้!) ส่วน "About Me" */}
      <motion.div 
        className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        {/* 2. (แก้!) เพิ่ม Animation และ Filter ให้รูป */}
        <motion.img 
          src="/MyPhoto.jpg" // ◀◀◀ (สำคัญ!) รูปคือ /MyPhoto.jpg/
          alt="Noppanat's Profile" 
          className="w-48 h-48 md:w-60 md:h-60 rounded-full object-cover 
                     border-4 border-[#08fdd8]/50 shadow-xl
                     grayscale hover:grayscale-0 
                     contrast-125 hover:contrast-100
                     brightness-75 hover:brightness-100
                     transition-all duration-500 cursor-pointer"
          // 4. (ใหม่!) Animation เมื่อรูปโหลดเข้ามา
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          // 5. (ใหม่!) Animation เมื่อชี้
          whileHover={{ 
            scale: 1.05, 
            y: -8, 
            boxShadow: "0 20px 25px -5px rgba(8, 253, 216, 0.3)", // Glow
            transition: { type: "spring", stiffness: 300, damping: 10 }
          }}
        />
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            I'm <span className="text-[#08fdd8]">Noppanat</span>.
          </h2>
          <p className="text-lg text-gray-300 max-w-lg">
            (ใส่คำอธิบายเกี่ยวกับตัวคุณตรงนี้)... ผมคือ Web & Game Developer 
            ที่หลงใหลในการสร้างประสบการณ์ดิจิทัลที่น่าตื่นเต้น 
            เชี่ยวชาญใน React, Unity, และ Node.js
          </p>
        </div>
      </motion.div>

      {/* (My Works ... ไม่ต้องแก้) */}
      <div className="flex flex-col gap-16 md:gap-24 items-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-[#08fdd8] select-none"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
        >
          My Works
        </motion.h2>

        <div className="flex flex-col gap-16 md:gap-24 w-full">
          {allProjects.map((project, index) => (
            <ProjectShowcase 
              key={project.title + index}
              project={project} 
              index={index} 
            />
          ))}
        </div>
      </div>

      {/* (Contact ... ไม่ต้องแก้) */}
      <motion.div 
        className="mt-20 max-w-5xl mx-auto w-full"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
      >
        <h3 className="text-3xl font-bold text-[#08fdd8] mb-6 select-none">Contact</h3>
        
        <p className="text-lg text-gray-300 max-w-2xl mb-4 select-none">
          I'm currently looking to join a cross-functional team that values improving people's lives through accessible design. or have a project in mind? Let's connect.
        </p>
        
        <a 
          href="mailto:Noppanatyukun@gmail.com" 
          className="text-lg text-white font-semibold hover:text-[#08fdd8] transition-colors"
        >
          Noppanatyukun@gmail.com
        </a>

        <div className="flex gap-6 mt-6">
          <a href="https://github.com/OurSuu" target="_blank" rel="noopener noreferrer" 
             className="text-gray-400 hover:text-white text-3xl transition-colors">
            <FaGithub />
          </a>
          <a href="https://www.youtube.com/@noppanatnoppakouw5423/videos" target="_blank" rel="noopener noreferrer" 
             className="text-gray-400 hover:text-white text-3xl transition-colors">
            <FaYoutube />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
