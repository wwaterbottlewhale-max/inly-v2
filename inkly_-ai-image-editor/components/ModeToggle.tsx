import React from 'react';
import { EditingMode } from '../types';

interface ModeToggleProps {
  currentMode: EditingMode;
  onModeChange: (mode: EditingMode) => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ currentMode, onModeChange }) => {
  const baseClasses = "relative w-full sm:w-auto flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 z-10";
  const activeClasses = "text-white";
  const inactiveClasses = "text-slate-300 hover:text-white";

  return (
    <div className="relative flex justify-center p-1 space-x-2 bg-slate-800 rounded-full max-w-sm mx-auto shadow-md">
       <div className={`absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-indigo-600 transition-transform duration-300 ease-in-out ${
          currentMode === EditingMode.GENERATE ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
      <button
        onClick={() => onModeChange(EditingMode.EDIT)}
        className={`${baseClasses} ${currentMode === EditingMode.EDIT ? activeClasses : inactiveClasses}`}
        aria-pressed={currentMode === EditingMode.EDIT}
      >
        Edit Image
      </button>
      <button
        onClick={() => onModeChange(EditingMode.GENERATE)}
        className={`${baseClasses} ${currentMode === EditingMode.GENERATE ? activeClasses : inactiveClasses}`}
        aria-pressed={currentMode === EditingMode.GENERATE}
      >
        Generate Image
      </button>
    </div>
  );
};

export default ModeToggle;