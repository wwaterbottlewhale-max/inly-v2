import React from 'react';

interface EditControlsProps {
  source: 'original' | 'latest';
  onSourceChange: (source: 'original' | 'latest') => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  disabled: boolean;
}

const EditControls: React.FC<EditControlsProps> = ({ source, onSourceChange, onUndo, onRedo, canUndo, canRedo, disabled }) => {
  const sourceBaseClasses = "relative flex-1 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 z-10";
  const sourceActiveClasses = "text-white";
  const sourceInactiveClasses = "text-slate-300 hover:text-white";
  
  const historyButtonClasses = "flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <h3 className="text-md font-semibold text-slate-300 flex-shrink-0">Edit From:</h3>
        <div className="relative flex-grow flex w-full sm:w-auto rounded-full overflow-hidden bg-slate-800 p-1">
           <div className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full bg-indigo-600 transition-transform duration-300 ease-in-out ${
              source === 'latest' ? 'translate-x-full' : 'translate-x-0'
            }`}
          />
          <button
            onClick={() => onSourceChange('original')}
            disabled={disabled}
            className={`${sourceBaseClasses} ${source === 'original' ? sourceActiveClasses : sourceInactiveClasses}`}
          >
            Original
          </button>
          <button
            onClick={() => onSourceChange('latest')}
            disabled={disabled}
            className={`${sourceBaseClasses} ${source === 'latest' ? sourceActiveClasses : sourceInactiveClasses}`}
          >
            Latest
          </button>
        </div>
      </div>
      
      <div className="flex justify-center items-center gap-3">
        <button onClick={onUndo} disabled={!canUndo || disabled} className={historyButtonClasses} aria-label="Undo last edit">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Undo
        </button>
        <button onClick={onRedo} disabled={!canRedo || disabled} className={historyButtonClasses} aria-label="Redo last edit">
          Redo
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EditControls;