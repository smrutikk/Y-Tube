// components/VideoCard.jsx
import { useContext } from 'react';
import { VideoContext } from '../context/VideoContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMoreVertical, FiClock, FiPlay, FiBookmark, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

const VideoCard = ({ video, compact = false }) => {
  const { savedVideos, 
    likedVideos, 
    dislikedVideos,
    saveVideo, 
    unsaveVideo, 
    likeVideo, 
    unlikeVideo,
    dislikeVideo,
    unDislikeVideo } = useContext(VideoContext);

  const isSaved = savedVideos.includes(video.id);
  const isLiked = likedVideos.includes(video.id);
  const isDisliked = dislikedVideos.includes(video.id);

  const formatViews = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M views`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K views`;
    return `${count} views`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return 'Today';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  };

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isSaved ? unsaveVideo(video.id) : saveVideo(video.id);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLiked) {
      unlikeVideo(video.id);
    } else {
      likeVideo(video.id);
      // Remove dislike if present
      if (isDisliked) {
        unDislikeVideo(video.id);
      }
    }
  };

  const handleDislike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isDisliked) {
      unDislikeVideo(video.id);
    } else {
      dislikeVideo(video.id);
      // Remove like if present
      if (isLiked) {
        unlikeVideo(video.id);
      }
    }
  };

  return (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all ${
      compact ? 'flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
    }`}
  >
    <Link to={`/video/${video.id}`} className="block relative">
      {/* Thumbnail Container */}
      <div className={`relative ${compact ? 'w-40' : 'pb-[56.25%]'}`}>
        <img
          src={video.thumbnail_url || '/placeholder.jpg'}
          alt={video.title}
          className={`absolute inset-0 w-full h-full object-cover ${
            compact ? 'rounded-lg' : 'group-hover:brightness-95 transition-all'
          }`}
          loading="lazy"
          onError={(e) => {
            e.target.src = '/placeholder.jpg';
          }}
        />
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md flex items-center backdrop-blur-sm">
          <FiClock className="mr-1" size={12} />
          {video.duration || '10:30'}
        </div>

        {/* Hover Play Button */}
        {!compact && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
              <FiPlay className="text-white text-2xl" />
            </div>
          </div>
        )}
      </div>
    </Link>

    {/* Video Info Section */}
    <div className={`p-3 ${compact ? 'flex-1' : ''}`}>
      <div className={`flex ${compact ? 'items-start' : 'items-start space-x-3'}`}>
        {!compact && (
          <div className="flex-shrink-0">
            <img
              src={video.channel?.profile_image_url || '/placeholder.jpg'}
              alt={video.channel?.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0 space-y-1.5">
          {/* Title */}
          <h3 className={`font-semibold ${
            compact ? 'text-sm line-clamp-2' : 'text-base line-clamp-2'
          } leading-tight text-gray-800 dark:text-gray-100`}>
            {video.title}
          </h3>

          {/* Channel Info (Desktop) */}
          {!compact && (
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <p className="truncate font-medium">{video.channel?.name || 'Unknown Channel'}</p>
              <div className="flex items-center space-x-2 mt-0.5">
                <span>{formatViews(video.view_count || 0)}</span>
                <span className="text-gray-400">•</span>
                <span>{formatDate(video.published_at)}</span>
              </div>
            </div>
          )}

          {/* Channel Info (Compact) */}
          {compact && (
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <p className="truncate">{video.channel?.name || 'Unknown'}</p>
              <div className="flex items-center space-x-2 mt-0.5">
                <span>{formatViews(video.view_count || 0)}</span>
                <span className="text-gray-400">•</span>
                <span>{formatDate(video.published_at)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleLike}
            className={`p-1.5 rounded-full transition-colors ${
              isLiked 
                ? 'text-red-600 bg-red-100 dark:bg-red-900/30' 
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <FiThumbsUp size={18} />
          </button>
          
          <button
            onClick={handleDislike}
            className={`p-1.5 rounded-full transition-colors ${
              isDisliked 
                ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' 
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <FiThumbsDown size={18} />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleSave}
            className={`p-1.5 rounded-full transition-colors ${
              isSaved 
                ? 'text-green-600 bg-green-100 dark:bg-green-900/30' 
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <FiBookmark size={18} />
          </button>
          
          <button
            className="p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <FiMoreVertical size={18} />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);
};

export default VideoCard;