import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import PptxGenJS from "pptxgenjs";
import { chromium } from "playwright";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

// Helper function to convert color name/RGB to hex
function convertToHex(color) {
  if (!color) return "FFFFFF";
  
  const cleanColor = color.trim().toLowerCase();
  
  if (cleanColor.match(/^#?[0-9a-f]{6}$/i)) {
    return cleanColor.replace('#', '').toUpperCase();
  }
  
  const rgbMatch = cleanColor.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]);
    const g = parseInt(rgbMatch[2]);
    const b = parseInt(rgbMatch[3]);
    return ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0').toUpperCase();
  }
  
  const colorNames = {
    'red': 'FF0000', 'blue': '0000FF', 'green': '00FF00', 'yellow': 'FFFF00',
    'orange': 'FFA500', 'purple': '800080', 'pink': 'FFC0CB', 'brown': 'A52A2A',
    'black': '000000', 'white': 'FFFFFF', 'gray': '808080', 'grey': '808080',
    'cyan': '00FFFF', 'magenta': 'FF00FF', 'lime': '00FF00', 'navy': '000080',
    'teal': '008080', 'olive': '808000', 'maroon': '800000', 'aqua': '00FFFF',
    'silver': 'C0C0C0', 'gold': 'FFD700', 'indigo': '4B0082', 'violet': 'EE82EE',
    'turquoise': '40E0D0', 'beige': 'F5F5DC', 'coral': 'FF7F50', 'crimson': 'DC143C',
    'khaki': 'F0E68C', 'lavender': 'E6E6FA', 'salmon': 'FA8072', 'tan': 'D2B48C'
  };
  
  if (colorNames[cleanColor]) {
    return colorNames[cleanColor];
  }
  
  return "FFFFFF";
}

// NEW: Calculate contrasting text color based on background
function getContrastingTextColor(bgHex) {
  // Convert hex to RGB
  const r = parseInt(bgHex.substring(0, 2), 16);
  const g = parseInt(bgHex.substring(2, 4), 16);
  const b = parseInt(bgHex.substring(4, 6), 16);
  
  // Calculate luminance (perceived brightness)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // If background is dark, use white text. If light, use black text
  return luminance > 0.5 ? '000000' : 'FFFFFF';
}

// NEW: Get accent color based on slide style
function getAccentColor(slideStyle, bgHex) {
  const styleColors = {
    corporate: '003366', // Dark blue
    professional: '2C3E50', // Dark slate
    playful: 'FF6B6B', // Coral red
    creative: '9B59B6', // Purple
    minimalist: '34495E' // Charcoal
  };
  
  // If background is similar to accent, return contrasting color
  return styleColors[slideStyle] || 'EF4444';
}

//Get layout configuration based on slide style
function getLayoutConfig(slideStyle) {
  const layouts = {
    corporate: {
      titleAlign: 'left',
      titleY: 0.5,
      contentAlign: 'left',
      bulletStyle: true,
      imagePosition: 'right',
      headerBar: true
    },
    professional: {
      titleAlign: 'center',
      titleY: 0.8,
      contentAlign: 'left',
      bulletStyle: true,
      imagePosition: 'right',
      headerBar: false
    },
    creative: {
      titleAlign: 'left',
      titleY: 1.2,
      contentAlign: 'left',
      bulletStyle: true,
      imagePosition: 'right', 
      headerBar: true
    },
    minimalist: {
      titleAlign: 'left',
      titleY: 0.8,
      contentAlign: 'left',
      bulletStyle: false,
      imagePosition: 'none',
      headerBar: false
    }
  };
  
  return layouts[slideStyle] || layouts.professional;
}

// Helper function to fetch image from Unsplash
async function fetchUnsplashImage(query) {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: query,
        per_page: 1,
        orientation: "landscape"
      },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0].urls.regular;
    }
    return null;
  } catch (error) {
    console.error("Unsplash fetch error:", error.message);
    return null;
  }
}

// Helper function to convert image URL to base64
async function imageUrlToBase64(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error("Image conversion error:", error.message);
    return null;
  }
}

