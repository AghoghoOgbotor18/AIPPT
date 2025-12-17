import React, { useState } from 'react';
import { FaArrowDown, FaArrowLeft, FaArrowUp, FaRegFilePowerpoint } from 'react-icons/fa';
import SlideCard from './SlideCard';
import SlidePreview from './SlidePreview';
import api from "../../Api/Api";
import { useNavigate } from 'react-router-dom';
import Tooltip from '../ToolTip';

const SlidesEditor = ({ slidesJson, setSlidesJson }) => {
  const [generating, setGenerating] = useState(false);

  const navigate = useNavigate();

  // Update one slide
  const updateSlide = (index, newSlide) => {
    const copy = { ...slidesJson, slides: [...slidesJson.slides] };
    copy.slides[index] = newSlide;
    setSlidesJson(copy);
  };

  // Reorder slide cards
  const swapSlides = (i, j) => {
    if (i < 0 || j < 0 || i >= slidesJson.slides.length || j >= slidesJson.slides.length) return;

    const copy = { ...slidesJson, slides: [...slidesJson.slides] };
    const tmp = copy.slides[i];
    copy.slides[i] = copy.slides[j];
    copy.slides[j] = tmp;
    setSlidesJson(copy);
  };

  //scroll to top
  const ScrollToTop = () => {
    window.scrollTo({top: 0, behavior:"smooth"})
  }

  // Generate PPT and show PDF preview with download button
  const generatePPT = async () => {
    try {
      setGenerating(true);

      const res = await api.post(
        "/generate-ppt-from-json",
        slidesJson
      );

      if (!res.data?.pptxFile) {
        alert("No PPT returned from server.");
        setGenerating(false);
        return;
      }

      const pptxBase64 = res.data.pptxFile;
      const pdfBase64 = res.data.pdfFile;

      // Convert PPTX base64 to blob URL
      const pptxByteCharacters = atob(pptxBase64);
      const pptxByteNumbers = Array.from(pptxByteCharacters, char => char.charCodeAt(0));
      const pptxByteArray = new Uint8Array(pptxByteNumbers);
      const pptxBlob = new Blob([pptxByteArray], {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      });
      const pptxBlobUrl = URL.createObjectURL(pptxBlob);

      // Convert PDF base64 to blob URL
      let pdfBlobUrl = '';
      if (pdfBase64) {
        const pdfByteCharacters = atob(pdfBase64);
        const pdfByteNumbers = Array.from(pdfByteCharacters, char => char.charCodeAt(0));
        const pdfByteArray = new Uint8Array(pdfByteNumbers);
        const pdfBlob = new Blob([pdfByteArray], { type: "application/pdf" });
        pdfBlobUrl = URL.createObjectURL(pdfBlob);
      }

      // NOW open the window after we have all the data ready
      const newWindow = window.open("", "_blank");
      
      // Check if popup was blocked
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        alert("Popup blocked! Please allow popups for this site and try again.");
        setGenerating(false);
        return;
      }
      //cleanup when window closes
      newWindow.onbeforeunload = () => {
        if (pptxBlobUrl) URL.revokeObjectURL(pptxBlobUrl);
        if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
      };
      //cleanup when user navigates away or component unmounts
      window.addEventListener("beforeunload", () => {
        if (pptxBlobUrl) URL.revokeObjectURL(pptxBlobUrl);
        if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
      });

      newWindow.document.write(`
        <!DOCTYPE html>
          <head>
            <title>PowerPoint Preview</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                background: rgba(255, 255, 255, 0.1);
                display: flex;
                flex-direction: column;
                height: 100vh;
                overflow: hidden;
              }
              .header {
                background: #0a0c16;
                padding: 16px 32px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
                z-index: 10;
                flex-shrink: 0;
              }
              .header h1 {
                font-size: 20px;
                color: #fff;
                font-weight: 600;
              }
              .download-btn {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 12px 20px;
                background: linear-gradient(to right, #622ba4, #b856ca);
                color: white;
                text-decoration: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                transition: background 0.2s;
                border: none;
                cursor: pointer;
              }
              .download-btn:hover {
                background: linear-gradient(to right, #b856ca, #622ba4);
              }
              .download-btn svg {
                width: 18px;
                height: 18px;
              }
              .preview-container {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0;
                overflow: hidden;
                background: rgba(255, 255, 255, 0.1);
                position: relative;
              }
              .pdf-embed {
                width: 100%;
                height: 100%;
                border: none;
                display: block;
                background: transparent;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
              }
              .no-preview {
                text-align: center;
                color: #9ca3af;
                padding: 40px;
              }
              .no-preview h2 {
                font-size: 20px;
                margin-bottom: 10px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1> Your PowerPoint is Ready</h1>
              <a href="${pptxBlobUrl}" download="presentation.pptx" class="download-btn">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PowerPoint
              </a>
            </div>
            
            <div class="preview-container">
              ${pdfBlobUrl ? 
                `<embed src="${pdfBlobUrl}#toolbar=0&navpanes=0&scrollbar=0&view=Fit" type="application/pdf" class="pdf-embed" />` :
                `<div class="no-preview">
                  <h2>Preview not available</h2>
                  <p>Click the download button above to get your PowerPoint file</p>
                </div>`
              }
            </div>
          </body>
        </html>
      `);

      newWindow.document.close();

      setGenerating(false);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PPT: " + (err.response?.data?.message || err.message));
      setGenerating(false);
    }
  };

  return (
    <div className="w-full">
      <button 
        onClick={() => navigate("/workspace")} 
        className='flex items-center gap-2 text-sm -mt-4 mb-5 mx-2 hover:text-white/90 cursor-pointer'
      >
        <FaArrowLeft />
        Back to WorkSpace
      </button>
      
      <div className="container mx-auto p-4">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT: Editable Slides */}
          <div>
            <h3 className="text-xl font-bold mb-4">Edit Slides</h3>

            <div className="space-y-4">
              {slidesJson.slides.map((slide, index) => (
                <div 
                  key={index}
                  className="rounded-lg border bg-linear-to-br from-white/10 to-white/5 backdrop-blur-2xl p-5 shadow-lg"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <strong className="text-lg w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:bg-white/10 outline-none text-white placeholder-gray-500 transition-all">
                      Slide {index + 1} — {slide.type}
                    </strong>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => swapSlides(index, index - 1)}
                        disabled={index === 0}
                        className="p-2 rounded text-purple-500 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <FaArrowUp size={16} />
                      </button>
                      <button
                        onClick={() => swapSlides(index, index + 1)}
                        disabled={index === slidesJson.slides.length - 1}
                        className="p-2 rounded text-purple-500 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <FaArrowDown size={16} />
                      </button>
                    </div>
                  </div>

                  <SlideCard 
                    slide={slide}
                    onChange={(newSlide) => updateSlide(index, newSlide)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Live Preview */}
          <div>
            <h3 className="text-xl font-bold mb-4">Live Preview</h3>

            <div className="space-y-4">
              {slidesJson.slides.map((slide, index) => (
                <div 
                  key={index}
                  className="rounded border border-white/10 shadow-sm overflow-hidden"
                >
                  <div className="bg-white/5 px-3 py-2 text-sm font-medium">
                    Slide {index + 1}
                  </div>

                  <SlidePreview 
                    slide={slide}
                    theme={slidesJson.meta?.theme || ""}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Generate Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={generatePPT}
            disabled={generating}
            className="btn py-3 px-6 text-lg font-bold rounded-lg flex items-center gap-2 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Preview Ppt
            <FaRegFilePowerpoint />
          </button>
        </div>
        {/* Back to Top tooltip*/}
        <Tooltip text="Back to top">
          <button className='fixed right-0 top-[50%] z-50 bg-white/5 px-4 py-4 rounded-full shadow-md animate-pulse' onClick={ScrollToTop}>
            <FaArrowUp />
          </button>
        </Tooltip>
        
        {generating && (
          <div className='fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50'>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center gap-4"> 
              <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white font-medium">Generating your presentation...</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SlidesEditor;