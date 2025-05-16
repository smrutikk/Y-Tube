import axios from 'axios';
import api from './config';

export const fetchVideos = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data.videos;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Add other API functions as needed

export const fetchVideoDetails = async (videoId) => {
  try {
    const response = await api.get(`/videos/${videoId}`);
    return response.data.video_details;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchRelatedVideos = async (videoId) => {
  try {
    const response = await api.get('/videos');
    return response.data.videos
      .filter(video => video.id !== videoId)
      .slice(0, 4);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};