// Generate slides endpoint
app.post("/api/generate-slides", async (req, res) => {
  try {
    const { 
      topic, slideCount, theme, presenterName, extraNote,
      titleFontSize = 48, textFontSize = 18, 
      fontStyle = "Arial", slideStyle = "professional"
    } = req.body;

    const prompt = `
You are an AI that generates professional PowerPoint slides.

Topic: "${topic}"
Total slides needed: ${slideCount}
Theme color: ${theme}
Presenter name: ${presenterName || "Presenter"}
Slide style: ${slideStyle}
Extra notes: ${extraNote || "none"}

Generate a JSON object with this EXACT structure:
{
  "slides": [
    {
      "type": "title",
      "title": "Main Title",
      "presenterName": "Name",
      "needsImage": true,
      "imageQuery": "search term for background"
    },
    {
      "type": "intro",
      "title": "Introduction",
      "text": "intro paragraph (2-3 sentences)",
      "points": []
    },
    {
      "type": "content",
      "title": "Section Title",
      "points": [
        { "text": "Main point", "explanation": "Detailed explanation (2-3 sentences)" },
        { "text": "Another point", "explanation": "Comprehensive explanation (2-3 sentences)" }
      ],
      "needsImage": true,
      "imageQuery": "relevant search term"
    },
    {
      "type": "conclusion",
      "title": "Conclusion",
      "text": "Comprehensive concluding paragraph (3-4 sentences)",
      "points": []
    },
    {
      "type": "thank-you",
      "title": "Thank You"
    }
  ]
}

Style Guidelines for "${slideStyle}":
${slideStyle === 'corporate' ? '- Use formal, business-appropriate language\n- Focus on data and metrics' : ''}
${slideStyle === 'creative' ? '- Use vivid, descriptive language\n- Include metaphors and storytelling' : ''}
${slideStyle === 'minimalist' ? '- Use concise, clear language\n- Fewer points, more impact' : ''}
${slideStyle === 'professional' ? '- Use balanced, authoritative language\n- Mix data with insights' : ''}

Rules:
1. First slide: type "title" with topic and presenter name
2. Second slide: type "intro" with introduction text (2-3 sentences)
3. Middle slides: type "content" with bullet points
4. Second to last: type "conclusion" with paragraph text
5. Last slide: type "thank-you"
6. Return ONLY the JSON object
7. Some content slides should have needsImage=true
8. ALWAYS include conclusion before thank-you
`;

    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { 
            role: "system", 
            content: "You are a presentation expert that generates ONLY valid JSON. Never include markdown or explanations." 
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let slidesData = openaiResponse.data.choices[0].message.content.trim();
    slidesData = slidesData.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    const jsonMatch = slidesData.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      slidesData = jsonMatch[0];
    }
    
    let parsedData;
    try {
      parsedData = JSON.parse(slidesData);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError.message);
      throw new Error("Invalid JSON response from AI. Please try again.");
    }

    const slides = parsedData.slides || parsedData;

    // Fetch images from Unsplash for slides that need them
    for (let slide of slides) {
      if (slide.needsImage && slide.imageQuery) {
        const imageUrl = await fetchUnsplashImage(slide.imageQuery);
        if (imageUrl) {
          slide.imageUrl = imageUrl;
        }
      }
    }

    return res.json({
      success: true,
      meta: {
        topic,
        theme: theme,
        presenterName,
        slideCount,
        titleFontSize,
        textFontSize,
        fontStyle,
        slideStyle
      },
      slides: slides
    });

  } catch (error) {
    console.error("Generate slides error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Error generating slides",
      error: error.message
    });
  }
});


