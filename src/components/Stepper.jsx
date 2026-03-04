import React from "react";
import { Check, CircleDashed } from "lucide-react";

const Stepper = ({ stages, currentStageIndex }) => {
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-6 text-brand-primary">
        Pipeline Progress
      </h3>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-dark-border" />

        <div className="space-y-6">
          {stages.map((stage, index) => {
            const isCompleted = index < currentStageIndex;
            const isActive = index === currentStageIndex;
            const isPending = index > currentStageIndex;

            return (
              <div key={stage.id} className="relative flex items-center gap-6">
                {/* Step Connector Highlight */}
                {isCompleted && index < stages.length - 1 && (
                  <div className="absolute left-6 top-6 h-full w-0.5 bg-brand-primary origin-top animate-[scale-y_0.5s_ease-out_forwards]" />
                )}

                {/* Step Circle */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-500 shadow-lg ${
                    isCompleted
                      ? "bg-brand-primary border-brand-primary text-white scale-100 shadow-brand-glow"
                      : isActive
                        ? "bg-dark-bg border-brand-primary text-brand-primary scale-110 shadow-brand-glow/50"
                        : "bg-dark-bg border-dark-border text-dark-muted scale-90"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={20} className="animate-fade-in" />
                  ) : isActive ? (
                    <span className="flex items-center justify-center animate-pulse">
                      <CircleDashed size={24} className="animate-spin-slow" />
                    </span>
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>

                {/* Step Content */}
                <div
                  className={`flex-1 transition-all duration-300 ${
                    isCompleted || isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-50 -translate-x-2"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <h4
                      className={`text-lg font-medium ${isActive ? "text-white" : "text-dark-text"}`}
                    >
                      {stage.label}
                    </h4>
                    {isActive && (
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-primary/20 text-brand-primary text-xs font-medium animate-pulse">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-dark-muted mt-1">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
