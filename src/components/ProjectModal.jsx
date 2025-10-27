// src/components/ProjectModal.jsx

import { motion } from "framer-motion";
import { useState } from "react"; // 1. Import useState

// 1. Animation "ทยอยโหลด" (เหมือนเดิม)
const modalContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// 2. Animation "โผล่จากล่าง" (เหมือนเดิม)
const projectItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};

// 3. (ลูกเล่นใหม่!) Animation "ซูมเข้า" สำหรับ Media
const mediaZoomInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1], delay: 0.2 }
  }
};

export default function ProjectModal({ category, onClose }) {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  // 2. สร้าง State เพื่อติดตามว่าวิดีโอไหนถูก "เปิด" แล้ว
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);

  return (
    // (Modal Overlay ... ไม่ต้องแก้)
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black bg-opacity-70 
                 md:backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* (Modal Box ... ไม่ต้องแก้) */}
      <motion.div
        className="
          /* 4. (Style) เปลี่ยน 'gray' เป็น 'zinc' (อุ่นขึ้น) */
          w-full h-full bg-zinc-950 overflow-y-auto

          md:w-full md:max-w-3xl md:h-auto md:max-h-[90vh] 
          md:rounded-2xl md:bg-zinc-900/80 md:backdrop-blur-xl 
          md:border md:border-[#08fdd8]/20
          md:shadow-2xl md:shadow-[#08fdd8]/10
        "
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={handleContentClick}
      >
        {/* (Header ... ไม่ต้องแก้) */}
        <div className="sticky top-0 z-10 flex justify-between items-center
                      bg-zinc-950/80 md:bg-transparent backdrop-blur-md 
                      pt-6 pb-4 px-6 md:px-8
                      border-b border-[#08fdd8]/20">
          <h2 className="text-2xl md:text-3xl font-bold text-[#08fdd8]">
            {category.categoryTitle}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-4xl p-2 -mr-2"
          >
            &times;
          </button>
        </div>

        {/* (Container ... ไม่ต้องแก้) */}
        <motion.div 
          className="flex flex-col gap-8 px-6 md:px-8 pb-8 pt-6"
          variants={modalContentVariants}
          initial="hidden"
          animate="visible"
        >
          {category.projects.map((project, index) => {
            // 3. เช็กว่าวิดีโอตัวนี้ Active หรือยัง
            const isVideoActive = activeVideoIndex === index;

            return (
              <motion.div 
                key={index}
                className="border-t border-[#08fdd8]/20 pt-6 first:border-t-0 first:pt-0"
                variants={projectItemVariants}
              >
                {/* (Project Title ... ไม่ต้องแก้) */}
                <div className="mb-4">
                  <span className="text-xs text-[#08fdd8]/80 font-medium uppercase tracking-wider">
                    Work #{String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                </div>
                
                <motion.div 
                  className="mb-4"
                  variants={mediaZoomInVariants}
                >
                  {/* --- นี่คือส่วนที่เราจะแก้ (Game Video) --- */}
                  {category.type === 'Game' && project.videoUrl && (
                    // 4. เพิ่ม 'relative' เพื่อให้ Overlay ลอยทับได้
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10">
                      {/* 5. (ลูกเล่นใหม่!) ปุ่ม Play Overlay */}
                      {!isVideoActive && (
                        <div 
                          className="absolute inset-0 z-10 flex items-center justify-center 
                                     bg-black/40 backdrop-blur-sm cursor-pointer
                                     opacity-0 transition-opacity duration-300 hover:opacity-100"
                          onClick={() => setActiveVideoIndex(index)} // 6. กดแล้ว Active
                        >
                          {/* ไอคอน Play สวยๆ */}
                          <div className="w-20 h-20 rounded-full bg-[#08fdd8]/30 
                                          flex items-center justify-center
                                          border-2 border-[#08fdd8] shadow-lg shadow-[#08fdd8]/50">
                            <svg className="w-10 h-10 text-[#08fdd8] ml-1" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}

                      <iframe
                        width="100%"
                        height="100%"
                        // 7. (THE FIX) ถ้ายังไม่ Active ให้ 'เมิน' เมาส์
                        className={isVideoActive ? "" : "pointer-events-none"}
                        // 8. (THE FIX) ลบ autoplay=1&mute=1 ออก
                        src={project.videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  {/* (Website Link ... ไม่ต้องแก้) */}
                  {category.type === 'Website' && project.link && (
                    <a
                      href={project.link} target="_blank" rel="noopener noreferrer"
                      className="block w-full text-center px-6 py-3 bg-[#08fdd8] text-black rounded-lg 
                                 font-semibold transition-all 
                                 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg hover:shadow-[#08fdd8]/30"
                    >
                      Visit Website
                    </a>
                  )}
                </motion.div>
                
                {/* (Image ... ไม่ต้องแก้) */}
                {project.imageUrl && (
                  <motion.img
                    src={project.imageUrl}
                    alt={`${project.title} Screenshot`}
                    className="w-full h-auto rounded-lg object-cover border border-white/10 mb-4"
                    variants={mediaZoomInVariants}
                  />
                )}
                
                {/* (Details ... ไม่ต้องแก้) */}
                <div className="text-gray-300 whitespace-pre-line text-base">
                  {project.details}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}