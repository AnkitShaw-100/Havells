import { GoogleGenerativeAI } from "@google/generative-ai";
import ytSearch from "yt-search";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const parseJsonFromModelResponse = (rawText) => {
  if (!rawText || typeof rawText !== "string") {
    throw new Error("Empty or non-string model response");
  }

  const normalized = rawText.trim();
  const candidates = [];

  candidates.push(normalized);

  const withoutCodeFence = normalized
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  if (withoutCodeFence !== normalized) {
    candidates.push(withoutCodeFence);
  }

  const firstBrace = normalized.indexOf("{");
  const lastBrace = normalized.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    candidates.push(normalized.slice(firstBrace, lastBrace + 1));
  }

  const firstBracket = normalized.indexOf("[");
  const lastBracket = normalized.lastIndexOf("]");
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    candidates.push(normalized.slice(firstBracket, lastBracket + 1));
  }

  let lastError;
  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(
    lastError?.message || "Unable to parse model response as JSON"
  );
};

/**
 * Analyze fish freshness using Gemini Vision API
 * @param {Buffer|string} imageInput - Image buffer or URL to analyze
 * @returns {Promise<Object>} Analysis result with freshness score and details
 */
export const analyzeFishFreshnessWithGemini = async (imageInput) => {
  try {
    console.log("\n========== GEMINI VISION ANALYSIS START ==========");
    console.log("GEMINI API KEY", process.env.GEMINI_API_KEY);

    if (!process.env.GEMINI_API_KEY) {
      console.error(
        "❌ CRITICAL: GEMINI_API_KEY not found in environment variables"
      );
      console.error("   Please add GEMINI_API_KEY to .env file");
      console.error("   Get key from: https://aistudio.google.com/app/apikey");
      return getDefaultAnalysis("API_KEY_MISSING");
    }

    console.log("✅ GEMINI_API_KEY found");

    console.log("🤖 Starting Gemini Vision analysis for fish freshness...");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    console.log("✅ Model initialized: gemini-2.0-flash");

    // Convert image buffer to base64 or use URL
    let imageData;
    let base64Data;
    let mimeType = "image/jpeg";

    if (typeof imageInput === "string") {
      // It's a URL - fetch and convert to base64
      console.log("🌐 Image format: URL");
      console.log("   URL:", imageInput);
      console.log("📥 Fetching image from URL...");

      try {
        // Detect mime type from URL
        if (imageInput.includes(".png")) {
          mimeType = "image/png";
        } else if (imageInput.includes(".webp")) {
          mimeType = "image/webp";
        } else if (imageInput.includes(".gif")) {
          mimeType = "image/gif";
        }
        console.log(`   Detected mime type: ${mimeType}`);

        const response = await fetch(imageInput, {
          timeout: 15000,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "image/*",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        // Check Content-Type header for accurate mime type
        const contentType = response.headers.get("content-type");
        if (contentType) {
          console.log(`   Response Content-Type: ${contentType}`);
          if (contentType.includes("png")) {
            mimeType = "image/png";
          } else if (contentType.includes("webp")) {
            mimeType = "image/webp";
          } else if (contentType.includes("gif")) {
            mimeType = "image/gif";
          } else if (
            contentType.includes("jpeg") ||
            contentType.includes("jpg")
          ) {
            mimeType = "image/jpeg";
          }
        }

        const buffer = await response.arrayBuffer();
        console.log(`✅ Image fetched: ${buffer.byteLength} bytes`);

        if (buffer.byteLength === 0) {
          throw new Error("Image buffer is empty");
        }

        if (buffer.byteLength > 20 * 1024 * 1024) {
          throw new Error("Image is too large (>20MB)");
        }

        base64Data = Buffer.from(buffer).toString("base64");
        console.log(`✅ Base64 encoded: ${base64Data.length} characters`);
      } catch (fetchErr) {
        console.error("❌ Error fetching image from URL:", fetchErr.message);
        throw new Error(`Cannot fetch image from URL: ${fetchErr.message}`);
      }
    } else if (Buffer.isBuffer(imageInput)) {
      console.log("🌐 Image format: Buffer");
      console.log("   Size:", imageInput.length, "bytes");

      if (imageInput.length === 0) {
        throw new Error("Image buffer is empty");
      }

      base64Data = imageInput.toString("base64");
    } else {
      throw new Error("Invalid image input: must be Buffer or URL string");
    }

    // Create image data object with base64
    imageData = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType,
      },
    };
    console.log("✅ Image ready for analysis");

    const prompt = `You are an expert fish quality inspector. Analyze this fish image and provide a freshness assessment.

IMPORTANT: Look at the actual FISH in the image and assess:
- Eyes: Are they clear, bright, and transparent? Or cloudy and sunken?
- Color: Is the fish color vibrant and healthy? Or faded and dull?
- Texture: Does the fish look firm and smooth? Or soft and slimy?
- Gills: Are visible gills red/pink? Or brown/gray?
- Overall freshness based on visual inspection

Respond with ONLY a raw JSON object.
Do not wrap in markdown code fences.
Do not prefix with json.
Do not add commentary before or after.
Output must start with { and end with }.
{
  "freshnessScore": <number 0-100>,
  "isCertified": <boolean>,
  "analysisDetails": {
    "colorScore": <number 0-100>,
    "textureScore": <number 0-100>,
    "eyesCondition": "<brief description of eyes>",
    "smellIndicator": "<estimated smell quality based on visual cues>",
    "overallQuality": "<Excellent|Good|Fair|Poor>",
    "recommendations": "<storage and usage recommendations>"
  },
  "mlModel": "gemini-2.0-flash"
}`;

    try {
      console.log("📤 Sending request to Gemini API with image...");
      console.log(
        `   Image data size: ${imageData.inlineData.data.length} characters`
      );
      console.log(`   Mime type: ${imageData.inlineData.mimeType}`);

      // Retry with exponential backoff for rate limits (429)
      const MAX_RETRIES = 3;
      let result;
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          console.log(`   Attempt ${attempt}/${MAX_RETRIES}...`);
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error("Gemini API call timeout (30s)")),
              30000
            )
          );
          result = await Promise.race([
            model.generateContent([imageData, prompt]),
            timeoutPromise,
          ]);
          break; // success, exit retry loop
        } catch (retryErr) {
          const isRateLimit =
            retryErr.message?.includes("429") ||
            retryErr.message?.includes("Too Many Requests") ||
            retryErr.message?.includes("quota");
          if (isRateLimit && attempt < MAX_RETRIES) {
            const waitMs = Math.pow(2, attempt) * 2000; // 4s, 8s, 16s
            console.warn(
              `⏳ Rate limited (429). Waiting ${waitMs / 1000}s before retry...`
            );
            await new Promise((resolve) => setTimeout(resolve, waitMs));
          } else {
            throw retryErr;
          }
        }
      }
      console.log("📥 Response received from Gemini API");

      if (!result || !result.response) {
        console.error("❌ Empty response from Gemini API");
        return getDefaultAnalysis("EMPTY_RESPONSE");
      }

      const responseText = result.response.text().trim();

      if (!responseText) {
        console.error("❌ Empty response text from Gemini API");
        return getDefaultAnalysis("EMPTY_RESPONSE_TEXT");
      }

      console.log("📝 Raw response length:", responseText.length, "characters");
      console.log(
        "📝 Raw response preview:",
        responseText.substring(0, 400) + "..."
      );

      // Parse JSON response
      console.log("🔍 Parsing JSON response...");
      let analysisResult;

      try {
        analysisResult = parseJsonFromModelResponse(responseText);
      } catch (parseErr) {
        console.error("❌ Failed to parse JSON:", parseErr.message);
        console.error("   Response was:", responseText);
        return getDefaultAnalysis(`JSON_PARSE_ERROR: ${parseErr.message}`);
      }

      console.log("✅ JSON parsed successfully");

      // Validate response structure
      if (
        typeof analysisResult.freshnessScore !== "number" ||
        typeof analysisResult.isCertified !== "boolean"
      ) {
        console.error(
          "❌ Invalid response structure:",
          JSON.stringify(analysisResult, null, 2)
        );
        console.error(
          "   Expected: freshnessScore (number), isCertified (boolean)"
        );
        console.error("   Got:", {
          freshnessScore: typeof analysisResult.freshnessScore,
          isCertified: typeof analysisResult.isCertified,
        });
        return getDefaultAnalysis("INVALID_RESPONSE_STRUCTURE");
      }

      console.log("✅ Response structure validated");
      console.log("✅ Gemini analysis complete:", {
        freshnessScore: analysisResult.freshnessScore,
        isCertified: analysisResult.isCertified,
        quality: analysisResult.analysisDetails?.overallQuality,
        model: analysisResult.mlModel,
      });
      console.log(
        "========== GEMINI VISION ANALYSIS END (SUCCESS) ==========\n"
      );

      return analysisResult;
    } catch (apiErr) {
      if (apiErr.message.includes("timeout")) {
        console.error("❌ TIMEOUT: Gemini API took too long (>30 seconds)");
        return getDefaultAnalysis("TIMEOUT");
      }
      if (
        apiErr.message?.includes("429") ||
        apiErr.message?.includes("quota")
      ) {
        console.error("❌ RATE LIMITED: Gemini API free tier quota exhausted");
        console.error(
          "   ➡️  Get a new API key from https://aistudio.google.com/app/apikey"
        );
        console.error("   ➡️  Or wait for the daily quota to reset");
        return getDefaultAnalysis("QUOTA_EXHAUSTED");
      }
      throw apiErr;
    }
  } catch (error) {
    console.error("❌ Gemini analysis error:", error.message);
    console.error("   Stack:", error.stack);
    console.log("========== GEMINI VISION ANALYSIS END (FAILED) ==========\n");
    return getDefaultAnalysis(error.message);
  }
};

