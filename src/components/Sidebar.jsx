import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiCompass,
  FiSave, 
  FiPlay,
  FiMusic,
  FiFilm,
  FiRadio,
  FiSettings,
  FiThumbsUp
} from 'react-icons/fi';

const Sidebar = ({ sidebarOpen }) => {
  const menuLinks = [
    { to: '/', icon: <FiHome />, text: 'Home' },
    { to: '/trending', icon: <FiCompass />, text: 'Trending' },
    { to: '/gaming', icon: <FiPlay />, text: 'Gaming' },
    { to: '/liked', icon: <FiThumbsUp />, text: 'Liked' },
    { to:'/saved', icon: <FiSave />, text: 'Saved' },
  ];

  const categoryLinks = [
    { icon: <FiMusic />, text: 'Music' },
    { icon: <FiFilm />, text: 'Movies' },
    { icon: <FiRadio />, text: 'Live' },
    { icon: <FiSettings />, text: 'Settings' },
  ];

  return (
    <motion.aside
      initial={{ width: sidebarOpen ? '240px' : '80px' }}
      animate={{ width: sidebarOpen ? '240px' : '80px' }}
      transition={{ duration: 0.3 }}
      className={`fixed h-full bg-gradient-to-b from-red-500 to-red-600 dark:from-gray-800 dark:to-gray-900 shadow-lg z-40 overflow-hidden flex-shrink-0 flex flex-col`}
    >
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4">
          {/* MENU Section */}
          {sidebarOpen && (
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-semibold text-indigo-50 dark:text-purple-400 uppercase tracking-wider mb-2 px-2"
            >
              Menu
            </motion.h2>
          )}
          <ul className="space-y-1">
            {menuLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-xl mx-2 transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 text-indigo-60 dark:text-purple-400 shadow-sm'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-indigo-70 dark:text-gray-300'
                    }`
                  }
                >
                  <span className={`text-xl ${sidebarOpen ? 'mr-3' : 'mx-auto'}`}>
                    {link.icon}
                  </span>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-medium"
                    >
                      {link.text}
                    </motion.span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CATEGORIES Section */}
          {/* {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6"
            >
              <h2 className="text-xs font-semibold text-indigo-500 dark:text-purple-400 uppercase tracking-wider mb-2 px-2">
                Categories
              </h2>
              <ul className="space-y-1">
                {categoryLinks.map((link, index) => (
                  <li key={index}>
                    <button className="flex items-center w-full p-3 rounded-xl mx-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                      <span className="text-xl mr-3">{link.icon}</span>
                      <span>{link.text}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )} */}
        </div>
      </div>

      {/* Footer */}
      {sidebarOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400"
        >
          <p>© {new Date().getFullYear()} VidFow</p>
          <p>All Rights Reserved</p>
        </motion.div>
      )}
    </motion.aside>
  );
};

export default Sidebar;