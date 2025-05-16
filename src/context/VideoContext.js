// context/VideoContext.js
import { createContext, useState, useEffect } from 'react';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [savedVideos, setSavedVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [dislikedVideos, setDislikedVideos] = useState([]);

  // Initialize from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('vidfow-saved') || '[]');
    const liked = JSON.parse(localStorage.getItem('vidfow-liked') || '[]');
    setSavedVideos(saved);
    setLikedVideos(liked);
  }, []);

   const saveVideo = (videoId) => {
    console.log('Saving video:', videoId);
    const updatedVideos = [...savedVideos, videoId];
    setSavedVideos(updatedVideos);
    localStorage.setItem('vidfow-saved', JSON.stringify(updatedVideos));
  };

  const dislikeVideo = (videoId) => {
    const updatedVideos = [...dislikedVideos, videoId];
    setDislikedVideos(updatedVideos);
    localStorage.setItem('vidfow-disliked', JSON.stringify(updatedVideos));
    
    // Remove from likes if present
    if (likedVideos.includes(videoId)) {
      unlikeVideo(videoId);
    }
  };
  const unDislikeVideo = (videoId) => {
    const updatedVideos = dislikedVideos.filter(id => id !== videoId);
    setDislikedVideos(updatedVideos);
    localStorage.setItem('vidfow-disliked', JSON.stringify(updatedVideos));
  };

  const unsaveVideo = (videoId) => {
    console.log('Unsaving video:', videoId);
    const updatedVideos = savedVideos.filter(id => id !== videoId);
    setSavedVideos(updatedVideos);
    localStorage.setItem('vidfow-saved', JSON.stringify(updatedVideos));
  };

  const likeVideo = (videoId) => {
    const updatedVideos = [...likedVideos, videoId];
    setLikedVideos(updatedVideos);
    localStorage.setItem('vidfow-liked', JSON.stringify(updatedVideos));
  };

  const unlikeVideo = (videoId) => {
    const updatedVideos = likedVideos.filter(id => id !== videoId);
    setLikedVideos(updatedVideos);
    localStorage.setItem('vidfow-liked', JSON.stringify(updatedVideos));
  };

  return (
    <VideoContext.Provider
      value={{
       savedVideos,
        likedVideos,
        dislikedVideos,
        saveVideo,
        unsaveVideo,
        likeVideo,
        unlikeVideo,
        dislikeVideo,
        unDislikeVideo
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};