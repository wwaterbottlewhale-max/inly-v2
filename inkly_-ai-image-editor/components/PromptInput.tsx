import React from 'react';
import Spinner from './Spinner';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  isDisabled: boolean;
  placeholder: string;
  buttonText?: string;
  onEnhancePrompt: () => void;
  isEnhancingPrompt: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  onPromptChange,
  onSubmit,
  isLoading,
  isDisabled,
  placeholder,
  buttonText = 'Submit',
  onEnhancePrompt,
  isEnhancingPrompt,
}) => {
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isDisabled && !isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isDisabled || isLoading}
          rows={3}
          className="w-full p-4 pr-32 bg-slate-900 border border-slate-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-slate-100 placeholder:text-slate-500 shadow-inner"
        />
        <button
          onClick={onEnhancePrompt}
          disabled={isDisabled || isLoading || !prompt.trim()}
          className="absolute right-3 top-3 flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-purple-600/20 text-purple-400 text-sm font-semibold rounded-lg hover:bg-purple-600/40 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500"
          title="Enhance prompt with AI"
        >
          {isEnhancingPrompt ? <Spinner className="w-5 h-5" /> : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Enhance
            </>
          )}
        </button>
      </div>
      <button
        onClick={onSubmit}
        disabled={isDisabled || isLoading || !prompt.trim()}
        className="w-full flex justify-center items-center h-14 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-slate-700 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-indigo-500 shadow-lg shadow-indigo-600/20"
      >
        {isLoading ? <Spinner className="w-6 h-6" /> : buttonText}
      </button>
    </div>
  );
};

export default PromptInput;