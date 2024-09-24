import { Gemini } from '@generative-ai/gemini';

const apiKey = process.env.VUE_APP_GEMINI_API_KEY; // Replace with your environment variable name

const gemini = new Gemini({ apiKey });

export const formatText = async (text) => {
    const response = await gemini.models.gemini.generate({
        prompt: text,
        maxTokens: 1024, // Adjust as needed
        temperature: 0.7,  // Adjust as needed (higher for more creativity, lower for stricter formatting)
    });

    return response.data.generatedText;
};
