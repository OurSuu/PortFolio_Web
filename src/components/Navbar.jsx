import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  // 3. State to check if menu is open/closed
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  // Animation variants for the mobile menu
  const menuVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    exit: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-40 
                   bg-black/30 backdrop-blur-lg 
                   border-b border-white/10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 
                        flex justify-between items-center">

          <Link
            to="/"
            onClick={closeMenu}
            className="text-xl font-bold text-white hover:text-[#08fdd8] transition-colors select-none"
          >
            Noppanat
          </Link>

          {/* Desktop menu - hidden on mobile */}
          <div className="hidden md:flex items-center gap-6 select-none">
            <Link to="/" className="text-gray-300 hover:text-[#08fdd8] transition-colors">
              Home
            </Link>
            <Link to="/main" className="text-gray-300 hover:text-[#08fdd8] transition-colors">
              Works
            </Link>
          </div>

          {/* Hamburger button - mobile only */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                // Close (X) icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger menu icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Animated mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-30 pt-20 
                       flex flex-col items-center justify-center gap-8
                       bg-black/90 backdrop-blur-lg"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Link
              to="/"
              onClick={closeMenu}
              className="text-gray-300 hover:text-[#08fdd8] transition-colors text-3xl font-semibold"
            >
              Home
            </Link>
            <Link
              to="/main"
              onClick={closeMenu}
              className="text-gray-300 hover:text-[#08fdd8] transition-colors text-3xl font-semibold"
            >
              Works
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}