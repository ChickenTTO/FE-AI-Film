import React, { useState } from "react";
import { Sparkles } from "lucide-react";

const PromptInput = ({ onGenerate, disabled }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
      setPrompt("");
    }
  };

  const suggestions = [
    "A cyberpunk story about a detective cat",
    "A lonely astronaut finds a mysterious glowing plant on Mars",
    "Two ancient wizards battling over the last slice of pizza",
    "A bustling underwater city made of coral and neon lights",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-surface/90 border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-sm">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={disabled}
            placeholder="Describe the short film you want to create..."
            className="w-full bg-transparent text-white placeholder-gray-500 px-4 py-3 outline-none text-lg disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={disabled || !prompt.trim()}
            className="btn-primary flex items-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed m-1"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate</span>
          </button>
        </div>
      </form>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => setPrompt(suggestion)}
            disabled={disabled}
            className="text-xs text-gray-400 bg-surface border border-white/5 py-1.5 px-3 rounded-full hover:text-white hover:border-white/20 transition-colors disabled:opacity-50"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptInput;