/**
 * Get default analysis when Gemini API fails
 * @param {string} errorReason - Reason for using default
 * @returns {Object} Default analysis object
 */
const getDefaultAnalysis = (errorReason) => {
  console.warn(`⚠️ FALLBACK ANALYSIS USED - Reason: ${errorReason}`);
  console.warn("ℹ️ This means the Gemini API is NOT working properly");

  const isQuotaIssue =
    errorReason.includes("QUOTA") ||
    errorReason.includes("429") ||
    errorReason.includes("quota");
  const eyesMsg = isQuotaIssue
    ? "⚠️ Gemini API quota exhausted — generate a new key or wait for reset"
    : "⚠️ ANALYSIS UNAVAILABLE - Check backend logs";
  const recsMsg = isQuotaIssue
    ? "Get a new Gemini API key at https://aistudio.google.com/app/apikey or wait for daily quota reset"
    : "Please check server logs for errors";

  return {
    freshnessScore: 70,
    isCertified: false,
    analysisDetails: {
      colorScore: 70,
      textureScore: 70,
      eyesCondition: eyesMsg,
      smellIndicator: "Analysis not performed",
      overallQuality: "Unable to determine",
      recommendations: recsMsg,
      analyzedAt: new Date().toISOString(),
    },
    mlModel: "gemini-2.0-flash",
    error: `FALLBACK USED - ${errorReason}`,
    isAnalysisFailed: true,
  };
};

