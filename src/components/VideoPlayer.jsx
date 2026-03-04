import React, { useRef, useState } from "react";
import { Play, Pause, Maximize2, Download } from "lucide-react";

const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Bảo vệ component
  if (!url) {
    return (
      <div className="w-full p-6 text-center bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
        Không tìm thấy nguồn video hợp lệ.
      </div>
    );
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="bg-gradient-to-r from-brand-primary to-blue-500 bg-clip-text text-transparent">
          Final Result
        </span>
      </h3>

      <div
        className="relative group rounded-2xl overflow-hidden bg-black/50 border border-dark-border shadow-2xl aspect-video"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ⚠️ ĐÃ SỬA THẺ VIDEO Ở ĐÂY */}
        <video
          key={url} // Quan trọng: Ép React mount lại thẻ video khi url thay đổi
          ref={videoRef}
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          loop
          playsInline // Tốt cho mobile
        >
          {/* Dùng thẻ source thay vì src trên video */}
          <source src={url} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>

        {/* Play Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity flex-col gap-4">
            <button
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-brand-primary/90 text-white flex items-center justify-center hover:bg-brand-primary hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.5)]"
            >
              <Play size={32} className="ml-2" />
            </button>
            <p className="text-white/80 font-medium">
              Click to Play Final Film
            </p>
          </div>
        )}

        {/* Custom Controls Container */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 flex items-center justify-between ${
            isHovered || !isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-brand-primary transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <div className="h-1.5 w-48 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-brand-primary w-1/3 rounded-full" />
            </div>
            <span className="text-xs text-white/80 font-medium">
              0:00 / 0:10
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={url}
              download="AI_Generated_Video.mp4" // Gợi ý tên file khi tải xuống
              className="text-white hover:text-brand-primary transition-colors"
              title="Download Film"
            >
              <Download size={20} />
            </a>
            <button
              onClick={handleFullscreen}
              className="text-white hover:text-brand-primary transition-colors"
            >
              <Maximize2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
