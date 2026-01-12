// src/pages/Main.jsx

import { motion, useAnimation, AnimatePresence } from "framer-motion"; // 1. เพิ่ม AnimatePresence
import ParticleBackground from "../components/ParticleBackground.jsx";
import ProjectShowcase from "../components/ProjectShowcase.jsx";
import { FaGithub, FaYoutube } from "react-icons/fa";
import { useEffect, useState } from "react"; // 2. เพิ่ม useState

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
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
    details: "รายละเอียดของเกมแรก...\n- พัฒนาด้วย Unity\n- ยังไม่มีเอามาใส่",
    imageUrl: "/4Ever.jpg", 
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
    title: "Stock Management Web App", 
    type: "Website", 
    details: "ทำเว็บระบบจัดการสต็อกสินค้าให้กับแบรนด์แห่งหนึ่ง\n- อัปเดตและตรวจสอบสินค้า\n- วิเคราะห์/ดูยอดเคลื่อนไหวในแต่ละเดือน\n- พัฒนา React, Vite, Tailwind\n- มีระบบหลังบ้านและฟีเจอร์จัดการแบบครบถ้วน",
    imageUrl: "/Stock-Manager-Mo.png",
    link: "https://stock-management-app-two.vercel.app/"
  },
  { 
    title: "TaxEasy - เว็บคำนวณภาษีแม่ค้าออนไลน์",
    type: "Website",
    details: "TaxEasy คือเว็บคำนวณภาษีสำหรับแม่ค้าออนไลน์ ใช้งานฟรี ไม่ต้องสมัครสมาชิก ใช้ง่าย ปลอดภัย ไม่มีบันทึกข้อมูลส่วนตัว\n- พัฒนาด้วย React + Tailwind CSS\n- มีแผนจะใส่ Google AdSense ในอนาคต\n- หากมีงบประมาณจะเปลี่ยนเป็นโดเมน .com",
    imageUrl: "/tax-easy.png",
    link: "https://tax-easy-rose.vercel.app/"
  },
  { 
    title: "Rhythm Coder - เว็บเกมแนว Rhythm เล่นบนเว็บ",
    type: "Game",
    details: "เป็นเว็บไซต์เกี่ยวกับเกมแนว Rhythm ที่สามารถเล่นได้บนเว็บ พัฒนาโดย React โค้ดเขียนเองทั้งหมด มีระบบเล่นเพลง, กดโน้ต, คะแนน, เอฟเฟกต์แสงสี และฟีเจอร์สำหรับผู้เล่นสายเกมดนตรี",
    imageUrl: "/RhythmCoder.png",
    link: "https://rhythm-coder.vercel.app/"
  },
  { 
    title: "Quest-Log-App - ToDo app",
    type: "App",
    details: "เป็นเว็บไซต์ Quest Log แนว ToDo สำหรับสาย Productivity มีระบบเพิ่ม ลบ แก้ไขงาน พร้อม UI/UX ที่ได้แรงบันดาลใจจากเกม ใช้ React, Tailwind CSS ในการพัฒนา",
    imageUrl: "/QuestLogApp.png",
    link: "https://github.com/OurSuu/Quest-Log-App.git"
  },
];

// 3. เตรียมรูปภาพของคุณที่นี่
const profileImages = [
                      // รูปที่ 1
  "/Myphoto3.jpg",  // รูปที่ 2
  "/MyPhoto4.jpg",  // รูปที่ 3
  "/MyPhoto5.jpg",   // รูปที่ 4
  "/Myphoto6.jpg"
];