export const generateRecipeVideos = async (fishName) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("⚠️  GEMINI_API_KEY not found in environment variables");
      return generateDefaultRecipesWithYouTube(fishName);
    }

    console.log(`🔍 Searching top 3 recipes for: ${fishName}`);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Recommend 3 popular YouTube recipe videos for cooking ${fishName}. 
    For each recipe, provide:
    1. Recipe Title (short, catchy name like "Crispy Baked Salmon" or "Pan-Seared Tilapia")
    2. Description (1-2 lines about the recipe)
    3. Search Query (specific search terms to find this recipe on YouTube)
    
    Format your response as JSON array with 3 objects, each with "title", "description", and "searchQuery" fields.
    Example:
    [
      {"title":"Grilled Salmon with Lemon","description":"Simple grilled salmon recipe with fresh lemon and herbs","searchQuery":"grilled salmon lemon recipe"},
      {"title":"Crispy Fish Fry","description":"Traditional crispy fried fish with spices","searchQuery":"crispy fried fish recipe"},
      {"title":"Baked Fish with Vegetables","description":"Healthy baked fish with seasonal vegetables","searchQuery":"baked fish vegetables recipe"}
    ]
    
    Return ONLY the JSON array, nothing else.`;

    try {
      // Retry with exponential backoff for rate limits
      const MAX_RETRIES = 3;
      let result;
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), 15000)
          );
          result = await Promise.race([
            model.generateContent(prompt),
            timeoutPromise,
          ]);
          break;
        } catch (retryErr) {
          const isRateLimit =
            retryErr.message?.includes("429") ||
            retryErr.message?.includes("quota");
          if (isRateLimit && attempt < MAX_RETRIES) {
            const waitMs = Math.pow(2, attempt) * 2000;
            console.warn(
              `⏳ Rate limited. Waiting ${waitMs / 1000}s before retry ${attempt + 1}/${MAX_RETRIES}...`
            );
            await new Promise((resolve) => setTimeout(resolve, waitMs));
          } else {
            throw retryErr;
          }
        }
      }
      const responseText = result.response.text().trim();

      console.log(`📝 Raw response: ${responseText}`);

      // Parse JSON response
      const recipes = JSON.parse(responseText);

      if (!Array.isArray(recipes) || recipes.length === 0) {
        console.warn("⚠️  Invalid recipes response structure");
        return generateDefaultRecipesWithYouTube(fishName);
      }

      // Fetch YouTube videos for each recipe
      const videosWithThumbnails = await Promise.all(
        recipes.map(async (recipe, index) => {
          try {
            const searchQuery = recipe.searchQuery || `${fishName} recipe`;
            console.log(`🎬 Searching YouTube for: "${searchQuery}"`);

            const videoResult = await ytSearch(searchQuery);

            if (videoResult.videos && videoResult.videos.length > 0) {
              const video = videoResult.videos[0];
              console.log(`✅ Found video: ${video.title} (${video.videoId})`);

              return {
                id: index + 1,
                title: recipe.title || `Recipe ${index + 1}`,
                description: recipe.description || "",
                searchQuery: searchQuery,
                url: video.url,
                videoId: video.videoId,
                thumbnail: video.thumbnail,
                thumbnailHQ: `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`,
                thumbnailMax: `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`,
                channel: video.author?.name || "Chef",
                duration: video.duration?.toString() || "00:00",
              };
            }
          } catch (err) {
            console.error(
              `❌ Error searching YouTube for "${recipe.searchQuery}":`,
              err.message
            );
          }

          // Fallback if YouTube search fails
          return {
            id: index + 1,
            title: recipe.title || `Recipe ${index + 1}`,
            description: recipe.description || "",
            searchQuery: recipe.searchQuery || "",
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(
              recipe.searchQuery || `${fishName} recipe`
            )}`,
            videoId: null,
            thumbnail: `https://via.placeholder.com/320x180?text=${encodeURIComponent(recipe.title || "Recipe")}`,
            thumbnailHQ: `https://via.placeholder.com/480x270?text=${encodeURIComponent(recipe.title || "Recipe")}`,
            thumbnailMax: `https://via.placeholder.com/1280x720?text=${encodeURIComponent(recipe.title || "Recipe")}`,
            channel: "Chef",
            duration: "00:00",
          };
        })
      );

      console.log(
        `✅ Generated ${videosWithThumbnails.length} recipes with thumbnails for ${fishName}`
      );
      return videosWithThumbnails;
    } catch (timeoutErr) {
      console.warn(
        `⏱️  Timeout/error generating recipes for ${fishName}:`,
        timeoutErr.message
      );
      return generateDefaultRecipesWithYouTube(fishName);
    }
  } catch (error) {
    console.error(
      `❌ Error generating recipes for ${fishName}:`,
      error.message
    );
    return generateDefaultRecipesWithYouTube(fishName);
  }
};

