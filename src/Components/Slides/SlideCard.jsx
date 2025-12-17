// src/components/SlideCard.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";

const SlideCard = ({ slide, onChange }) => {
  const setField = (name, value) => onChange({ ...slide, [name]: value });

  // Handle both object {text, explanation} and string formats
  const setPoint = (i, field, value) => {
    const newPoints = Array.isArray(slide.points) ? [...slide.points] : [];
    
    if (typeof newPoints[i] === 'object' && newPoints[i] !== null) {
      // Update object format
      newPoints[i] = { ...newPoints[i], [field]: value };
    } else {
      // Convert to object format if it's a string
      if (field === 'text') {
        newPoints[i] = { text: value, explanation: '' };
      }
    }
    
    onChange({ ...slide, points: newPoints });
  };

  const addPoint = () => {
    const newPoints = Array.isArray(slide.points) ? [...slide.points] : [];
    
    // Add as object format for content slides, string for others
    if (slide.type === 'content') {
      newPoints.push({ text: '', explanation: '' });
    } else {
      newPoints.push('');
    }
    
    onChange({ ...slide, points: newPoints });
  };

  const removePoint = (i) => {
    const newPoints = (slide.points || []).filter((_, idx) => idx !== i);
    onChange({ ...slide, points: newPoints });
  };

  return (
    <div>
      <div className="mb-2 rounded-lg border bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm p-5 shadow-lg"
      style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <label className="block text-sm">Title</label>
        <input 
          value={slide.title || ""} 
          onChange={(e) => setField("title", e.target.value)} 
          className=" p-1 w-full px-4 py-2 rounded-lg bg-white/5 border-2 border-white/10 focus:border-purple-500 focus:bg-white/10 outline-none text-white placeholder-gray-500 transition-all" 
        />
      </div>

      {slide.type === "intro" && (
        <div className="mb-2">
          <label className="block text-sm">Intro paragraph</label>
          <textarea 
            value={slide.text || ""} 
            onChange={(e) => setField("text", e.target.value)} 
            className="p-1 w-full px-4 py-2 rounded-lg bg-white/5 border-2 border-white/10 focus:border-purple-500 focus:bg-white/10 outline-none text-white placeholder-gray-500 transition-all" 
            rows={4} 
          />
        </div>
      )}

      <div className="mb-2">
        <label className="block text-sm">
          {slide.type === 'content' ? 'Points (with explanations)' : 'Bullets'}
        </label>
        
        {(slide.points || []).map((p, i) => {
          // Check if it's an object with text/explanation
          const isObjectFormat = typeof p === 'object' && p !== null;
          
          if (isObjectFormat && slide.type === 'content') {
            return (
              <div key={i} className="border rounded p-2 mt-2">
                <div className="flex gap-2 mb-1">
                  <input 
                    value={p.text || ''} 
                    onChange={(e) => setPoint(i, 'text', e.target.value)} 
                    className="border p-1 rounded flex-1" 
                    placeholder="Main point"
                  />
                  <button 
                    onClick={() => removePoint(i)} 
                    className="px-2 rounded border text-sm"
                  >
                    <FaTimes />
                  </button>
                </div>
                <input 
                  value={p.explanation || ''} 
                  onChange={(e) => setPoint(i, 'explanation', e.target.value)} 
                  className="border p-1 rounded w-full" 
                  placeholder="Explanation"
                />
              </div>
            );
          } else {
            // String format
            return (
              <div key={i} className="flex gap-2 mt-1">
                <input 
                  value={typeof p === 'string' ? p : ''} 
                  onChange={(e) => {
                    const newPoints = [...(slide.points || [])];
                    newPoints[i] = e.target.value;
                    onChange({ ...slide, points: newPoints });
                  }} 
                  className="border p-1 rounded flex-1" 
                />
                <button 
                  onClick={() => removePoint(i)} 
                  className="px-2 rounded border text-sm"
                >
                  <FaTimes />
                </button>
              </div>
            );
          }
        })}
        
        <button 
          onClick={addPoint} 
          className="mt-2 text-sm text-red-600"
        >
          + Add {slide.type === 'content' ? 'point' : 'bullet'}
        </button>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <label className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={!!slide.needsImage} 
            onChange={(e) => setField("needsImage", e.target.checked)} 
          />
          <span className="text-sm">Needs image</span>
        </label>
      </div>

      <div className="mt-2">
        <label className="block text-sm">Image query</label>
        <input 
          value={slide.imageQuery || ""} 
          onChange={(e) => setField("imageQuery", e.target.value)} 
          className="border p-1 w-full rounded" 
          placeholder="e.g. cybersecurity kids illustration" 
        />
      </div>

      <div className="mt-2">
        {slide.imageUrl ? (
          <img 
            src={slide.imageUrl} 
            alt="slide" 
            style={{ width: "100%", maxHeight: 180, objectFit: "cover" }} 
          />
        ) : slide.needsImage ? (
          <div className="p-2 text-sm text-gray-500">
            No image yet. The server will try to fetch an image when generating PPT.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SlideCard;