import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Main from "./pages/Main.jsx";
import Navbar from "./components/Navbar.jsx";
import Cursor from "./components/Cursor.jsx"; // 1. Import Cursor ที่นี่

export default function App() {
  return (
    <Router>
      <Cursor /> {/* 2. วาง Cursor ไว้ที่นี่ (นอก Routes) */}
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}