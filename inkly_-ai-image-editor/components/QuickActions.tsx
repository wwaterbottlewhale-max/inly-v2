import React from 'react';
import Spinner from './Spinner';

interface QuickActionsProps {
  onRemoveBackground: () => void;
  onRemoveWatermark: () => void;
  onAutoEnhance: () => void;
  onConvertToBw: () => void;
  onColorize: () => void;
  onCartoonify: () => void;
  isLoadingBackground: boolean;
  isLoadingWatermark: boolean;
  isLoadingEnhance: boolean;
  isLoadingBw: boolean;
  isLoadingColorize: boolean;
  isLoadingCartoonify: boolean;
  isDisabled: boolean;
}

const ActionButton: React.FC<{
    onClick: () => void;
    disabled: boolean;
    isLoading: boolean;
    label: string;
    loadingLabel: string;
    className: string;
    children: React.ReactNode;
}> = ({ onClick, disabled, isLoading, label, loadingLabel, className, children }) => {
    return (
        <button
          onClick={onClick}
          disabled={disabled}
          className={`flex-1 flex flex-col justify-center items-center gap-2 h-24 px-4 py-2 text-white font-semibold text-sm rounded-xl disabled:bg-slate-700/50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 ${className}`}
        >
          {isLoading ? (
            <>
              <Spinner className="w-6 h-6" />
              <span className="text-xs">{loadingLabel}</span>
            </>
          ) : (
            <>
              {children}
              <span className="text-xs">{label}</span>
            </>
          )}
        </button>
    );
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onRemoveBackground,
  onRemoveWatermark,
  onAutoEnhance,
  onConvertToBw,
  onColorize,
  onCartoonify,
  isLoadingBackground,
  isLoadingWatermark,
  isLoadingEnhance,
  isLoadingBw,
  isLoadingColorize,
  isLoadingCartoonify,
  isDisabled,
}) => {

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 px-2">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <ActionButton onClick={onRemoveBackground} disabled={isDisabled} isLoading={isLoadingBackground} label="Remove BG" loadingLabel="Removing..." className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </ActionButton>
        <ActionButton onClick={onRemoveWatermark} disabled={isDisabled} isLoading={isLoadingWatermark} label="Remove Mark" loadingLabel="Removing..." className="bg-sky-600 hover:bg-sky-700 focus:ring-sky-500">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        </ActionButton>
        <ActionButton onClick={onAutoEnhance} disabled={isDisabled} isLoading={isLoadingEnhance} label="Auto Enhance" loadingLabel="Enhancing..." className="bg-teal-600 hover:bg-teal-700 focus:ring-teal-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l1.09 2.18L15 6l-2.18 1.09L11 9.27l-1.09-2.18L8.73 6l2.18-1.09L12 3zm-2 11l-1.09 2.18L8 17l2.18 1.09L11 20.27l1.09-2.18L13.27 17l-2.18-1.09L10 14zm9-5l-1.09 2.18L17 12l2.18 1.09L20 15.27l1.09-2.18L22.27 12l-2.18-1.09L19 9z" /></svg>
        </ActionButton>
        <ActionButton onClick={onConvertToBw} disabled={isDisabled} isLoading={isLoadingBw} label="B & W" loadingLabel="Converting..." className="bg-slate-600 hover:bg-slate-500 focus:ring-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 1.5c-5.799 0-10.5 4.701-10.5 10.5s4.701 10.5 10.5 10.5S22.5 17.799 22.5 12 17.799 1.5 12 1.5z"/><path d="M12 1.5v21" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
        </ActionButton>
        <ActionButton onClick={onColorize} disabled={isDisabled} isLoading={isLoadingColorize} label="Colorize" loadingLabel="Colorizing..." className="bg-amber-600 hover:bg-amber-700 focus:ring-amber-500">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12.5a2 2 0 002-2V5a2 2 0 00-2-2H9.5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </ActionButton>
        <ActionButton onClick={onCartoonify} disabled={isDisabled} isLoading={isLoadingCartoonify} label="Cartoonify" loadingLabel="Applying..." className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-500">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </ActionButton>
      </div>
    </div>
  );
};

export default QuickActions;