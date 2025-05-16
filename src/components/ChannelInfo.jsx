// components/ChannelInfo.jsx
import { useContext } from 'react';
import { VideoContext } from '../context/VideoContext';
import { FiThumbsUp, FiThumbsDown, FiShare2, FiBookmark } from 'react-icons/fi';

const ChannelInfo = ({ channel, isSubscribed, onSubscribe, isSaved, onSave, videoId }) => {
  const { likedVideos, likeVideo, unlikeVideo } = useContext(VideoContext);
  const isLiked = likedVideos.includes(videoId);

  const handleLike = () => {
    console.log('Like button clicked for video:', videoId);
    console.log('Current liked videos:', likedVideos);
    
    if (isLiked) {
      console.log('Unliking video');
      unlikeVideo(videoId);
    } else {
      console.log('Liking video');
      likeVideo(videoId);
    }
  };

  const handleDislike = () => {
    // Dislike functionality if needed
    console.log('Dislike clicked');
  };

  // Removed handleSave as isSaved is a prop controlled by the parent.

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <div className="flex items-center space-x-4">
        <img
          src={channel.profile_image_url}
          alt={channel.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
        />
        <div>
          <h3 className="font-medium text-gray-800 dark:text-gray-200">{channel.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {channel.subscriber_count} subscribers
          </p>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-2">
        <button
          onClick={handleLike}
          className={`flex items-center px-3 py-2 rounded-full ${
            isLiked
              ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200'
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
          }`}
        >
          <FiThumbsUp className="mr-2" />
          {isLiked ? 'Liked' : 'Like'}
        </button>

        <button
          onClick={handleDislike}
          className="flex items-center px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <FiThumbsDown className="mr-2" />
          Dislike
        </button>


      </div>
    </div>
  );
};

export default ChannelInfo;