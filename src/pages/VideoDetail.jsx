import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext, useCallback } from 'react';
import { VideoContext } from '../context/VideoContext';
import axios from 'axios';
import VideoPlayer from '../components/VideoPlayer';
import ChannelInfo from '../components/ChannelInfo';
import CommentsSection from '../components/CommentsSection';
import Loader from '../components/Loader';
import { fetchVideoDetails } from '../services/api/api';


const VideoDetail = () => {
  const { id } = useParams();
  const { savedVideos, saveVideo, unsaveVideo } = useContext(VideoContext);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isSaved = savedVideos.includes(id);

  const fetchVideo = useCallback(async () => {
  try {
    const data = await fetchVideoDetails(id);
    setVideo(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}, [id]);

  useEffect(() => {
    fetchVideo();
  }, [fetchVideo]);

  const handleSaveVideo = () => {
    if (!video) return;
    isSaved ? unsaveVideo(video.id) : saveVideo(video.id);
  };

  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  if (loading) return <Loader fullPage />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!video) return <div className="p-4">Video not found</div>;

  return (
    <div className="fade-in">
      <div className="mb-8">
        <VideoPlayer videoUrl={video.video_url} title={video.title} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            {video.title}
          </h1>

          <ChannelInfo
            channel={video.channel}
            isSubscribed={isSubscribed}
            onSubscribe={handleSubscribe}
            isSaved={isSaved}
            onSave={handleSaveVideo}
            videoId={video.id} // Pass the video ID here
          />

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8">
            <div className="flex items-center space-x-4 mb-3">
              <span className="text-gray-700 dark:text-gray-300">
                {video.view_count} views
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                {new Date(video.published_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
              {video.description}
            </p>
          </div>

          <CommentsSection videoId={id} />
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;