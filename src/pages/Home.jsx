import { useSearchParams } from 'react-router-dom';
import useVideos from '../hooks/useVideos';
import VideoCard from '../components/VideoCard';
import Loader from '../components/Loader';

const Home = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const { videos, loading, error } = useVideos('/videos/all', { 
    search: searchQuery 
  });

  if (error) return (
    <div className="text-center py-10">
      <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg inline-block">
        Error loading videos: {error}
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        {searchQuery ? `Results for "${searchQuery}"` : 'Recommended Videos'}
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Loader key={i} />
          ))}
        </div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200">No videos found</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {searchQuery ? 'Try a different search term' : 'Check back later for new videos'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;