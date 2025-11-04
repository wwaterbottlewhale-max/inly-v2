// FIX: Import React to make the JSX namespace and its types available.
import React from 'react';
import { EditingMode } from '../types';

interface FeatureShowcaseProps {
  mode: EditingMode;
}

const Feature: React.FC<{ icon: JSX.Element; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-500 text-white">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      <p className="mt-1 text-slate-600 dark:text-slate-400">{children}</p>
    </div>
  </div>
);

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ mode }) => {
  const commonFeatures = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      title: "AI Prompt Enhancement",
      description: "Not sure how to describe your idea? Type a simple prompt and click the magic wand to let Gemini enrich it for you."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
      title: "Easy Download",
      description: "Save your original, edited, or generated images with a single click using the download button on any image."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      title: "Do Better",
      description: "Not happy with the result? The 'Do Better' button tells the AI to try again with a focus on improving the quality."
    }
  ];

  const editFeatures = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>,
      title: "Upload & Edit",
      description: "Click, drag, or paste an image to start. Then use simple text prompts to describe your edits."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>,
      title: "Quick Actions",
      description: "Use one-click actions for common tasks like removing backgrounds, auto-enhancing, colorizing, and more."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" /></svg>,
      title: "Undo/Redo History",
      description: "Experiment freely with unlimited undo and redo steps. You can even choose to edit from the original or your latest version."
    },
  ];

  const generateFeatures = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>,
      title: "Generate From Text",
      description: "Describe any scene or idea you can imagine, and watch it come to life in a unique, AI-generated image."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l1.09 2.18L15 6l-2.18 1.09L11 9.27l-1.09-2.18L8.73 6l2.18-1.09L12 3zm-2 11l-1.09 2.18L8 17l2.18 1.09L11 20.27l1.09-2.18L13.27 17l-2.18-1.09L10 14zm9-5l-1.09 2.18L17 12l2.18 1.09L20 15.27l1.09-2.18L22.27 12l-2.18-1.09L19 9z" /></svg>,
      title: "High-Quality Results",
      description: "Powered by Imagen, our generator creates detailed, high-resolution images suitable for any project."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
      title: "Upscale Your Creation",
      description: "Love your generated image? Instantly upscale it to a higher resolution to enhance its details and quality."
    },
  ];

  const features = mode === EditingMode.EDIT ? [...editFeatures, ...commonFeatures] : [...generateFeatures, ...commonFeatures];

  return (
    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">
        Welcome to {mode === EditingMode.EDIT ? 'Edit Mode' : 'Generate Mode'}
      </h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-8 sm:mb-12">
        {mode === EditingMode.EDIT ? 'Upload an image to start, or see what you can do:' : 'Describe an image to generate, or see what you can do:'}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {features.map((feature) => (
          <Feature key={feature.title} icon={feature.icon} title={feature.title}>
            {feature.description}
          </Feature>
        ))}
      </div>
    </div>
  );
};

export default FeatureShowcase;
