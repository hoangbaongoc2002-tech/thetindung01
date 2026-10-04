import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface StepItem {
  stepNumber: number;
  stepTitle: string;
  instruction: string;
  detail: string;
  image: string;
  remoteImage: string;
  rawPdfLink: string;
}

interface ImageModalProps {
  steps: StepItem[];
  activeStepIndex: number | null;
  onClose: () => void;
  onChangeStep: (index: number) => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  steps,
  activeStepIndex,
  onClose,
  onChangeStep,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeStepIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && activeStepIndex > 0) {
        onChangeStep(activeStepIndex - 1);
      }
      if (e.key === 'ArrowRight' && activeStepIndex < steps.length - 1) {
        onChangeStep(activeStepIndex + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStepIndex, steps.length, onClose, onChangeStep]);

  if (activeStepIndex === null) return null;

  const currentStep = steps[activeStepIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={currentStep.instruction}
    >
      <div
        className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Bar */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#005993] tabular-nums">
              Hình minh hoạ {currentStep.stepTitle} / {steps.length} bước
            </p>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
              {currentStep.instruction}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer shrink-0"
            aria-label="Đóng cửa sổ phóng to ảnh"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Viewer Container */}
        <div className="relative flex-1 bg-slate-900 flex items-center justify-center overflow-auto p-4 min-h-[320px]">
          <img
            src={currentStep.image}
            alt={currentStep.instruction}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== currentStep.remoteImage) {
                target.src = currentStep.remoteImage;
              }
            }}
            className="max-h-[68vh] w-auto object-contain rounded-lg"
          />

          {/* Prev / Next Controls */}
          {activeStepIndex > 0 && (
            <button
              type="button"
              onClick={() => onChangeStep(activeStepIndex - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-900 transition-colors cursor-pointer"
              aria-label="Bước trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {activeStepIndex < steps.length - 1 && (
            <button
              type="button"
              onClick={() => onChangeStep(activeStepIndex + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-900 transition-colors cursor-pointer"
              aria-label="Bước tiếp theo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Footer step selector */}
        <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-slate-600">
            {currentStep.detail}
          </p>
          <div className="flex items-center gap-1.5 shrink-0">
            {steps.map((s, idx) => (
              <button
                key={s.stepNumber}
                type="button"
                onClick={() => onChangeStep(idx)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors tabular-nums cursor-pointer ${
                  idx === activeStepIndex
                    ? 'bg-[#005993] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s.stepNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
