import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Copy,
  Check,
  RotateCcw,
  LogOut,
} from 'lucide-react';
import contentData from '../data/contentData.json';

interface FeedbackSectionProps {
  onBackToMenu: () => void;
  onEndConversation: () => void;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  onBackToMenu,
  onEndConversation,
}) => {
  const [feedbackState, setFeedbackState] = useState<'idle' | 'unresolved'>('idle');
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(contentData.feedback.advisor.phoneTel);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div
      id="feedback-support-section"
      className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-semibold text-[#005993] mb-1.5">
          Xác nhận kết quả thực hiện
        </p>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          {contentData.feedback.questionTitle}
        </h3>
        <p className="text-sm sm:text-base text-slate-600 mb-6">
          {contentData.feedback.questionSubtext}
        </p>

        {/* Primary Yes / No Feedback Buttons */}
        <div className="flex flex-wrap items-center gap-3.5">
          <button
            type="button"
            onClick={onBackToMenu}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{contentData.feedback.resolvedButton}</span>
          </button>

          <button
            type="button"
            onClick={() => setFeedbackState('unresolved')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap ${
              feedbackState === 'unresolved'
                ? 'bg-[#D71920] text-white'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
            }`}
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{contentData.feedback.unresolvedButton}</span>
          </button>
        </div>

        {/* Unresolved Support Message Box */}
        {feedbackState === 'unresolved' && (
          <div className="mt-6 p-5 sm:p-6 rounded-xl bg-amber-50/90 border border-amber-200 text-slate-900 space-y-4">
            <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-900">
              “{contentData.feedback.unresolvedMessage}”
            </p>

            <div className="pt-2 border-t border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-600">
                  {contentData.feedback.advisor.role}
                </p>
                <p className="text-base font-bold text-slate-900">
                  {contentData.feedback.advisor.name} ·{' '}
                  <span className="text-[#005993] tabular-nums">
                    {contentData.feedback.advisor.phoneDisplay}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={`tel:${contentData.feedback.advisor.phoneTel}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#005993] hover:bg-[#004675] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <PhoneCall className="w-4 h-4 shrink-0" />
                  <span>Gọi {contentData.feedback.advisor.phoneDisplay}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Đã sao chép SĐT</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 shrink-0" />
                      <span>Sao chép số điện thoại</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Required Side-by-Side Navigation Actions: "Quay lại menu chính" & "Kết thúc cuộc trò chuyện" */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-slate-500">
          Lựa chọn điều hướng tiếp theo của Quý khách:
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onBackToMenu}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            <span>{contentData.feedback.backToMenuLabel}</span>
          </button>

          <button
            type="button"
            onClick={onEndConversation}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D71920] hover:bg-[#b51319] text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>{contentData.feedback.endConversationLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
