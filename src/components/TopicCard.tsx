import React from 'react';
import { ArrowRight, CreditCard, ShieldCheck, PlayCircle } from 'lucide-react';
import contentData from '../data/contentData.json';

interface TopicCardProps {
  onSelectCard: () => void;
  onEndConversation: () => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  onSelectCard,
  onEndConversation,
}) => {
  const card = contentData.mainMenu.cards[0];

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Main Question Header */}
      <div className="gsap-hero-reveal max-w-3xl mb-10">
        <p className="text-xs sm:text-sm font-medium text-[#005993] tracking-wide mb-2">
          {contentData.mainMenu.greeting}
        </p>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
          {contentData.mainMenu.question}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          {contentData.mainMenu.subtext}
        </p>
      </div>

      {/* Main Selection Card */}
      <div className="gsap-card-reveal">
        <div
          onClick={onSelectCard}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectCard();
            }
          }}
          className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-[#005993] transition-all duration-200 p-6 sm:p-8 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005993]"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              {/* Quiet unboxed metadata line */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 tabular-nums">
                <span className="font-semibold text-[#005993]">
                  Nội dung {card.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{card.stepCount} bước hướng dẫn có ảnh minh hoạ</span>
                <span aria-hidden="true">·</span>
                <span>{card.platform}</span>
                <span aria-hidden="true">·</span>
                <span>Có video YouTube đi kèm</span>
              </div>

              {/* Card Main Heading */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#005993] transition-colors leading-snug">
                {card.title}
              </h2>

              {/* Card Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {card.summary}
              </p>

              {/* Step Preview Highlights */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#005993] shrink-0" />
                  <span>Đóng thẻ &amp; tài khoản thẻ tín dụng</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#005993] shrink-0" />
                  <span>Tự động mở phong toả sổ tiết kiệm online</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <PlayCircle className="w-4 h-4 text-[#D71920] shrink-0" />
                  <span>Tích hợp video hướng dẫn YouTube</span>
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="shrink-0 flex items-center">
              <span className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#005993] group-hover:bg-[#004675] text-white font-semibold text-sm transition-colors whitespace-nowrap">
                <span>Xem chi tiết 6 bước</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Menu Action Bar */}
      <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs sm:text-sm text-slate-500">
          Chuyên viên hỗ trợ trực tiếp:{' '}
          <span className="font-semibold text-slate-800">
            {contentData.feedback.advisor.name}
          </span>{' '}
          <span aria-hidden="true">·</span>{' '}
          <a
            href={`tel:${contentData.feedback.advisor.phoneTel}`}
            className="font-semibold text-[#005993] hover:underline tabular-nums"
          >
            {contentData.feedback.advisor.phoneDisplay}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSelectCard}
            className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Mở hướng dẫn ngay
          </button>
          <button
            type="button"
            onClick={onEndConversation}
            className="px-4 py-2.5 text-xs sm:text-sm font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            {contentData.feedback.endConversationLabel}
          </button>
        </div>
      </div>
    </section>
  );
};
