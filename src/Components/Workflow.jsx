import React from 'react';
import { motion } from 'framer-motion';
import { FaListOl } from 'react-icons/fa';
import formImg from "../assets/Images/form.PNG";
import slideShow from "../assets/Images/slide-show.png";
import slide from "../assets/Images/cultural.PNG"

const Workflow = () => {
  // Header animations
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Step container animation
  const stepContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  // Number animation
  const numberVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5
    },
    visible: {
      opacity: 0.2,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Text animation (slides from side)
  const textLeftVariants = {
    hidden: { 
      opacity: 0, 
      x: -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const textRightVariants = {
    hidden: { 
      opacity: 0, 
      x: 50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Image animation with 3D effect
  const imageLeftVariants = {
    hidden: { 
      opacity: 0, 
      x: -100,
      rotateY: -45,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const imageRightVariants = {
    hidden: { 
      opacity: 0, 
      x: 100,
      rotateY: 45,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Glow effect animation - reduced and pink tinted
  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 15px rgba(168, 85, 247, 0.15), 0 0 20px rgba(236, 72, 153, 0.1)",
        "0 0 25px rgba(168, 85, 247, 0.25), 0 0 30px rgba(236, 72, 153, 0.15)",
        "0 0 15px rgba(168, 85, 247, 0.15), 0 0 20px rgba(236, 72, 153, 0.1)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const steps = [
    {
      number: "01",
      title: "Describe Your Topic",
      description: "Enter your presentation topic, select preferences like style, colors, and fonts. Our intuitive interface makes it easy to customize every aspect.",
      image: formImg,
      alt: "Create Account",
      imagePosition: "left"
    },
    {
      number: "02",
      title: "Review & Edit",
      description: "Edit if needed with live preview, then download your PowerPoint file instantly. Your presentation is ready to impress.",
      image: slideShow,
      alt: "Search for Services",
      imagePosition: "right"
    },
    {
      number: "03",
      title: "AI Generates Slides",
      description: "Our AI creates professional content, designs, and adds relevant images in seconds. Sit back and watch the magic happen.",
      image: slide,
      alt: "Review & Download",
      imagePosition: "left"
    }
  ];

  return (
    <section id="how-it-works" className="stars py-20 relative before:absolute before:w-30 before:h-30 before:bg-[#c65bd5] before:rounded-full before:top-2 before:left-0 before:blur-3xl after:absolute after:w-30 after:h-30 after:bg-[#622ba4] after:rounded-full after:top-[50%] after:right-0 after:blur-3xl">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          className="flex flex-col gap-5 justify-center items-center text-center -mt-5 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stepContainerVariants}
        >
          <motion.p 
            variants={headerVariants}
            className="bg-linear-to-r from-[#9f44d8] to-[#311758]/10 py-1 px-4 rounded-xl flex justify-center items-center gap-2 w-fit text-sm"
          >
            <span><FaListOl /></span>
            How It Works
          </motion.p>

          <motion.h2 
            variants={headerVariants}
            className="text-3xl md:text-5xl font-bold md:w-[85%] mb-3"
          >
            How AI
            <motion.span 
              className="text-transparent bg-clip-text bg-linear-to-r from-[#622ba4] to-[#c65bd6]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              PPT
            </motion.span>
            {' '}Transforms Your Ideas Into Stunning Slides
          </motion.h2>

          <motion.p 
            variants={headerVariants}
            className="text-lg"
          >
            Your entire presentation workflow simplified from topic to download. No stress, no design skills needed.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className={`grid md:grid-cols-2 gap-12 items-center ${index === 1 ? 'pb-5' : ''}`}
            >
              {/* Image - Left or Right based on step */}
              <motion.div 
                className={`order-2 ${step.imagePosition === 'left' ? 'md:order-1' : 'md:order-2'}`}
                variants={step.imagePosition === 'left' ? imageLeftVariants : imageRightVariants}
              >
                <motion.div 
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl relative overflow-hidden group"
                  variants={glowVariants}
                  animate="animate"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Animated gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1), transparent 70%)'
                    }}
                  />
                  
                  <motion.img 
                    src={step.image} 
                    alt={step.alt}
                    className="w-full h-auto rounded-lg relative z-10"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  />

                  {/* Decorative corner elements */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-purple-500/20 to-transparent rounded-bl-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-20 h-20 bg-linear-to-tr from-pink-500/20 to-transparent rounded-tr-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  />
                </motion.div>
              </motion.div>

              {/* Text Content */}
              <motion.div 
                className={`order-1 ${step.imagePosition === 'left' ? 'md:order-2' : 'md:order-1'}`}
                variants={step.imagePosition === 'left' ? textRightVariants : textLeftVariants}
              >
                <div className="flex items-start space-x-6">
                  {/* Number with animation */}
                  <motion.div 
                    className="text-9xl font-bold text-gray-600/20"
                    variants={numberVariants}
                    whileHover={{ 
                      scale: 1.05,
                      opacity: 0.3,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {step.number}
                  </motion.div>
                  
                  <div>
                    {/* Title */}
                    <motion.h3 
                      className="text-3xl font-bold mb-4 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {step.title}
                    </motion.h3>
                    
                    {/* Description */}
                    <motion.p 
                      className="text-gray-400 text-lg leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {step.description}
                    </motion.p>

                    {/* Animated underline */}
                    <motion.div
                      className="h-1 bg-linear-to-r from-purple-500 to-pink-500 rounded-full mt-4"
                      initial={{ width: 0 }}
                      whileInView={{ width: "60%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Connecting Lines Between Steps */}
        <motion.div
          className="absolute left-1/2 top-[30%] h-[40%] w-0.5 bg-linear-to-b from-purple-500/50 via-pink-500/50 to-purple-500/50 -translate-x-1/2 hidden md:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </section>
  )
}

export default Workflow