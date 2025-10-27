import { motion } from "framer-motion";

export default function ProjectCard({ category, index, onCardClick }) {
  
  // 1. (ลูกเล่นใหม่!) เช็กว่าเป็นเลขคู่หรือคี่
  //    - ถ้าเป็น 0, 2, 4... (เลขคู่) ให้เอียงซ้าย (-rotate-1)
  //    - ถ้าเป็น 1, 3, 5... (เลขคี่) ให้เอียงขวา (rotate-1)
  const rotationClass = index % 2 === 0 ? '-rotate-1' : 'rotate-1';

  return (
    <motion.div 
      onClick={onCardClick}
      className={`
        p-5 rounded-2xl cursor-pointer
        bg-white/5 backdrop-blur-lg 
        border border-white/10
        relative transition-all duration-300
        
        hover:border-[#08fdd8]/80
        hover:shadow-2xl hover:shadow-[#08fdd8]/30

        ${rotationClass}     /* <-- 2. เพิ่มการเอียงถาวร */
        hover:rotate-0      /* <-- 3. (ลูกเล่น!) ทำให้ตรงเมื่อ Hover */
      `}
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -8, scale: 1.03 }} // (ยังคง "ลอย" และ "ขยาย" เหมือนเดิม)
    >
      {/* (เนื้อหาข้างในเหมือนเดิม ไม่ต้องแก้) */}
      <div className="absolute top-4 right-5 text-3xl font-bold 
                      text-white/10 select-none">
        {String(index + 1).padStart(2, '0')}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white relative z-10">{category.categoryTitle}</h3>
      <p className="text-[#08fdd8] text-sm mb-3 relative z-10">{category.type}</p>
      <p className="text-gray-300 mb-4 h-12 line-clamp-2 relative z-10">{category.desc}</p>
      <div className="text-right text-[#08fdd8] font-semibold opacity-80 group-hover:opacity-100 relative z-10">
        View All {category.type}s &rarr;
      </div>
    </motion.div>
  );
}
