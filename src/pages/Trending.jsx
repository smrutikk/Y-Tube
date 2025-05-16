import useVideos from '../hooks/useVideos';
import VideoCard from '../components/VideoCard';
import Loader from '../components/Loader';
import { FiTrendingUp } from 'react-icons/fi';

const Trending = () => {
  const { videos, loading, error } = useVideos('https://apis.ccbp.in/videos/trending');

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Loader key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg inline-block">
          Error loading trending videos: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 fade-in">
      <div className="flex items-center mb-6">
        <div className="p-3 mr-4 bg-orange-100 dark:bg-orange-900 rounded-full">
          <FiTrendingUp className="text-orange-600 dark:text-orange-300 text-xl" />
        </div>
        <h1 className="text-2xl font-bold">Trending Videos</h1>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200">
            No trending videos
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Check back later for trending content
          </p>
        </div>
      )}
    </div>
  );
};

export default Trending;