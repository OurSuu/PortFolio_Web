import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectModal from "../components/ProjectModal.jsx";
import ContactModal from "../components/ContactModal.jsx";
import ParticleBackground from "../components/ParticleBackground.jsx";

// 1. แก้ไข 'fadeInUp' variant ตรงนี้
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1,
    y: 0,
    // 2. ลบ 'translateY' ออก
    transition: {
      // 3. ลบ 'translateY' ออก
      y: { duration: 0.6, ease: "easeOut" },
      opacity: { duration: 0.6, ease: "easeOut" }
    }
  }
};

const categories = [
  {
    categoryTitle: "Game Projects",
    type: "Game",
    desc: "โปรเจกต์เกมทั้งหมดที่ฉันเคยทำ",
    projects: [
      {
        title: "My Game (เกมแรก)",
        details: "รายละเอียดของเกมแรก...\n- พัฒนาด้วย Unity\n- ใช้เวลาทำ 3 เดือน",
        imageUrl: "https://via.placeholder.com/800x450.png?text=Game+1+Screenshot",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        title: "เกมที่สอง (แนว RPG)",
        details: "รายละเอียดของเกมที่สอง...\n- ทำด้วย Godot",
        imageUrl: "https://via.placeholder.com/800x450.png?text=Game+2+Screenshot",
        videoUrl: "https://www.youtube.com/embed/another-video-id"
      }
      // ... เพิ่ม 'เกม' ที่ 3, 4, 5... ตรงนี้
    ]
  },
  {
    categoryTitle: "Website Projects",
    type: "Website",
    desc: "เว็บไซต์และเว็บแอปพลิเคชันที่ฉันพัฒนา",
    projects: [
      {
        title: "Portfolio Site (เว็บนี้)",
        details: "รายละเอียดของเว็บ Portfolio นี้...\n- สร้างด้วย React, Vite, Tailwind",
        imageUrl: "https://via.placeholder.com/800x450.png?text=Website+1+Screenshot",
        link: "https://keyvault-mwda.onrender.com"
      },
      {
        title: "KeyVault (เว็บที่ 2)",
        details: "รายละเอียดของเว็บ KeyVault...\n- ระบบจัดการรหัสผ่าน",
        imageUrl:"/KeyVaultImg.png",
        link: "https://keyvault-mwda.onrender.com/"
      }
      // ... เพิ่ม 'เว็บ' ที่ 3, 4, 5... ตรงนี้
    ]
  }
];

export default function Main() {
  
  // (State ... ไม่ต้องแก้)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen px-6 md:px-20 py-10 pt-32 relative"> 
      <ParticleBackground />

      {/* (My Works ... ไม่ต้องแก้) */}
      <motion.h2 
        className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#08fdd8] select-none"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        My Works
      </motion.h2>

      {/* (ProjectCard ... ไม่ต้องแก้) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {categories.map((cat, i) => (
          <ProjectCard 
            key={i} 
            category={cat}
            index={i} 
            onCardClick={() => setSelectedCategory(cat)}
          />
        ))}
      </div>

      {/* 1. แก้ 'Contact Me' */}
      <motion.div 
        className="mt-20 max-w-3xl mx-auto p-8 
                   text-center
                   bg-white/5 backdrop-blur-lg 
                   border border-white/10 rounded-2xl
                   transition-all duration-300
                   
                   hover:border-[#08fdd8]/80
                   hover:shadow-2xl hover:shadow-[#08fdd8]/30
                   
                   -rotate-1
                   hover:rotate-0
                   "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover={{ y: -8, scale: 1.03 }}
      >
        <h3 className="text-3xl mb-4 text-[#08fdd8] select-none">Contact Me</h3>
        <p className="text-gray-300 select-none">Let’s create something amazing together!</p>
        
        <div className="mt-6 flex justify-center gap-8 text-lg">
          <button 
            onClick={() => setIsContactModalOpen(true)} 
            className="text-gray-300 hover:text-[#08fdd8] transition-colors"
          >
            Email
          </button>
          <a 
            href="https://github.com/OurSuu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#08fdd8] transition-colors"
          >
            GitHub
          </a>
          <a 
            href="https://www.youtube.com/@noppanatnoppakouw5423/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#08fdd8] transition-colors"
          >
            YouTube
          </a>
        </div>
      </motion.div>

      {/* (Modal ... ไม่ต้องแก้) */}
      <AnimatePresence>
        {selectedCategory && (
          <ProjectModal
            category={selectedCategory}
            onClose={() => setSelectedCategory(null)}
          />
        )}
        
        {isContactModalOpen && (
          <ContactModal
            onClose={() => setIsContactModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
