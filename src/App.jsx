import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { VideoProvider } from './context/VideoContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Gaming from './pages/Gaming';
import SavedVideos from './pages/SavedVideos';
import LikedVideos from './pages/LikedVideos';
import VideoDetail from './pages/VideoDetail';
import './styles/globals.css';
import './styles/animations.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <AuthProvider>
        <VideoProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 to-red-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
              <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              <div className="flex flex-1">
                <Sidebar sidebarOpen={sidebarOpen} />
                <main className={`flex-1 p-6 transition-all duration-300 ${
                  sidebarOpen ? 'ml-64' : 'ml-20'
                }`}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/gaming" element={<Gaming />} />
                    <Route path="/saved" element={<SavedVideos />} />
                    <Route path="/liked" element={<LikedVideos />} />
                    <Route path="/video/:id" element={<VideoDetail />} />
                  </Routes>
                </main>
              </div>
            </div>
          </Router>
        </VideoProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;