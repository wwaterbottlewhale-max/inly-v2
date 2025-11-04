
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { EditingMode } from './types';
import { editImageWithGemini, generateImageWithImagen, enhancePromptWithGemini } from './services/geminiService';

import Header from './components/Header';
import ModeToggle from './components/ModeToggle';
import ImageUploader from './components/ImageUploader';
import ImageDisplay from './components/ImageDisplay';
import PromptInput from './components/PromptInput';
import QuickActions from './components/QuickActions';
import EditControls from './components/EditControls';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [mode, setMode] = useState<EditingMode>(EditingMode.EDIT);
  const [originalImage, setOriginalImage] = useState<{ base64: string; mimeType: string; } | null>(null);
  
  const [editHistory, setEditHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [lastSuccessfulPrompt, setLastSuccessfulPrompt] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemovingBackground, setIsRemovingBackground] = useState<boolean>(false);
  const [isRemovingWatermark, setIsRemovingWatermark] = useState<boolean>(false);
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
  const [isConvertingBw, setIsConvertingBw] = useState<boolean>(false);
  const [isColorizing, setIsColorizing] = useState<boolean>(false);
  const [isCartoonifying, setIsCartoonifying] = useState<boolean>(false);
  const [isUpscaling, setIsUpscaling] = useState<boolean>(false);
  const [isEnhancingPrompt, setIsEnhancingPrompt] = useState<boolean>(false);
  const [isDoingBetter, setIsDoingBetter] = useState<boolean>(false);
  
  const [error, setError] = useState<string | null>(null);
  const [editSource, setEditSource] = useState<'original' | 'latest'>('original');

  const currentEditedImage = useMemo(() => {
    if (historyIndex >= 0 && historyIndex < editHistory.length) {
      return editHistory[historyIndex];
    }
    return null;
  }, [editHistory, historyIndex]);

  const canUndo = historyIndex >= 0;
  const canRedo = historyIndex < editHistory.length - 1;

  const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve({ base64, mimeType: file.type });
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageSelect = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setEditHistory([]);
    setHistoryIndex(-1);
    setEditSource('original');
    setLastSuccessfulPrompt('');
    try {
      const { base64, mimeType } = await fileToBase64(file);
      setOriginalImage({ base64, mimeType });
    } catch (err) {
      setError('Failed to read the image file.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      if (mode !== EditingMode.EDIT) {
        return;
      }

      const items = event.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            event.preventDefault();
            handleImageSelect(file);
            return;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);

    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [mode, handleImageSelect]);

  const handleModeChange = (newMode: EditingMode) => {
    setMode(newMode);
    setError(null);
    setPrompt('');
    setOriginalImage(null); // Clear original image when switching mode
    setGeneratedImage(null);
    setEditHistory([]);
    setHistoryIndex(-1);
    setEditSource('original');
    setLastSuccessfulPrompt('');
  };

  const performEdit = async (promptText: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
      setLoading(true);
      setError(null);

      let sourceImage: { base64: string; mimeType: string; } | null = null;

      if (editSource === 'latest' && currentEditedImage) {
        const match = currentEditedImage.match(/^data:(image\/.*?);base64,(.*)$/);
        if (match) {
          sourceImage = { mimeType: match[1], base64: match[2] };
        }
      }
      
      if (!sourceImage && originalImage) {
        sourceImage = originalImage;
      }

      if (!sourceImage) {
        setError("No source image available for editing.");
        setLoading(false);
        return;
      }

      try {
        const resultBase64 = await editImageWithGemini(sourceImage.base64, sourceImage.mimeType, promptText);
        const newHistory = editHistory.slice(0, historyIndex + 1);
        const newImage = `data:image/png;base64,${resultBase64}`;
        newHistory.push(newImage);
        setEditHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setLastSuccessfulPrompt(promptText);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(errorMessage);
        console.error(err);
      } finally {
        setLoading(false);
      }
  };
  
  const performGenerate = async (promptText: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    setError(null);
    try {
        const resultBase64 = await generateImageWithImagen(promptText);
        setGeneratedImage(`data:image/png;base64,${resultBase64}`);
        setLastSuccessfulPrompt(promptText);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(errorMessage);
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    if (mode === EditingMode.EDIT) {
        await performEdit(prompt, setIsLoading);
    } else if (mode === EditingMode.GENERATE) {
        await performGenerate(prompt, setIsLoading);
    }
  };

  const handleRemoveBackground = () => performEdit('Remove the background. Make the background transparent and output a PNG.', setIsRemovingBackground);
  const handleRemoveWatermark = () => performEdit('Identify any watermarks, logos, or text overlays in this image and remove them intelligently, reconstructing the area behind them.', setIsRemovingWatermark);
  const handleAutoEnhance = () => performEdit('Auto enhance this image. Adjust lighting, color balance, and sharpness for a better look. Make the result natural.', setIsEnhancing);
  const handleConvertToBw = () => performEdit('Convert this image to a high-contrast black and white photo.', setIsConvertingBw);
  const handleColorize = () => performEdit('Colorize this black and white or sepia photo with natural, realistic colors.', setIsColorizing);
  const handleCartoonify = () => performEdit('Turn this photo into a vibrant, fun cartoon-style image.', setIsCartoonifying);

  const handleUndo = () => {
    if (canUndo) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleUpscaleImage = async (imageSource: string | null) => {
    if (!imageSource) {
      if(mode === EditingMode.GENERATE && generatedImage) {
           imageSource = generatedImage;
      } else {
          return;
      }
    }

    const match = imageSource.match(/^data:(image\/.*?);base64,(.*)$/);
    if (!match) {
      setError("Invalid image format for upscaling.");
      return;
    }
    const mimeType = match[1];
    const base64 = match[2];

    setIsUpscaling(true);
    setError(null);
    try {
      const upscalePrompt = 'Upscale this image to a higher resolution. Enhance details and sharpness while maintaining photorealism. Output the highest possible quality.';
      const resultBase64 = await editImageWithGemini(
        base64,
        mimeType,
        upscalePrompt
      );
      const newImage = `data:image/png;base64,${resultBase64}`;

      if (mode === EditingMode.EDIT) {
          const newHistory = editHistory.slice(0, historyIndex + 1);
          newHistory.push(newImage);
          setEditHistory(newHistory);
          setHistoryIndex(newHistory.length - 1);
      } else {
          setGeneratedImage(newImage);
      }
      setLastSuccessfulPrompt(upscalePrompt);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred during upscaling.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsUpscaling(false);
    }
  };

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) return;
    setIsEnhancingPrompt(true);
    setError(null);
    try {
        const enhancedPrompt = await enhancePromptWithGemini(prompt);
        setPrompt(enhancedPrompt);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(errorMessage);
        console.error(err);
    } finally {
        setIsEnhancingPrompt(false);
    }
  };

  const handleDownload = (imageSrc: string | null, filename: string) => {
    if (!imageSrc) return;
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleDoBetter = async () => {
    if (!lastSuccessfulPrompt) return;

    const betterPrompt = `The previous result wasn't quite right. Do a better job at this request: "${lastSuccessfulPrompt}"`;

    if (mode === EditingMode.EDIT) {
        await performEdit(betterPrompt, setIsDoingBetter);
    } else if (mode === EditingMode.GENERATE) {
        await performGenerate(betterPrompt, setIsDoingBetter);
    }
  };

  const isBusy = isLoading || isRemovingBackground || isRemovingWatermark || isEnhancing || isConvertingBw || isUpscaling || isColorizing || isCartoonifying || isEnhancingPrompt || isDoingBetter;
  const isPromptDisabled = mode === EditingMode.EDIT && !originalImage;
  
  return (
    <div className="min-h-screen font-sans antialiased flex flex-col">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl flex-grow">
        <div className="flex flex-col gap-8">
            <ModeToggle currentMode={mode} onModeChange={handleModeChange} />
            
            {error && (
                <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {mode === EditingMode.EDIT && (
              <div className="flex flex-col gap-8">
                {!originalImage && <ImageUploader onImageSelect={handleImageSelect} hasImage={!!originalImage} />}
                
                {originalImage && (
                  <>
                    <div className="flex flex-col gap-4">
                        <QuickActions 
                            onRemoveBackground={handleRemoveBackground}
                            onRemoveWatermark={handleRemoveWatermark}
                            onAutoEnhance={handleAutoEnhance}
                            onConvertToBw={handleConvertToBw}
                            onColorize={handleColorize}
                            onCartoonify={handleCartoonify}
                            isLoadingBackground={isRemovingBackground}
                            isLoadingWatermark={isRemovingWatermark}
                            isLoadingEnhance={isEnhancing}
                            isLoadingBw={isConvertingBw}
                            isLoadingColorize={isColorizing}
                            isLoadingCartoonify={isCartoonifying}
                            isDisabled={isBusy}
                        />
                        {currentEditedImage && (
                          <EditControls 
                            source={editSource} 
                            onSourceChange={setEditSource} 
                            onUndo={handleUndo}
                            onRedo={handleRedo}
                            canUndo={canUndo}
                            canRedo={canRedo}
                            disabled={isBusy}
                          />
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        <ImageDisplay
                            title="Original"
                            imageSrc={originalImage ? `data:${originalImage.mimeType};base64,${originalImage.base64}` : null}
                            isLoading={isLoading && !originalImage}
                            placeholderText={<span className="font-semibold">Upload an image to start</span>}
                            onDownload={() => originalImage && handleDownload(`data:${originalImage.mimeType};base64,${originalImage.base64}`, 'original.png')}
                        />
                        <ImageDisplay
                            title="Edited"
                            imageSrc={currentEditedImage}
                            isLoading={(isBusy && !!originalImage) && !(isUpscaling || isDoingBetter)}
                            placeholderText={<span>Your edited image will appear here</span>}
                            onUpscale={() => handleUpscaleImage(currentEditedImage)}
                            isUpscaling={isUpscaling}
                            isUpscaleDisabled={isBusy || !currentEditedImage}
                            onDownload={() => handleDownload(currentEditedImage, 'edited.png')}
                            onDoBetter={handleDoBetter}
                            isDoingBetter={isDoingBetter}
                            isDoBetterDisabled={isBusy || !currentEditedImage || !lastSuccessfulPrompt}
                        />
                    </div>
                  </>
                )}
              </div>
            )}
            
            {mode === EditingMode.GENERATE && (
                <div className="flex justify-center">
                    <div className="w-full" style={{ maxWidth: '512px' }}>
                        <ImageDisplay
                            title="Generated Image"
                            imageSrc={generatedImage}
                            isLoading={isLoading || isDoingBetter}
                            placeholderText={
                                <div className="flex flex-col items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Describe a scene to generate an image</span>
                                </div>
                            }
                            onUpscale={() => handleUpscaleImage(generatedImage)}
                            isUpscaling={isUpscaling}
                            isUpscaleDisabled={isBusy || !generatedImage}
                            onDownload={() => handleDownload(generatedImage, 'generated.png')}
                            onDoBetter={handleDoBetter}
                            isDoingBetter={isDoingBetter}
                            isDoBetterDisabled={isBusy || !generatedImage || !lastSuccessfulPrompt}
                        />
                    </div>
                </div>
            )}

            <div className="mt-4 max-w-3xl mx-auto w-full">
              <PromptInput
                  prompt={prompt}
                  onPromptChange={setPrompt}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  isDisabled={isPromptDisabled || isBusy}
                  onEnhancePrompt={handleEnhancePrompt}
                  isEnhancingPrompt={isEnhancingPrompt}
                  placeholder={
                  mode === EditingMode.EDIT 
                      ? "e.g., Make the sky dramatic, add a retro filter..."
                      : "e.g., An astronaut riding a horse on Mars, photorealistic..."
                  }
                  buttonText={mode === EditingMode.EDIT ? 'Apply Edit' : 'Generate'}
              />
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
