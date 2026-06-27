import OpenAI from "openai";
import { TranscriptionResult } from "./transcribe";

function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export interface AnalysisResult {
  niche: string;
  suggestedNiches: string[];
  viralityScore: number;
  hookScore: number;
  retentionScore: number;
  editingStyle: {
    transitions: string;
    colorGrading: string;
    captionStyle: string;
    musicGenre: string;
    pacing: string;
  };
  contentSuggestions: string[];
  detectedTopics: string[];
  sentiment: string;
  targetAudience: string;
}

/**
 * Use GPT to analyze transcription and determine niche, style, and scores.
 */
export async function analyzeContent(
  transcription: TranscriptionResult
): Promise<AnalysisResult> {
  const prompt = `Analyze this video transcription and return a JSON response.

TRANSCRIPTION:
"${transcription.text.substring(0, 3000)}"

LANGUAGE: ${transcription.language}
DURATION: ${transcription.duration} seconds

Return ONLY valid JSON with this exact structure:
{
  "niche": "the primary content niche (one of: Real Estate, Fashion, Food, Fitness, Travel, Education, Business, Podcast, Interview, Luxury, Cars, Technology, Beauty, Medical, Wedding, Corporate, Vlog, Product Review, Gaming, Motivational, Comedy, Lifestyle, Sports, Music)",
  "suggestedNiches": ["array of 2-3 related niches"],
  "viralityScore": 75,
  "hookScore": 80,
  "retentionScore": 70,
  "editingStyle": {
    "transitions": "smooth_dissolve or quick_cut or glitch or zoom",
    "colorGrading": "warm_cinematic or cool_modern or vibrant or neutral",
    "captionStyle": "hormozi or minimal or bold or luxury",
    "musicGenre": "ambient_cinematic or electronic or acoustic or lo_fi",
    "pacing": "fast or medium or slow"
  },
  "contentSuggestions": ["3-5 suggestions to improve the video"],
  "detectedTopics": ["main topics discussed"],
  "sentiment": "positive or neutral or negative",
  "targetAudience": "brief description of target audience"
}

Score ranges: 0-100. Be realistic with scoring.`;

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an expert video content strategist and editor with 15+ years of experience. You analyze video content and provide precise editing recommendations. Always respond with valid JSON only.",
      },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from AI analysis");
  }

  const result = JSON.parse(content) as AnalysisResult;
  return result;
}

/**
 * Generate SEO-optimized titles, descriptions, and hashtags.
 */
export async function generateSEOContent(
  transcription: TranscriptionResult,
  niche: string
): Promise<{
  titles: string[];
  descriptions: string[];
  hooks: string[];
  hashtags: string[];
  keywords: string[];
}> {
  const prompt = `Based on this ${niche} video transcript, generate SEO content.

TRANSCRIPT (first 1500 chars):
"${transcription.text.substring(0, 1500)}"

Return ONLY valid JSON:
{
  "titles": ["5 viral-worthy video titles, optimized for clicks"],
  "descriptions": ["2 YouTube/social media descriptions with keywords"],
  "hooks": ["5 attention-grabbing opening hooks for the video"],
  "hashtags": ["10-15 relevant hashtags without #"],
  "keywords": ["8-10 SEO keywords"]
}`;

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an expert in social media SEO and viral content optimization. Generate engaging, click-worthy content. Respond with valid JSON only.",
      },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from SEO generation");
  }

  return JSON.parse(content);
}
