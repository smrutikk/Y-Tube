import { useState } from 'react';

const VideoPlayer = ({ videoUrl, title }) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Extract video ID if it's a YouTube URL
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youTubeId = getYouTubeId(videoUrl);

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
      {youTubeId ? (
        // YouTube embed
        <iframe
          src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&mute=1`}
          title={title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsIframeLoaded(true)}
        ></iframe>
      ) : (
        // Fallback to native video player
        <video
          controls
          autoPlay
          muted
          playsInline
          className="w-full h-full object-contain"
          title={title}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {!isIframeLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <div className="text-white">Loading video...</div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;