import React from 'react';

interface VideoTutorialProps {
  videoUrl: string;
}

export const VideoTutorial: React.FC<VideoTutorialProps> = ({ videoUrl }) => {
  const getYoutubeVideoId = (url: string) => {
    if (!url) return null;
    
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (!match || match[7].length !== 11) return null;
    
    return match[7];
  };

  const isValidYoutubeUrl = (url: string) => {
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be');
    } catch {
      return false;
    }
  };

  const hasValidVideo = isValidYoutubeUrl(videoUrl);
  const videoId = hasValidVideo ? getYoutubeVideoId(videoUrl) : null;

  if (!videoUrl) return null;

  if (!hasValidVideo) {
    return (
      <div className="p-4 bg-orange-50 rounded-lg">
        <p className="text-orange-800 text-center">
          Sorry, the video tutorial for this recipe is not available or the link is invalid.
        </p>
      </div>
    );
  }

  if (!videoId) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Video Tutorial
      </h2>
      <div className="relative pt-[56.25%] rounded-lg overflow-hidden bg-gray-100">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Recipe Video Tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}; 