// Generate PPT from JSON endpoint
app.post("/api/generate-ppt-from-json", async (req, res) => {
  try {
    const slidesJson = req.body;
    const theme = slidesJson.meta?.theme || "white";
    const titleFontSize = slidesJson.meta?.titleFontSize || 48;
    const textFontSize = slidesJson.meta?.textFontSize || 18;
    const fontStyle = slidesJson.meta?.fontStyle || "Arial";
    const slideStyle = slidesJson.meta?.slideStyle || "professional";

    const ppt = new PptxGenJS();
    
    ppt.author = slidesJson.meta?.presenterName || "AI PPT Generator";
    ppt.title = slidesJson.meta?.topic || "Presentation";

    // Calculate colors
    const bgColor = convertToHex(theme);
    const textColor = getContrastingTextColor(bgColor);
    const accentColor = getAccentColor(slideStyle, bgColor);
    
    // Get layout configuration
    const layout = getLayoutConfig(slideStyle);

    // pre-fetch all images before generating
    const imageCache = {};
    let creativeImageOnRight = true; // toggle for creative content slides
    for (const slide of slidesJson.slides) {
      if (slide.imageUrl) {
        try {
          const base64Image = await imageUrlToBase64(slide.imageUrl);
          if (base64Image) {
            imageCache[slide.imageUrl] = base64Image;
          }
        } catch (err) {
          console.error("Error pre-fetching image:", slide.imageUrl, err.message);
        }
      }
    }

    for (const slide of slidesJson.slides) {
      const s = ppt.addSlide();
      s.background = { color: bgColor };

      if (slide.type === "title") {
        // Title slide with full background image
        if (slide.imageUrl && imageCache[slide.imageUrl]) {
          s.addImage({
            data: imageCache[slide.imageUrl],
            x: 0, y: 0, w: "100%", h: "100%",
            sizing: { type: "cover" }
          });

          s.addShape(ppt.ShapeType.rect, {
            x: 0, y: 0, w: "100%", h: "100%",
            fill: { color: "000000", transparency: 60 }
          });
        }

        // Title styling based on slide style
        const titleY = 1.5;
        s.addText(slide.title || "", {
          x: 0.5, y: titleY, w: 9, h: 2,
          fontSize: titleFontSize + 12, bold: true, color: "FFFFFF",
          align: "center", fontFace: fontStyle
        });

        if (slide.presenterName) {
          s.addText(`Presenter: ${slide.presenterName}`, {
            x: 0.5, y: titleY + 1.8, w: 9, h: 0.7,
            fontSize: textFontSize + 10, color: "FFFFFF",
            align: "center", fontFace: fontStyle
          });
        }

      } else if (slide.type === "intro") {
        // Add header bar for corporate style
        if (layout.headerBar) {
          s.addShape(ppt.ShapeType.rect, {
            x: 0, y: 0, w: "100%", h: 0.9,
            fill: { color: accentColor }
          });
        }

        s.addText(slide.title || "", {
          x: 0.5, y: layout.headerBar ? 0.15 : 0.5,
          w: 9, h: 0.6,
          fontSize: titleFontSize - 10, bold: true,
          color: layout.headerBar ? "FFFFFF" : accentColor,
          fontFace: fontStyle
        });

        if (slide.text) {
          s.addText(slide.text, {
            x: 0.5, y: layout.headerBar ? 1.2 : 1.3,
            w: 9, h: 3.8,
            fontSize: textFontSize, color: textColor,
            valign: "top", fontFace: fontStyle,
            align: layout.contentAlign,
            lineSpacing:20
          });
        }

      } else if (slide.type === "content") {
        const hasImage = slide.imageUrl && imageCache[slide.imageUrl] && layout.imagePosition !== 'none';

        // Add header bar for corporate style
        if (layout.headerBar) {
          s.addShape(ppt.ShapeType.rect, {
            x: 0, y: 0, w: "100%", h: 0.9,
            fill: { color: accentColor }
          });
        }

        //creative slide styling
        if (
          slideStyle === "creative" &&
          hasImage &&
          layout.imagePosition === "right"
        ) {
          const imageOnRight = creativeImageOnRight;
          creativeImageOnRight = !creativeImageOnRight; // flip for next image slide

          // Header bar
          s.addShape(ppt.ShapeType.rect, {
            x: 0,
            y: 0,
            w: "100%",
            h: 0.9,
            fill: { color: accentColor }
          });

          // LEFT / RIGHT panel logic
          const textX = imageOnRight ? 0 : 3.5;
          const imageX = imageOnRight ? 6.5 : 0;

          // Text background panel (below header)
          s.addShape(ppt.ShapeType.rect, {
            x: textX,
            y: 0.9,
            w: 6.5,
            h: 5.3,
            fill: { color: bgColor }
          });

          // Title
          s.addText(slide.title || "", {
            x: 0.5,
            y: 0.15,
            w: 9,
            h: 0.6,
            fontSize: titleFontSize - 12,
            bold: true,
            color: "FFFFFF",
            fontFace: fontStyle,
            align: "left"
          });

          // Bullet points
          if (Array.isArray(slide.points) && slide.points.length > 0) {
            const bulletItems = slide.points.map(pt => ({
              text: `${pt.text}: ${pt.explanation}`,
              options: {
                bullet: { indent: 10 },
                indentLevel: 0
              }
            }));

            s.addText(bulletItems, {
              x: textX + 0.5,
              y: 1.3,
              w: 5.5,
              h: 4.3,
              fontSize: textFontSize - 2,
              color: textColor,
              valign: "top",
              fontFace: fontStyle,
              lineSpacing: 20,
              margin: 0.3
            });
          }

          // Image (full height below header)
          s.addImage({
            data: imageCache[slide.imageUrl],
            x: imageX,
            y: 0.9,
            w: 3.5,
            h: 5.3,
            sizing: { type: "cover" }
          });

          continue; 
        }



        if (hasImage && layout.imagePosition === 'right') {
          // Layout with image on right
          s.addText(slide.title || "", {
            x: 0.5, y: layout.headerBar ? 0.12 : 0.4,
            w: 9, h: 0.6,
            fontSize: titleFontSize - 12, bold: true,
            color: layout.headerBar ? "FFFFFF" : accentColor,
            fontFace: fontStyle,
            align: layout.titleAlign
          });

          if (Array.isArray(slide.points) && slide.points.length > 0) {
            const bulletItems = slide.points.map((pt, idx) => ({
              text: `${pt.text}: ${pt.explanation}`,
              options: { 
                bullet: layout.bulletStyle ? { indent: 10 }
                : { type: 'number', indent: 10 },
                indentLevel: 0
              }
          }));

            s.addText(bulletItems, {
              x: 0.5,
              y: layout.headerBar ? 1.3 : 1.2,
              w: 5.5, h: 4.3,
              fontSize: textFontSize - 2,
              color: textColor,
              valign: "top",
              fontFace: fontStyle,
              lineSpacing: 20,
              margin: 0.3
            });
          }

          // Add image from cache
          s.addImage({
            data: imageCache[slide.imageUrl],
            x: 6.5, y: 1.1, w: 3, h: 3.5,
            sizing: { type: "contain", w: 3, h: 3 }
          });

        } else {
          // No image or minimalist: centered layout
          s.addText(slide.title || "", {
            x: 0.5, y: layout.headerBar ? 0.12 : 0.4,
            w: 9, h: 0.6,
            fontSize: titleFontSize - 12, bold: true,
            color: layout.headerBar ? "FFFFFF" : accentColor,
            fontFace: fontStyle,
            align: layout.titleAlign
          });

          if (Array.isArray(slide.points) && slide.points.length > 0) {
            const bulletItems = slide.points.map((pt, idx) => ({
              text: slideStyle === 'minimalist'
                ? `${pt.text}: ${pt.explanation}`
                : `${pt.text}: ${pt.explanation}`,
              options: { 
                bullet: layout.bulletStyle ? { indent: 10 }
                  : { type: 'number', indent: 10 },
                indentLevel: 0
              }
            }));

            s.addText(bulletItems, {
              x: 0.5,
              y: layout.headerBar ? 1.3 : 1.2,
              w: 9, h: 4.3,
              fontSize: textFontSize - 2,
              color: textColor,
              valign: "top",
              fontFace: fontStyle,
              lineSpacing: 20,
              margin: 0.3
            });
          }
        }

      } else if (slide.type === "conclusion") {

        // Add header bar for corporate style
        if (layout.headerBar) {
          s.addShape(ppt.ShapeType.rect, {
            x: 0, y: 0, w: "100%", h: 0.9,
            fill: { color: accentColor }
          });
        }

        s.addText(slide.title || "Conclusion", {
          x: 0.5, y: layout.headerBar ? 0.15 : 0.5,
          w: 9, h: 0.6,
          fontSize: titleFontSize - 10, bold: true,
          color: layout.headerBar ? "FFFFFF" : accentColor,
          fontFace: fontStyle
        });

        if (slide.text) {
          s.addText(slide.text, {
            x: 0.5, y: layout.headerBar ? 1.2 : 1.3,
            w: 9, h: 3.8,
            fontSize: textFontSize, color: textColor,
            valign: "top", fontFace: fontStyle,
            align: layout.contentAlign,
            lineSpacing:20
          });
        }

      } else if (slide.type === "thank-you") {
        s.addText(slide.title || "Thank You", {
          x: 0.5, y: 2.2, w: 9, h: 1.5,
          fontSize: titleFontSize + 8, bold: true,
          color: accentColor,
          align: "center", valign: "middle",
          fontFace: fontStyle
        });
      }
    }

    const pptBase64 = await ppt.write("base64");
    const pdfBase64 = await generatePdfPreview(slidesJson, bgColor, textColor, accentColor, layout, fontStyle, titleFontSize, textFontSize);

    return res.json({
      success: true,
      pptxFile: pptBase64,
      pdfFile: pdfBase64
    });

  } catch (err) {
    console.error("PPT generation error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to generate PPT",
      error: err.message
    });
  }
});

