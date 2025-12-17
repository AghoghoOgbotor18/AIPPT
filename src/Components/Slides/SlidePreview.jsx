// src/components/SlidePreview.jsx
import React from "react";

const SlidePreview = ({ slide, theme = "" }) => {
  // Convert theme color to CSS-usable format
  const getBackgroundColor = () => {
    if (!theme) return 'bg-white';
    
    const cleanTheme = theme.trim().toLowerCase();
    
    // If it's a hex code
    if (cleanTheme.match(/^#?[0-9a-f]{6}$/i)) {
      const hex = cleanTheme.replace('#', '');
      return `#${hex}`;
    }
    
    // If it's RGB
    if (cleanTheme.includes('rgb')) {
      return cleanTheme;
    }
    
    // If it's a color name, return it directly
    return cleanTheme;
  };

  const bgColor = getBackgroundColor();
  const useDynamicBg = theme && slide.type !== 'title';
  
  const bgStyle = slide.backgroundImage && slide.type === 'title'
    ? { backgroundImage: `url(${slide.backgroundImage})` }
    : useDynamicBg 
    ? { backgroundColor: bgColor }
    : {};

  // Check if slide has image
  const hasImage = slide.imageUrl && slide.type === 'content';

  // Helper function to render content points (only for content slides)
  const renderContentPoints = () => {
    if (slide.type !== 'content') return null;
    if (!Array.isArray(slide.points) || slide.points.length === 0) return null;

    return (
      <ul className="list-disc pl-5 space-y-2 text-sm  flex flex-col items-start text-start">
        {slide.points.map((pt, i) => {
          // Handle object format {text, explanation}
          if (typeof pt === 'object' && pt !== null) {
            return (
              <li key={i}>
                <strong className="font-semibold">{pt.text}:</strong>{' '}
                <span className="text-white/60">{pt.explanation}</span>
              </li>
            );
          }
          return <li key={i}>{pt}</li>;
        })}
      </ul>
    );
  };

  // For content slides without images or conclusion/intro slides - use centered layout
  const useCenteredLayout = (slide.type === 'conclusion') || 
                            (slide.type === 'intro') || 
                            (slide.type === 'content' && !hasImage);

  if (useCenteredLayout) {
    return (
      <div
        className={`
          flex flex-col justify-center items-center text-center p-8 min-h-[200px]
          ${slide.backgroundImage ? "bg-cover bg-center bg-no-repeat" : ""}
          
        `}
        style={bgStyle}
      >
        <h3 className="text-2xl font-bold mb-4">{slide.title}</h3>

        {/* Text paragraph for intro and conclusion */}
        {(slide.type === "intro" || slide.type === "conclusion") && slide.text && (
          <p className="text-sm leading-relaxed max-w-2xl">{slide.text}</p>
        )}

        {/* Points for content slides without images */}
        {slide.type === 'content' && renderContentPoints()}
      </div>
    );
  }
  if(slide.type === "title"){
    return(
      <div>
        <h3 className="text-xl text-center font-semibold my-2">{slide.title}</h3>
        {slide.imageUrl && (
          <div className="w-full">
            <img
              src={slide.imageUrl}
              alt="slide"
              className="w-full max-h-[140px] rounded-md object-cover"
            />
          </div>
        )}
      </div>
    )
  }
  if(slide.type === "thank-you"){
    return(
      <div className="flex justify-center items-center min-h-[200px]">
        <h3 className="text-xl text-center font-semibold my-2">{slide.title}</h3>
      </div>
    )
  }
  // Content slides with images
  return (
    <div>
      <h3 className="text-xl text-center font-semibold my-2">{slide.title}</h3>
      <div
        className={`
          flex gap-4 p-2 min-h-[160px] items-center
          ${slide.backgroundImage ? "bg-cover bg-center bg-no-repeat" : ""}
        
        `}
        style={bgStyle}
      >
        {/* Text Section */}
        <div className="flex-1">
          {renderContentPoints()}
        </div>

        {/* Image Section */}
        {slide.imageUrl && (
          <div className="w-[200px] flex-shrink-0">
            <img
              src={slide.imageUrl}
              alt="slide"
              className="w-full max-h-[140px] rounded-md object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SlidePreview;