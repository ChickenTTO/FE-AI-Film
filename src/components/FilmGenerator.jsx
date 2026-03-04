import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import Stepper from "./Stepper";
import VideoPlayer from "./VideoPlayer";
import { generateFilm } from "../services/api";

const STAGES = [
  {
    id: "scripting",
    label: "Scripting",
    description: "Gemini is writing the script",
  },
  {
    id: "storyboard",
    label: "Storyboarding",
    description: "Imagen 3 is designing scenes",
  },
  {
    id: "rendering",
    label: "Rendering Video",
    description: "Veo/Minimax is generating video",
  },
  { id: "audio", label: "Mixing Audio", description: "Adding soundtrack" },
];

const FilmGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(-1);
  const [videoUrl, setVideoUrl] = useState(null);
  const [keyframes, setKeyframes] = useState([]);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setCurrentStageIndex(0);
    setVideoUrl(null);
    setKeyframes([]);
    setError("");

    try {
      const result = await generateFilm(prompt, (stageIndex) => {
        setCurrentStageIndex(stageIndex);
      });

      // Lấy dữ liệu từ Backend trả về
      setVideoUrl(result.videoUrl);
      if (result.keyframes) setKeyframes(result.keyframes);
    } catch (err) {
      console.error(err);
      // Hiển thị trực tiếp lỗi từ Backend lên UI
      setError(err.message || "Generation failed. Please try again.");
      setCurrentStageIndex(-1);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto animate-slide-up">
      {/* Input Section */}
      <div className="glass-panel rounded-2xl p-6 transition-all duration-300 hover:shadow-brand-glow/10">
        <label
          htmlFor="prompt"
          className="block text-sm font-medium text-dark-muted mb-2"
        >
          Your Movie Concept
        </label>
        <textarea
          id="prompt"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A cyberpunk detective uncovers a conspiracy..."
          className="w-full bg-dark-bg border border-dark-border rounded-xl p-4 text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          disabled={isGenerating}
        />
        <div className="mt-4 flex items-center justify-end">
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium bg-brand-primary text-white hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              "Generating..."
            ) : (
              <>
                <Sparkles size={18} /> Generate Film
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center font-medium animate-fade-in">
          {error}
        </div>
      )}

      {/* Progress Stepper */}
      {(isGenerating || videoUrl) && (
        <div className="glass-panel rounded-2xl p-8">
          <Stepper
            stages={STAGES}
            currentStageIndex={videoUrl ? STAGES.length : currentStageIndex}
          />
        </div>
      )}

      {/* Storyboard Gallery */}
      {keyframes.length > 0 && (
        <div className="glass-panel rounded-2xl p-6 animate-fade-in">
          <h3 className="text-xl font-semibold mb-4 text-brand-primary">
            AI Storyboards
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {keyframes.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`Scene ${idx + 1}`}
                className="rounded-lg shadow-md border border-dark-border aspect-video object-cover"
              />
            ))}
          </div>
        </div>
      )}

      {/* Video Player */}
      {videoUrl && (
        <div className="animate-slide-up">
          <VideoPlayer url={videoUrl} />
        </div>
      )}
    </div>
  );
};

export default FilmGenerator;
