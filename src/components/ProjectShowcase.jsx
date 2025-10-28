// src/components/ProjectShowcase.jsx

import { motion } from "framer-motion";

// (fadeInUp ... ไม่ต้องแก้)
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function ProjectShowcase({ project, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center gap-6 md:gap-10
                 w-full max-w-5xl mx-auto"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      // 3. (THE FIX) ลบ 'once: true' ออก เหลือแค่ 'amount'
      viewport={{ amount: 0.3 }}
    >
      {/* (เนื้อหา Image ... ไม่ต้องแก้) */}
      <motion.div 
        className={`w-full md:w-1/2 
                    ${isEven ? 'md:order-1' : 'md:order-2'}`}
        whileHover={{ scale: 1.03 }}
      >
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full rounded-xl shadow-2xl shadow-[#08fdd8]/10 
                     border border-white/10" 
        />
      </motion.div>

      {/* (เนื้อหา Text ... ไม่ต้องแก้) */}
      <div className={`w-full md:w-1/2 
                      ${isEven ? 'md:order-2' : 'md:order-1'}
                      ${isEven ? 'md:text-left' : 'md:text-right'}`}
      >
        <p className="text-sm font-semibold text-[#08fdd8] mb-1 uppercase">
          {project.type}
        </p>
        <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
        
        <p className="text-gray-300 mb-6 whitespace-pre-line">
          {project.details}
        </p>
        
        <div className={`flex gap-4 ${isEven ? 'justify-start' : 'md:justify-end'}`}>
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2 bg-[#08fdd8] text-black rounded-lg font-semibold 
                         transition-all hover:bg-opacity-80 hover:scale-105"
            >
              Visit Website
            </a>
          )}
          {project.videoUrl && (
            <a 
              href={project.videoUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2 border-2 border-[#08fdd8] text-[#08fdd8] rounded-lg 
                         font-semibold transition-all hover:bg-[#08fdd8] hover:text-black"
            >
              Watch Video
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}