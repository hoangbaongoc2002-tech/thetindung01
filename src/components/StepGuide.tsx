import React, { useState } from 'react';
import {
  ArrowLeft,
  ZoomIn,
  Youtube,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  ListOrdered,
} from 'lucide-react';
import contentData from '../data/contentData.json';
import { FeedbackSection } from './FeedbackSection';
import { ImageModal } from './ImageModal';

interface StepGuideProps {
  onBackToMenu: () => void;
  onEndConversation: () => void;
}

export const StepGuide: React.FC<StepGuideProps> = ({
  onBackToMenu,
  onEndConversation,
}) => {
  const card = contentData.mainMenu.cards[0];
  const steps = card.steps;

  const [viewMode, setViewMode] = useState<'all' | 'stepper'>('all');
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [modalStepIndex, setModalStepIndex] = useState<number | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Breadcrumb & Mode Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={onBackToMenu}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#005993] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{contentData.feedback.backToMenuLabel}</span>
          </button>
          <h1 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {card.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 tabular-nums">
            <span>{card.shortTitle}</span>
            <span aria-hidden="true">·</span>
            <span>6 bước thực hiện</span>
            <span aria-hidden="true">·</span>
            <span>Nhấn vào từng ảnh để phóng to rõ nét</span>
          </div>
        </div>

        {/* Interactive Filter / Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/75 rounded-xl self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('all')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              viewMode === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Xem toàn bộ 6 bước</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('stepper')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              viewMode === 'stepper'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>Xem lần lượt từng bước</span>
          </button>
        </div>
      </div>

      {/* Quick Step Jump Bar */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <button
            key={step.stepNumber}
            type="button"
            onClick={() => {
              if (viewMode === 'stepper') {
                setCurrentStepIdx(index);
              } else {
                const el = document.getElementById(`step-card-${step.stepNumber}`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer tabular-nums ${
              viewMode === 'stepper' && currentStepIdx === index
                ? 'bg-[#005993] text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-[#005993] hover:text-[#005993]'
            }`}
          >
            Bước {step.stepNumber}
          </button>
        ))}
      </div>

      {/* Mode 1: All Steps Grid View */}
      {viewMode === 'all' ? (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <article
              key={step.stepNumber}
              id={`step-card-${step.stepNumber}`}
              className="gsap-step-card bg-white rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between transition-colors hover:border-[#005993]/60"
            >
              {/* Top Step Text Content */}
              <div className="p-5 sm:p-6 border-b border-slate-100">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-bold text-[#005993] tabular-nums">
                    BƯỚC 0{step.stepNumber} / 06
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalStepIndex(index)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-[#005993] transition-colors cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Phóng to ảnh</span>
                  </button>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2">
                  {step.instruction}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.detail}
                </p>
              </div>

              {/* Step Image Container */}
              <div
                onClick={() => setModalStepIndex(index)}
                className="relative bg-slate-900/95 p-4 flex items-center justify-center cursor-zoom-in group min-h-[360px]"
              >
                <img
                  src={step.image}
                  alt={step.instruction}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== step.remoteImage) {
                      target.src = step.remoteImage;
                    }
                  }}
                  className="max-h-[420px] w-auto object-contain rounded-lg transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Mode 2: Interactive Focused Step-by-Step View */
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Step Details & Controls */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="space-y-4">
                <div className="text-xs font-bold text-[#005993] tabular-nums">
                  BƯỚC 0{steps[currentStepIdx].stepNumber} TRÊN 0{steps.length}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {steps[currentStepIdx].instruction}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {steps[currentStepIdx].detail}
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-200 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    disabled={currentStepIdx === 0}
                    onClick={() => setCurrentStepIdx((prev) => Math.max(0, prev - 1))}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Bước trước</span>
                  </button>

                  <span className="text-xs font-semibold text-slate-500 tabular-nums">
                    {currentStepIdx + 1} / {steps.length}
                  </span>

                  <button
                    type="button"
                    disabled={currentStepIdx === steps.length - 1}
                    onClick={() =>
                      setCurrentStepIdx((prev) => Math.min(steps.length - 1, prev + 1))
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#005993] text-white text-xs sm:text-sm font-semibold hover:bg-[#004675] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    <span>Bước tiếp theo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setViewMode('all')}
                  className="w-full py-2 text-xs font-medium text-slate-500 hover:text-[#005993] transition-colors cursor-pointer"
                >
                  Chuyển sang xem tất cả 6 bước cùng lúc
                </button>
              </div>
            </div>

            {/* Right Column: Large Screenshot Display */}
            <div className="lg:col-span-7 bg-slate-900 p-6 flex flex-col items-center justify-center min-h-[460px]">
              <img
                src={steps[currentStepIdx].image}
                alt={steps[currentStepIdx].instruction}
                referrerPolicy="no-referrer"
                onClick={() => setModalStepIndex(currentStepIdx)}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== steps[currentStepIdx].remoteImage) {
                    target.src = steps[currentStepIdx].remoteImage;
                  }
                }}
                className="max-h-[520px] w-auto object-contain rounded-xl cursor-zoom-in"
              />
              <button
                type="button"
                onClick={() => setModalStepIndex(currentStepIdx)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Nhấn vào hình để phóng to toàn màn hình</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* End of Main Content: YouTube Video Link & Icon Navigation */}
      <div
        id="youtube-video-section"
        className="mt-10 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="flex items-start gap-4 max-w-2xl">
          <a
            href={contentData.videoSection.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mở ứng dụng YouTube xem video hướng dẫn"
            className="w-14 h-14 rounded-2xl bg-[#FF0000] hover:bg-[#cc0000] text-white flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105 shadow-xs"
          >
            <Youtube className="w-8 h-8" />
          </a>
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-[#D71920]">
              Video hướng dẫn trực quan
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {contentData.videoSection.heading}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {contentData.videoSection.description}
            </p>
          </div>
        </div>

        <a
          href={contentData.videoSection.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#FF0000] hover:bg-[#d90000] text-white font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
        >
          <Youtube className="w-5 h-5 shrink-0" />
          <span>{contentData.videoSection.buttonLabel}</span>
          <ExternalLink className="w-4 h-4 shrink-0" />
        </a>
      </div>

      {/* Post-Guide Feedback & Advisor Contact + Side-by-Side Menu / End Conversation */}
      <FeedbackSection
        onBackToMenu={onBackToMenu}
        onEndConversation={onEndConversation}
      />

      {/* Lightbox Modal for Step Images */}
      <ImageModal
        steps={steps}
        activeStepIndex={modalStepIndex}
        onClose={() => setModalStepIndex(null)}
        onChangeStep={(idx) => setModalStepIndex(idx)}
      />
    </section>
  );
};
