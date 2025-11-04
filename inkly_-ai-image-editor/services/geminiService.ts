
import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const editImageWithGemini = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    if (response.candidates && response.candidates.length > 0 && response.candidates[0].content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return part.inlineData.data;
        }
      }
    }

    console.error("Unexpected response from Gemini API when editing image:", response);
    throw new Error("No image data found in the response. The request may have been blocked or failed.");

  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    throw new Error("Failed to edit image. Please check the console for details.");
  }
};

export const generateImageWithImagen = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
        return response.generatedImages[0].image.imageBytes;
    }
    throw new Error("No image data found in the response.");
  } catch (error) {
    console.error("Error generating image with Imagen:", error);
    throw new Error("Failed to generate image. Please check the console for details.");
  }
};

export const enhancePromptWithGemini = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Enhance the following image generation prompt to be more descriptive, vivid, and artistic. Return only the enhanced prompt, without any preamble, labels, or quotation marks. The original prompt is: "${prompt}"`,
    });
    return response.text.trim();
  } catch (error) {
      console.error("Error enhancing prompt with Gemini:", error);
      throw new Error("Failed to enhance prompt. Please check the console for details.");
  }
};