// Fallback function for default recipes with YouTube search
const generateDefaultRecipesWithYouTube = async (fishName) => {
  const defaultRecipes = [
    {
      searchQuery: `grilled ${fishName} recipe easy`,
      title: `Grilled ${fishName}`,
      description: `Simple grilled ${fishName} with herbs and lemon`,
    },
    {
      searchQuery: `crispy fried ${fishName} recipe`,
      title: `Crispy Fried ${fishName}`,
      description: `Traditional crispy fried ${fishName} with spices`,
    },
    {
      searchQuery: `baked ${fishName} recipe vegetables`,
      title: `Baked ${fishName} with Vegetables`,
      description: `Healthy baked ${fishName} with seasonal vegetables`,
    },
  ];

  const videosWithThumbnails = await Promise.all(
    defaultRecipes.map(async (recipe, index) => {
      try {
        console.log(`🎬 Searching YouTube for: "${recipe.searchQuery}"`);

        const videoResult = await ytSearch(recipe.searchQuery);

        if (videoResult.videos && videoResult.videos.length > 0) {
          const video = videoResult.videos[0];
          console.log(`✅ Found video: ${video.title} (${video.videoId})`);

          return {
            id: index + 1,
            title: recipe.title,
            description: recipe.description,
            searchQuery: recipe.searchQuery,
            url: video.url,
            videoId: video.videoId,
            thumbnail: video.thumbnail,
            thumbnailHQ: `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`,
            thumbnailMax: `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`,
            channel: video.author?.name || "Chef",
            duration: video.duration?.toString() || "00:00",
          };
        }
      } catch (err) {
        console.error(
          `❌ Error searching YouTube for "${recipe.searchQuery}":`,
          err.message
        );
      }

      // Return fallback with placeholder thumbnail
      return {
        id: index + 1,
        title: recipe.title,
        description: recipe.description,
        searchQuery: recipe.searchQuery,
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.searchQuery)}`,
        videoId: null,
        thumbnail: `https://via.placeholder.com/320x180?text=${encodeURIComponent(recipe.title)}`,
        thumbnailHQ: `https://via.placeholder.com/480x270?text=${encodeURIComponent(recipe.title)}`,
        thumbnailMax: `https://via.placeholder.com/1280x720?text=${encodeURIComponent(recipe.title)}`,
        channel: "Chef",
        duration: "00:00",
      };
    })
  );

  console.log(
    `📋 Using default recipes with YouTube thumbnails for ${fishName}`
  );
  return videosWithThumbnails;
};
