import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiSearch, FiBell, FiMic } from 'react-icons/fi';
import { BsPersonCircle } from 'react-icons/bs';
// import { RiPremiumLine } from 'react-icons/ri';
import { RiAwardFill } from 'react-icons/ri';
import ThemeToggle from './ThemeToggle';
import Logo from '../assets/icons/logo-2.png';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support voice recognition. Please try Chrome.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setSearchQuery(transcript);
      navigate(`/?search=${encodeURIComponent(transcript)}`);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    if (searchParam) setSearchQuery(searchParam);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-red-500 to-red-600 dark:from-gray-800 dark:to-gray-900 shadow-lg p-4">
  <div className="flex items-center justify-between">
    {/* Left section - Logo and menu */}
    <div className="flex items-center space-x-4">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 rounded-full text-white hover:bg-black/10 transition-colors"
      >
        <FiMenu className="text-xl" />
      </button>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center"
      >
        <a href="/" className="flex items-center space-x-2 group">
          <h2 className="text-2xl font-bold text-white font-[Poppins] tracking-tighter">
            YTube
          </h2> 
        </a>
      </motion.div>
    </div>

    {/* Right section - Search and icons */}
    <div className="flex items-center gap-4 flex-1 justify-end">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-xl ml-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-12 rounded-full border-0 focus:ring-2 focus:ring-purple-400 bg-white/90 backdrop-blur-sm shadow-md"
          />
          <FiSearch className="absolute left-4 text-gray-500" />
        </div>
      </form>

      {/* Icons */}
      <div className="flex items-center space-x-3">
        <ThemeToggle />
        <button className="p-2 rounded-full text-white hover:bg-black/10 relative">
          <FiBell className="text-xl" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-green-500 rounded-full"></span>
        </button>
      </div>
    </div>
  </div>
</header>
  );
};

export default Header;