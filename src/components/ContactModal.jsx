// src/components/ContactModal.jsx

import { motion } from "framer-motion";

export default function ContactModal({ onClose }) {
  const email = "Noppanatyukun@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      alert("คัดลอกอีเมลแล้ว!");
    }).catch(err => {
      console.error('ไม่สามารถคัดลอกอีเมลได้: ', err);
    });
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* เปลี่ยนจาก bg-zinc-900 เป็นสไตล์ Glass */}
      <motion.div
        className="w-11/12 max-w-md rounded-2xl p-6 md:p-8 relative text-center
                   bg-gray-900/80 backdrop-blur-xl
                   border border-white/20 shadow-2xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={handleContentClick}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-[#08fdd8] mb-4">Contact Me</h2>
        
        <p className="text-gray-300 mb-6">คุณสามารถติดต่อผมได้ทางอีเมลด้านล่างนี้:</p>
        
        {/* เปลี่ยนสไตล์กล่องอีเมลเล็กน้อย */}
        <div className="bg-black/30 border border-white/10 p-3 rounded-lg text-white font-mono break-all mb-6">
          {email}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleCopyEmail}
            className="px-6 py-2 bg-[#08fdd8] text-black rounded-lg font-semibold 
                       transition-all hover:bg-opacity-80 hover:scale-105"
          >
            คัดลอกอีเมล
          </button>
          <a
            href={`mailto:${email}`}
            className="block px-6 py-2 border-2 border-[#08fdd8] text-[#08fdd8] rounded-lg font-semibold 
                       transition-all hover:bg-[#08fdd8] hover:text-black hover:scale-105"
          >
            ส่งอีเมล
          </a>
        </div>
        
      </motion.div>
    </motion.div>
  );
}