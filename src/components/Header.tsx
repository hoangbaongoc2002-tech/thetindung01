import React, { useState } from 'react';
import contentData from '../data/contentData.json';

interface HeaderProps {
  currentView: 'menu' | 'guide' | 'ended';
  onNavigateMenu: () => void;
  onOpenGuide: () => void;
  onEndConversation: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateMenu,
  onOpenGuide,
  onEndConversation,
  onScrollToSection,
}) => {
  const [logoSrc, setLogoSrc] = useState<string>(contentData.brand.logo);
  const [logoFailed, setLogoFailed] = useState<boolean>(false);

  const handleLogoError = () => {
    if (logoSrc !== contentData.brand.logoRemoteUrl) {
      setLogoSrc(contentData.brand.logoRemoteUrl);
    } else {
      setLogoFailed(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand with VietinBank Logo on the left */}
        <button
          type="button"
          onClick={onNavigateMenu}
          className="flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005993] rounded-lg py-1 cursor-pointer shrink-0"
          aria-label="Trang chủ VietinBank"
        >
          {!logoFailed ? (
            <img
              src={logoSrc}
              alt={contentData.brand.name}
              onError={handleLogoError}
              referrerPolicy="no-referrer"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          ) : (
            <span className="text-xl font-bold tracking-tight text-[#005993]">
              {contentData.brand.name}
            </span>
          )}
        </button>

        {/* Zone 2: Clean Single-Line Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={onNavigateMenu}
            className={`hover:text-[#005993] transition-colors whitespace-nowrap cursor-pointer pb-0.5 border-b-2 ${
              currentView === 'menu'
                ? 'text-[#005993] border-[#005993] font-semibold'
                : 'border-transparent'
            }`}
          >
            Menu chính
          </button>
          <button
            type="button"
            onClick={onOpenGuide}
            className={`hover:text-[#005993] transition-colors whitespace-nowrap cursor-pointer pb-0.5 border-b-2 ${
              currentView === 'guide'
                ? 'text-[#005993] border-[#005993] font-semibold'
                : 'border-transparent'
            }`}
          >
            Hướng dẫn đóng thẻ
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenGuide();
              setTimeout(() => onScrollToSection('youtube-video-section'), 100);
            }}
            className="hover:text-[#005993] transition-colors whitespace-nowrap cursor-pointer pb-0.5 border-b-2 border-transparent"
          >
            Video YouTube
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenGuide();
              setTimeout(() => onScrollToSection('feedback-support-section'), 100);
            }}
            className="hover:text-[#005993] transition-colors whitespace-nowrap cursor-pointer pb-0.5 border-b-2 border-transparent"
          >
            Hỗ trợ trực tiếp
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {currentView !== 'menu' && (
            <button
              type="button"
              onClick={onNavigateMenu}
              className="px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              {contentData.feedback.backToMenuLabel}
            </button>
          )}
          <button
            type="button"
            onClick={onEndConversation}
            className="px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-[#005993] hover:bg-[#004675] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            {contentData.feedback.endConversationLabel}
          </button>
        </div>
      </div>
    </header>
  );
};