// Helper to generate PDF preview
async function generatePdfPreview(slidesJson, bgColor, textColor, accentColor, layout, fontStyle, titleFontSize, textFontSize) {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    let htmlContent = `
      <html>
        <head>
          <style>
            body { width: 100%; height: 100%; margin: 0; padding: 0; font-family: ${fontStyle}, Arial, sans-serif; }
            .slide { 
              width: 100%; 
              height: 100vh; 
              page-break-after: always; 
              display: flex;
              flex-direction: column;
              padding: 40px;
              box-sizing: border-box;
              position: relative;
            }
            .slide h1 { font-size: ${titleFontSize}px; margin: 0 0 20px 0; color: #${accentColor}; }
            .slide h2 { font-size: ${titleFontSize - 12}px; margin: 0 0 15px 0; color: #${accentColor}; }
            .slide p { font-size: ${textFontSize}px; line-height: 1.6; color: #${textColor}; }
            .slide ul { font-size: ${textFontSize - 2}px; line-height: 1.8; color: #${textColor}; margin-top: 10px; }
            .slide li { margin-bottom: 15px; }
            .slide-title { 
              display: flex;  
              justify-content:flex-start; 
              height: 100%; 
              text-align: center;
              background-size: cover;
              background-position: center;
            }
            .slide-title::before {
              content: '';
              position: absolute;
              top: 0; left: 0; right: 0; bottom: 0;
              background: rgba(0,0,0,0.4);
            }
            .slide-title-content { position: relative; z-index: 1; color: white;}
          </style>
        </head>
        <body>
    `;

    for (const slide of slidesJson.slides) {
      if (slide.type === "title") {
        const bgStyle = slide.imageUrl ? `background-image: url('${slide.imageUrl}');` : '';
        htmlContent += `
          <div class="slide slide-title" style="${bgStyle} display:flex; justify-content: center; align-items:center">
            <div class="slide-title-content">
              <h1 style="color: white; font-size: ${titleFontSize + 12}px;">${slide.title || ''}</h1>
              <p style="color: white; font-size: ${textFontSize + 10}px;">Presenter: ${slide.presenterName || ''}</p>
            </div>
          </div>
        `;
      } else if (slide.type === "intro") {
        htmlContent += `
          <div class="slide" style="background: #${bgColor};">
            <div style="display:flex; flex-direction:column; gap:10px; justify-content: flex-start; height: 100%">
              <h2>${slide.title || ''}</h2>
              <p>${slide.text || ''}</p>
            </div>
          </div>
        `;
      } else if (slide.type === "content") {
        const pointsHtml = Array.isArray(slide.points) 
          ? slide.points.map(pt => `<li style="width: 100%; margin-top:10px;"><strong>${pt.text}:</strong> ${pt.explanation}</li>`).join('')
          : '';
        const imgHtml = slide.imageUrl 
          ? `<img src="${slide.imageUrl}" style="max-width: 300px; max-height: 300px; position: absolute; right: 40px; top: 110px;" />`
          : '';
        
        htmlContent += `
          <div class="slide" style="background: #${bgColor}; height: 100vh">
            <h2>${slide.title || ''}</h2>
            <div style="display:flex; align-items: flex-start; gap: 5px;">
              <ul>${pointsHtml}</ul>
              ${imgHtml}
            </div>
          </div>
        `;
      } else if (slide.type === "conclusion") {
        htmlContent += `
          <div class="slide" style="background: #${bgColor}; display: flex; flex-direction: column; justify-content: flex-start; height: 100vh">
            <h2>${slide.title || 'Conclusion'}</h2>
            <p style="max-width: 100%;">${slide.text || ''}</p>
          </div>
        `;
      } else if (slide.type === "thank-you") {
        htmlContent += `
          <div class="slide" style="background: #${bgColor}; display: flex; align-items: center; justify-content: center; height: 100vh">
            <h1 style="font-size: ${titleFontSize + 8}px;">${slide.title || 'Thank You'}</h1>
          </div>
        `;
      }
    }

    htmlContent += `</body></html>`;

    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ 
      format: 'A4', 
      landscape: true,
      printBackground: true 
    });
    
    await browser.close();

    return pdfBuffer.toString('base64');
  } catch (error) {
    console.error("PDF preview generation error:", error);
    return null;
  }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
