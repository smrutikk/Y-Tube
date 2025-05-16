import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchVideos } from '../services/api/api';

const useVideos = (endpoint, params = {}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchVideos(endpoint, params);
        setVideos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [endpoint, JSON.stringify(params)]);

  return { videos, loading, error };
};

export default useVideos;