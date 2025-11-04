import React, { useCallback, useRef, useState } from 'react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  hasImage: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, hasImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageSelect(file);
    }
  }, [onImageSelect]);
  
  const ringColor = isDragging ? 'ring-indigo-500 border-indigo-500' : 'border-slate-700 hover:border-indigo-500';
  const bgColor = isDragging ? 'bg-slate-800' : 'bg-slate-900';

  return (
    <div 
        className={`w-full p-8 text-center ${bgColor} rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ring-4 ring-transparent hover:bg-slate-800 ${ringColor}`}
        onClick={handleClick}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
       <div className="flex items-center justify-center w-16 h-16 mx-auto bg-slate-800 rounded-full border-2 border-slate-700">
         <svg className="h-8 w-8 text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
       </div>
      <p className="mt-5 text-slate-300 text-lg">
        <span className="font-semibold text-indigo-400">Click to upload</span>, drag & drop, or paste
      </p>
      <p className="text-sm text-slate-500 mt-1">Supports PNG, JPG, GIF, WEBP</p>
    </div>
  );
};

export default ImageUploader;