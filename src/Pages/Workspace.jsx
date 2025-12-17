import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api/Api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaRocket, 
  FaPalette, 
  FaFont, 
  FaMagic,
  FaChevronRight,
  FaStar,
  FaCheckCircle,
  FaBolt,
  FaRegDotCircle,
  FaBriefcase,
  FaArrowLeft
} from 'react-icons/fa';
import { HiChartBar } from "react-icons/hi";
import { PiSparkleFill } from "react-icons/pi";

const Workspace = ({ setIsLoggedIn }) => {
  const [topic, setTopic] = useState("");
  const [presenterName, setPresenterName] = useState("");
  const [slideCount, setSlideCount] = useState(6);
  const [theme, setTheme] = useState("");
  const [extraNote, setExtraNote] = useState("");
  const [titleFontSize, setTitleFontSize] = useState(48);
  const [textFontSize, setTextFontSize] = useState(18);
  const [fontStyle, setFontStyle] = useState("Arial");
  const [slideStyle, setSlideStyle] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [slidesJson, setSlidesJson] = useState(null);
  const [error, setError] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePreview = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }
    setError("");
    setLoading(true);
    
    try {
      const res = await api.post("/generate-slides", {
        topic,
        presenterName,
        slideCount,
        theme,
        extraNote,
        titleFontSize,
        textFontSize,
        fontStyle,
        slideStyle
      });
      
      setSlidesJson(res.data);
      navigate("/slideReview", { state: { slides: res.data } });
      
      setTimeout(() => {
        window.scrollTo({ top: 600, behavior: "smooth" });
      }, 100);
      
    } catch (err) {
      console.error("Preview error:", err);
      setError(err.response?.data?.message || "Failed to generate slides. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  //user initials when logged in
  const userInitial = presenterName ? presenterName.charAt(0).toUpperCase() : "U";

  //handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  //set scrollToTop for the form button
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [currentStep]);

  const slideStyles = [
    {
      value: 'corporate',
      label: 'Corporate',
      desc: 'Professional & Business-Ready',
      color: 'from-blue-500 to-blue-600',
      icon: <FaBriefcase className="text-4xl text-blue-500" />
    },
    {
      value: 'professional',
      label: 'Professional',
      desc: 'Balanced & Authoritative',
      color: 'from-gray-500 to-gray-600',
      icon: <HiChartBar className="text-4xl text-gray-400" />
    },
    { 
      value: 'playful', 
      label: 'Playful', 
      desc: 'Fun & Engaging', 
      color: 'from-pink-500 to-pink-600', 
      icon: <FaPalette className="text-4xl text-pink-500" />
    },
    {
      value: 'creative',
      label: 'Creative',
      desc: 'Bold & Imaginative',
      color: 'from-purple-500 to-purple-600',
      icon: <PiSparkleFill className="text-4xl text-purple-500" />
    },
    {
      value: 'minimalist',
      label: 'Minimalist',
      desc: 'Clean & Simple',
      color: 'from-slate-600 to-slate-800',
      icon: <FaRegDotCircle className="text-4xl text-slate-300" />
    }

  ];

  //Add motion animations
  const stepVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };


  return (
    <div className="min-h-screen bg-[#0a0c18] text-white">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-white font-medium">Creating your presentation...</p>
          </div>
        </div>
      )}

      {/* Workspace Header */}
      <header className="fixed top-0 w-full backdrop-blur-md border-b border-white/10 z-40">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg bg-linear-to-r from-[#b856ca] to-[#622ba4]">
              <FaRocket className="text-white text-xl" />
            </div>
            <h1 className="font-bold text-2xl text-white">
              AI<span className="text-[#8f43eb]">PPT</span>
            </h1>
          </div>

          <div className="relative">
            <button
              className="w-10 h-10 rounded-full cursor-pointer text-white flex justify-center items-center font-bold shadow-lg hover:shadow-xl hover:scale-105 transition"
              style={{ background: 'linear-gradient(to right, #b856ca, #622ba4)' }}
              onClick={() => setShowMenu(!showMenu)}
            >
              {userInitial}
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
                <button
                  className="w-full text-left px-4 py-3 hover:bg-white/10 transition text-white font-medium"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          
          {/* Hero Section */}
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: 'linear-gradient(to right, rgba(159, 68, 216, 0.2), rgba(49, 23, 88, 0.1))' }}>
              <FaStar className="text-yellow-500" />
              <span>Step {currentStep} of 3</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Create Your <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #622ba4, #c65bd6)' }}>Presentation</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Fill in the details below and watch AI transform your ideas into stunning slides
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-linear-to-t from-purple-500/10 via-purple-500/5 to-transparent backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Progress Bar */}
            <div className="h-2 bg-white/5">
              <div 
                className="h-full transition-all duration-500"
                style={{ 
                  width: `${(currentStep / 3) * 100}%`,
                  background: 'linear-gradient(to right, #b856ca, #622ba4)'
                }}
              ></div>
            </div>

            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-8"
                >


                  {/* Step 1: Basic Info */}
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shadow-lg" style={{ background: 'linear-gradient(to right, #b856ca, #622ba4)' }}>
                          1
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">Basic Information</h3>
                      </div>

                      {/* Topic */}
                      <div className="group">
                        <label className="block text-sm font-semibold mb-2 text-gray-300">
                          Presentation Topic *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., Digital Marketing Strategy 2024"
                            className="w-full p-4 pl-12 rounded-xl bg-white/5 border-2 border-white/10 outline-none transition text-lg text-white placeholder-gray-500"
                            style={{ 
                              borderColor: 'rgba(255, 255, 255, 0.1)',
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#8f43eb';
                              e.target.style.boxShadow = '0 0 0 4px rgba(143, 67, 235, 0.2)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                          <FaRocket className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition" />
                        </div>
                      </div>

                      {/* Presenter */}
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-300">
                          Presenter Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={presenterName}
                          onChange={(e) => setPresenterName(e.target.value)}
                          placeholder="Your name"
                          className="w-full p-4 rounded-xl bg-white/5 border-2 border-white/10 outline-none transition text-white placeholder-gray-500"
                          onFocus={(e) => {
                            e.target.style.borderColor = '#8f43eb';
                            e.target.style.boxShadow = '0 0 0 4px rgba(143, 67, 235, 0.2)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </div>

                      {/* Slide Count and Theme */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-300">
                            Number of Slides
                          </label>
                          <select
                            value={slideCount}
                            onChange={(e) => setSlideCount(Number(e.target.value))}
                            className="w-full p-4 rounded-xl bg-white/5 border-2 border-white/10 outline-none transition cursor-pointer text-white"
                            onFocus={(e) => {
                              e.target.style.borderColor = '#8f43eb';
                              e.target.style.boxShadow = '0 0 0 4px rgba(143, 67, 235, 0.2)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            {[4,6,8,10,12,15,20].map(num => (
                              <option key={num} value={num} style={{ backgroundColor: '#0a0c18' }}>{num} slides</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-300">
                            Background Color
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={theme}
                              onChange={(e) => setTheme(e.target.value)}
                              placeholder="white, #FF5733, or rgb(255,87,51)"
                              className="w-full p-4 pl-12 rounded-xl bg-white/5 border-2 border-white/10 outline-none transition text-white placeholder-gray-500"
                              onFocus={(e) => {
                                e.target.style.borderColor = '#8f43eb';
                                e.target.style.boxShadow = '0 0 0 4px rgba(143, 67, 235, 0.2)';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.boxShadow = 'none';
                              }}
                            />
                            <FaPalette className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          </div>
                        </div>
                      </div>

                      {/* Extra Notes */}
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-300">
                          Additional Instructions(Optional)
                        </label>
                        <textarea
                          value={extraNote}
                          onChange={(e) => setExtraNote(e.target.value)}
                          placeholder="e.g., Focus on data visualization, include case studies..."
                          className="w-full h-32 p-4 rounded-xl bg-white/5 border-2 border-white/10 outline-none resize-none transition text-white placeholder-gray-500"
                          onFocus={(e) => {
                            e.target.style.borderColor = '#8f43eb';
                            e.target.style.boxShadow = '0 0 0 4px rgba(143, 67, 235, 0.2)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.boxShadow = 'none';
                          }}
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Style Selection */}
                  {currentStep === 2 && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                          2
                        </div>
                        <h3 className="text-2xl font-bold text-white">Choose Your Style</h3>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {slideStyles.map((style) => (
                          <button
                            key={style.value}
                            type="button"
                            onClick={() => setSlideStyle(style.value)}
                            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                              slideStyle === style.value
                                ? 'shadow-xl scale-105'
                                : 'border-white/10 bg-white/5 hover:bg-white/10'
                            }`}
                            style={slideStyle === style.value ? {
                              borderColor: '#8f43eb',
                              backgroundColor: 'rgba(143, 67, 235, 0.2)',
                              boxShadow: '0 20px 25px -5px rgba(143, 67, 235, 0.2)'
                            } : {}}
                          >
                            {slideStyle === style.value && (
                              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(to right, #b856ca, #622ba4)' }}>
                                <FaCheckCircle className="text-white" />
                              </div>
                            )}
                            
                            <div className="text-4xl mb-3">{style.icon}</div>
                            <h4 className="font-bold text-lg mb-1 text-white">{style.label}</h4>
                            <p className="text-sm text-gray-400">{style.desc}</p>
                            
                            <div className={`mt-4 h-2 rounded-full bg-linear-to-r ${style.color}`}></div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Typography */}
                  {currentStep === 3 && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30">
                          3
                        </div>
                        <h3 className="text-2xl font-bold text-white">Typography Settings</h3>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-300">
                            Font Family
                          </label>
                          <div className="relative">
                            <select
                              value={fontStyle}
                              onChange={(e) => setFontStyle(e.target.value)}
                              className="w-full p-4 pl-12 rounded-xl bg-white/5 border-2 border-white/10 outline-none transition cursor-pointer appearance-none text-white"
                              onFocus={(e) => {
                                e.target.style.borderColor = '#8f43eb';
                                e.target.style.boxShadow = '0 0 0 4px rgba(143, 67, 235, 0.2)';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.boxShadow = 'none';
                              }}
                            >
                              {[
                                "Arial", "Times New Roman", "Calibri", "Georgia", 
                                "Helvetica", "Verdana", "Courier New", "Tahoma"
                              ].map(font => (
                                <option key={font} value={font} style={{ backgroundColor: '#0a0c18' }}>{font}</option>
                              ))}
                            </select>
                            <FaFont className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-300">
                            Title Size
                          </label>
                          <select
                            value={titleFontSize}
                            onChange={(e) => setTitleFontSize(Number(e.target.value))}
                            className="w-full p-4 rounded-xl bg-white/5 border-2 border-white/10 outline-none transition cursor-pointer text-white"
                            onFocus={(e) => {
                              e.target.style.borderColor = '#8f43eb';
                              e.target.style.boxShadow = '0 0 0 4px rgba(143, 67, 235, 0.2)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            {[36,40,44,48,54,60].map(size => (
                              <option key={size} value={size} style={{ backgroundColor: '#0a0c18' }}>{size}pt</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-300">
                            Text Size
                          </label>
                          <select
                            value={textFontSize}
                            onChange={(e) => setTextFontSize(Number(e.target.value))}
                            className="w-full p-4 rounded-xl bg-white/5 border-2 border-white/10 outline-none transition cursor-pointer text-white"
                            onFocus={(e) => {
                              e.target.style.borderColor = '#8f43eb';
                              e.target.style.boxShadow = '0 0 0 4px rgba(143, 67, 235, 0.2)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            {[14,16,18,20,22,24].map(size => (
                              <option key={size} value={size} style={{ backgroundColor: '#0a0c18' }}>{size}pt</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Preview */}
                      <div className="mt-8 p-8 bg-linear-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl">
                        <p className="text-sm text-gray-400 mb-4">Preview:</p>
                        <h4 style={{ fontFamily: fontStyle, fontSize: '32px' }} className="font-bold mb-2 text-white">
                          Your Presentation Title
                        </h4>
                        <p style={{ fontFamily: fontStyle, fontSize: '16px' }} className="text-gray-300">
                          This is how your slide content will appear with the selected typography settings.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-500/10 border-2 border-red-500/30 text-red-400 px-6 py-4 rounded-xl flex items-center space-x-3 animate-shake backdrop-blur-sm">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">!</span>
                      </div>
                      <span className="font-medium">{error}</span>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t-2 border-white/10">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="flex items-center gap-2 px-6 py-3 text-gray-400 font-semibold hover:text-white transition"
                      >
                        <FaArrowLeft size={10} />
                        Previous
                      </button>
                    ) : <div></div>}

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="group flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 text-white cursor-pointer"
                        style={{ background: 'linear-gradient(to right, #b856ca, #622ba4)' }}
                      >
                        <span>Continue</span>
                        <FaChevronRight className="group-hover:translate-x-1 transition" />
                      </button>
                    ) : (
                      <button
                        onClick={handlePreview}
                        disabled={loading}
                        className="group flex items-center space-x-2 px-8 py-4 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                        
                      >
                        <FaMagic />
                        <span>{loading ? "Creating..." : "Generate Slides"}</span>
                        <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                      </button>
                    )}
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                  💡
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-white">Be Specific</h4>
                  <p className="text-xs text-gray-400">Clear topics generate better content</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                  🎨
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-white">Try Styles</h4>
                  <p className="text-xs text-gray-400">Each style has unique layouts</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-green-500/30">
                  <FaBolt className="text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-white">Fast Creation</h4>
                  <p className="text-xs text-gray-400">Slides ready in under 2 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;