export default function Main() {
  function ProjectTitleSelectable({ title }) {
    return <span className="select-text">{title}</span>;
  }

  function ProjectShowcaseSelectable({ project, index }) {
    return <ProjectShowcase project={{ ...project, titleComponent: <ProjectTitleSelectable title={project.title} /> }} index={index} />;
  }

  // Animation สำหรับรูปโปรไฟล์ (Loop ตลอดเวลา)
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 0.95, 1],
      filter: [
        "grayscale(0.85) contrast(1.25) brightness(0.85)",
        "grayscale(0) contrast(1.1) brightness(1)",
        "grayscale(0.85) contrast(1.25) brightness(0.85)"
      ],
      transition: {
        duration: 6,
        times: [0, 0.5, 1],
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  }, [controls]);

  // 4. Logic การสลับรูป
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
    }, 4000); // เปลี่ยนรูปทุก 4 วินาที

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen px-6 md:px-20 py-10 pt-32 
                    relative flex flex-col gap-20 md:gap-32 select-none overflow-hidden"> 
      
      <ParticleBackground />

      {/* --- About Me --- */}
      <motion.div 
        className="flex flex-col md:flex-row items-center gap-10 md:gap-16 
                   max-w-5xl mx-auto p-8 md:p-12 
                   bg-gray-900/40 backdrop-blur-xl 
                   rounded-3xl border border-white/10 shadow-2xl"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Profile Picture Section */}
        <div className="relative group w-40 h-40 md:w-56 md:h-56">
          {/* กรอบเรืองแสงด้านหลังรูป */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#08fdd8] to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          
          {/* 5. ย้าย Animation (controls) มาไว้ที่กรอบ Div นี้แทน เพื่อให้มันขยับต่อเนื่องไม่สะดุด */}
          <motion.div 
            className="relative w-full h-full rounded-2xl overflow-hidden 
                       border-2 border-white/20 shadow-2xl z-10 bg-gray-800"
            animate={controls}
            whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
          >
            {/* รูปภาพข้างในใช้ AnimatePresence เพื่อทำ Crossfade */}
            <AnimatePresence mode="popLayout">
              <motion.img 
                key={currentImageIndex}
                src={profileImages[currentImageIndex]}
                alt="Noppanat's Profile"
                className="absolute inset-0 w-full h-full object-cover"
                // Animation เฉพาะการเปลี่ยนรูป (Fade)
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
            </AnimatePresence>
          </motion.div>
        </div>
        {/* Text Content */}
        <div className="flex-1 flex flex-col text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            <span className="opacity-70">I'm </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#08fdd8] to-[#08fdd8]/70">
              Noppanat
            </span>
            <span className="text-[#08fdd8]">.</span>
          </h2>
          
          <div className="space-y-4 text-base md:text-lg text-gray-400 leading-relaxed">
            <p>
              I was born on February 17, 2006 and am currently pursuing my studies at <span className="text-gray-200 font-medium">Rangsit University</span>, Faculty of Digital Innovation Technology, majoring in Computer Games and Esports.
            </p>
            <p>
              While my academic journey began in the world of game development, I soon discovered a true passion for <span className="text-[#08fdd8] font-medium">Web Development</span>. 
            </p>
            <p>
              Merging creativity with modern technology, I aspire to craft visually captivating and seamless digital experiences.
            </p>
          </div>
        </div>
      </motion.div>

      {/* --- My Works --- */}
      <div className="flex flex-col gap-16 md:gap-24 items-center">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold text-white select-none relative"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          My Works
          <span className="block h-1 w-24 bg-[#08fdd8] mt-4 mx-auto rounded-full"></span>
        </motion.h2>

        <div className="flex flex-col gap-16 md:gap-24 w-full">
          {allProjects.map((project, index) => (
            <ProjectShowcaseSelectable 
              key={project.title + index}
              project={project} 
              index={index} 
            />
          ))}
        </div>
      </div>

      {/* --- Contact --- */}
      <motion.div 
        className="mt-10 mb-20 max-w-4xl mx-auto w-full text-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <h3 className="text-4xl font-bold text-white mb-6">Let's Connect</h3>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          If you're interested in collaborating or simply wish to connect, please feel free to reach out.
        </p>
        
        <span
          className="inline-block px-8 py-4 bg-[#08fdd8]/10 border border-[#08fdd8] rounded-full 
                     text-[#08fdd8] font-bold text-lg transition-all duration-300 select-text"
        >
          Noppanatyukun@gmail.com
        </span>

        <div className="flex justify-center gap-8 mt-10">
          <a href="https://github.com/OurSuu" target="_blank" rel="noopener noreferrer" 
             className="text-gray-500 hover:text-white text-4xl transition-all hover:scale-110">
            <FaGithub />
          </a>
          <a href="https://www.youtube.com/@noppanatnoppakouw5423/videos" target="_blank" rel="noopener noreferrer" 
             className="text-gray-500 hover:text-red-500 text-4xl transition-all hover:scale-110">
            <FaYoutube />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
