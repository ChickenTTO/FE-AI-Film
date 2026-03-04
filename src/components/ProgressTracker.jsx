import React, { useState, useEffect } from "react";
import {
  PenTool,
  Image as ImageIcon,
  Video,
  Music,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    id: 1,
    name: "Script & Prompt Generation",
    icon: PenTool,
    description: "Gemini crafting the narrative",
  },
  {
    id: 2,
    name: "Keyframes",
    icon: ImageIcon,
    description: "Nano Banana designing characters",
  },
  {
    id: 3,
    name: "Video Generation",
    icon: Video,
    description: "Veo animating the scenes",
  },
  {
    id: 4,
    name: "Soundtrack",
    icon: Music,
    description: "Lyria 3 composing the score",
  },
];

const ProgressTracker = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Simulate progress through the steps
  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(2), 2000);
    const timer2 = setTimeout(() => setCurrentStep(3), 4000);
    const timer3 = setTimeout(() => setCurrentStep(4), 6000);
    const timer4 = setTimeout(() => setCurrentStep(5), 7500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="glass-panel p-8 w-full max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-6 text-center">
        Orchestrating AI Pipeline
      </h3>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-800" />

        <div className="space-y-8 relative">
          {steps.map((step) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isPending = currentStep < step.id;

            return (
              <div
                key={step.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 relative z-10"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-colors duration-500
                  ${
                    isCompleted
                      ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(109,40,217,0.5)]"
                      : isCurrent
                        ? "bg-surface border-secondary text-secondary shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse-slow"
                        : "bg-surface border-gray-700 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1 ml-4 sm:ml-0 bg-surface/50 p-4 rounded-xl border border-white/5">
                  <h4
                    className={`text-lg font-medium ${isCurrent ? "text-white" : "text-gray-300"}`}
                  >
                    {step.name}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {step.description}
                  </p>
                </div>

                {isCurrent && (
                  <div className="hidden sm:flex ml-auto items-center gap-2">
                    <div
                      className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
