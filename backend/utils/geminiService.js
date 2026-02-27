import { GoogleGenerativeAI } from "@google/generative-ai";
import ytSearch from "yt-search";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateRecipeVideos = async (fishName) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("⚠️  GEMINI_API_KEY not found in environment variables");
      return generateDefaultRecipesWithYouTube(fishName);
    }

    console.log(`🔍 Searching top 3 recipes for: ${fishName}`);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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

    // Set a timeout for the Gemini API call (15 seconds)
    const timeoutId = setTimeout(() => {
      throw new Error("Timeout");
    }, 15000);

    try {
      const result = await model.generateContent(prompt);
      clearTimeout(timeoutId);
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
            console.error(`❌ Error searching YouTube for "${recipe.searchQuery}":`, err.message);
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

      console.log(`✅ Generated ${videosWithThumbnails.length} recipes with thumbnails for ${fishName}`);
      return videosWithThumbnails;
    } catch (timeoutErr) {
      clearTimeout(timeoutId);
      console.warn(`⏱️  Timeout generating recipes for ${fishName}`);
      return generateDefaultRecipesWithYouTube(fishName);
    }
  } catch (error) {
    console.error(`❌ Error generating recipes for ${fishName}:`, error.message);
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
    }
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
        console.error(`❌ Error searching YouTube for "${recipe.searchQuery}":`, err.message);
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

  console.log(`📋 Using default recipes with YouTube thumbnails for ${fishName}`);
  return videosWithThumbnails;
};
