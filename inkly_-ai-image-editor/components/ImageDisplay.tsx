import React from 'react';
import Spinner from './Spinner';

interface ImageDisplayProps {
  title: string;
  imageSrc: string | null;
  isLoading?: boolean;
  placeholderText: React.ReactNode;
  onUpscale?: () => void;
  isUpscaling?: boolean;
  isUpscaleDisabled?: boolean;
  onDownload?: () => void;
  onDoBetter?: () => void;
  isDoingBetter?: boolean;
  isDoBetterDisabled?: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ 
    title, 
    imageSrc, 
    isLoading = false, 
    placeholderText,
    onUpscale,
    isUpscaling,
    isUpscaleDisabled,
    onDownload,
    onDoBetter,
    isDoingBetter,
    isDoBetterDisabled,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full aspect-square bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden shadow-lg">
        {isLoading && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center z-10 gap-4 transition-opacity duration-300">
            <Spinner className="w-12 h-12" />
            <span className="text-slate-300 font-medium">Processing...</span>
          </div>
        )}
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="w-full h-full object-contain" />
        ) : (
          <div className="text-center text-slate-500 px-4">
            {placeholderText}
          </div>
        )}
        <div className="absolute bottom-4 right-4 z-20 flex flex-wrap justify-end gap-2">
            {onDoBetter && imageSrc && (
                <button
                    onClick={onDoBetter}
                    disabled={isDoBetterDisabled}
                    className="flex items-center gap-2 px-3 py-1.5 h-9 text-xs font-semibold text-white bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 disabled:bg-slate-700/80 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500 backdrop-blur-sm"
                    aria-label="Try to improve this image"
                >
                    {isDoingBetter ? (
                        <><Spinner className="w-4 h-4" /><span>Improving...</span></>
                    ) : (
                        <><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3.5a.75.75 0 01.75.75V6h1.75a.75.75 0 010 1.5H10.75V9.25a.75.75 0 01-1.5 0V7.5H7.5a.75.75 0 010-1.5H9.25V4.25A.75.75 0 0110 3.5zM3.5 10a.75.75 0 01.75-.75H6V7.5a.75.75 0 011.5 0v1.75H9.25a.75.75 0 010 1.5H7.5v1.75a.75.75 0 01-1.5 0V10.75H4.25a.75.75 0 01-.75-.75zm12.5.75a.75.75 0 00-1.5 0v1.75h-1.75a.75.75 0 000 1.5h1.75v1.75a.75.75 0 001.5 0v-1.75h1.75a.75.75 0 000-1.5h-1.75V10.75z" /></svg><span>Do Better</span></>
                    )}
                </button>
            )}
             {onDownload && imageSrc && (
                <button
                    onClick={onDownload}
                    className="flex items-center justify-center w-9 h-9 text-slate-200 bg-black/50 backdrop-blur-sm rounded-full shadow-lg hover:bg-slate-800/80 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
                    aria-label="Download image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
            )}
            {onUpscale && imageSrc && (
                <button
                    onClick={onUpscale}
                    disabled={isUpscaleDisabled}
                    className="flex items-center gap-2 px-3 py-1.5 h-9 text-xs font-semibold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 disabled:bg-slate-700/80 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 backdrop-blur-sm"
                    aria-label="Upscale image"
                >
                     {isUpscaling ? (
                        <><Spinner className="w-4 h-4" /><span>Upscaling...</span></>
                     ) : (
                        <><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L9 5.414V17a1 1 0 102 0V5.414l5.293 5.293a1 1 0 001.414-1.414l-7-7z" /></svg><span>Upscale</span></>
                     )}
                </button>
            )}
        </div>
         <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
            <h2 className="text-lg font-semibold text-white text-center drop-shadow-md">{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;