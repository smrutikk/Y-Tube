import { useContext } from 'react';
import { VideoContext } from '../context/VideoContext';
import useVideos from '../hooks/useVideos';
import VideoCard from '../components/VideoCard';
import { FiBookmark } from 'react-icons/fi';

const SavedVideos = () => {
  const { savedVideos } = useContext(VideoContext);
  const { videos: allVideos } = useVideos('https://apis.ccbp.in/videos');
  const savedVideosData = allVideos.filter(video => savedVideos.includes(video.id));

  return (
    <div className="p-4 fade-in">
      <div className="flex items-center mb-6">
        <div className="p-3 mr-4 bg-blue-100 dark:bg-blue-900 rounded-full">
          <FiBookmark className="text-blue-600 dark:text-blue-300 text-xl" />
        </div>
        <h1 className="text-2xl font-bold">Saved Videos</h1>
      </div>

      {savedVideosData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedVideosData.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <FiBookmark className="text-gray-400 dark:text-gray-500 text-3xl" />
          </div>
          <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200">
            No saved videos
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Save videos to watch them later
          </p>
        </div>
      )}
    </div>
  );
};

export default SavedVideos;