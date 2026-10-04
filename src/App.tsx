import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle, RotateCcw, PhoneCall } from 'lucide-react';
import contentData from './data/contentData.json';
import { Header } from './components/Header';
import { TopicCard } from './components/TopicCard';
import { StepGuide } from './components/StepGuide';

export default function App() {
  const [currentView, setCurrentView] = useState<'menu' | 'guide' | 'ended'>('menu');
  const mainContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !mainContainerRef.current) return;

    const ctx = gsap.context(() => {
      if (currentView === 'menu') {
        gsap.fromTo(
          '.gsap-hero-reveal',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
        gsap.fromTo(
          '.gsap-card-reveal',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4, delay: 0.05, ease: 'power2.out' }
        );
      } else if (currentView === 'guide') {
        gsap.fromTo(
          '.gsap-step-card',
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.05,
            ease: 'power2.out',
          }
        );
      } else if (currentView === 'ended') {
        gsap.fromTo(
          '.gsap-ended-reveal',
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
        );
      }
    }, mainContainerRef);

    return () => ctx.revert();
  }, [currentView]);

  const handleNavigateMenu = () => {
    setCurrentView('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGuide = () => {
    setCurrentView('guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEndConversation = () => {
    setCurrentView('ended');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      ref={mainContainerRef}
      className="min-h-screen flex flex-col bg-slate-50 text-slate-900"
    >
      {/* Top Bar with VietinBank Logo on the left */}
      <Header
        currentView={currentView}
        onNavigateMenu={handleNavigateMenu}
        onOpenGuide={handleOpenGuide}
        onEndConversation={handleEndConversation}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'menu' && (
          <TopicCard
            onSelectCard={handleOpenGuide}
            onEndConversation={handleEndConversation}
          />
        )}

        {currentView === 'guide' && (
          <StepGuide
            onBackToMenu={handleNavigateMenu}
            onEndConversation={handleEndConversation}
          />
        )}

        {currentView === 'ended' && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="gsap-ended-reveal bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#005993] tracking-wide">
                  VietinBank iPay
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                  “{contentData.feedback.endConversationMessage}”
                </h1>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 space-y-1">
                <p>
                  Nếu cần hỗ trợ trực tiếp bất kỳ lúc nào, Quý khách vui lòng liên hệ:
                </p>
                <p className="font-semibold text-slate-900">
                  Chuyên viên tư vấn {contentData.feedback.advisor.name} – SĐT:{' '}
                  <a
                    href={`tel:${contentData.feedback.advisor.phoneTel}`}
                    className="text-[#005993] hover:underline tabular-nums"
                  >
                    {contentData.feedback.advisor.phoneDisplay}
                  </a>
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleNavigateMenu}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#005993] hover:bg-[#004675] text-white font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{contentData.feedback.backToMenuLabel}</span>
                </button>

                <a
                  href={`tel:${contentData.feedback.advisor.phoneTel}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors whitespace-nowrap"
                >
                  <PhoneCall className="w-4 h-4 text-[#005993]" />
                  <span>Gọi hỗ trợ: {contentData.feedback.advisor.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© Ngân hàng TMCP Công Thương Việt Nam (VietinBank). Cổng hướng dẫn khách hàng.</p>
          <div className="flex items-center gap-4">
            <span>
              Hỗ trợ trực tiếp: {contentData.feedback.advisor.name} (
              {contentData.feedback.advisor.phoneDisplay})
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
