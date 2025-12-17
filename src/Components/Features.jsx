import React from 'react';
import { motion } from 'framer-motion';
import {FaMagic, 
  FaPalette, 
  FaDownload, 
  FaClock, 
  FaImage,
  FaEdit,
  FaShieldAlt
} from 'react-icons/fa';

const Features = () => {
  // Container animation for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

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

  // Card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Icon animation
  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  // Features data
  const features = [
    {
      icon: FaMagic,
      title: "AI-Powered Content",
      description: "Advanced GPT-4 generates compelling content and structure for your presentations automatically.",
      delay: 0
    },
    {
      icon: FaPalette,
      title: "5+ Slide Styles",
      description: "Corporate, Professional, Playful, Creative, and Minimalist styles with full customization.",
      delay: 0.1
    },
    {
      icon: FaImage,
      title: "Auto Image Integration",
      description: "Relevant, high-quality images from Unsplash automatically added to your slides.",
      delay: 0.2
    },
    {
      icon: FaClock,
      title: "Save 10x Time",
      description: "Create complete presentations in 2 minutes instead of hours. Focus on what matters.",
      delay: 0.3
    },
    {
      icon: FaEdit,
      title: "Live Preview & Edit",
      description: "Edit slides in real-time with instant preview before downloading your deck.",
      delay: 0.4
    },
    {
      icon: FaDownload,
      title: "Instant Download",
      description: "Export as PowerPoint with live PDF preview. Compatible with all devices.",
      delay: 0.5
    }
  ];

  return (
    <section id="features" className="py-20 stars pb-24 mt-6 overflow-hidden relative border-t border-b border-white/10 rounded-xl before:absolute before:w-30 before:h-30 before:bg-[#c65bd5] before:rounded-full before:top-2 before:left-[40%] before:blur-3xl after:absolute after:w-30 after:h-30 after:bg-[#622ba4] after:rounded-full after:top-2 after:left-[50%] after:blur-3xl">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          className="flex flex-col gap-5 justify-center items-center text-center -mt-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.p 
            variants={headerVariants}
            className="bg-linear-to-r from-[#9f44d8] to-[#311758]/10 py-1 px-4 rounded-xl flex justify-center items-center gap-2 w-fit text-sm"
          >
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <FaShieldAlt />
            </motion.span>
            Why Choose us?
          </motion.p>

          <motion.h2 
            variants={headerVariants}
            className="text-3xl md:text-5xl font-bold"
          >
            Why AI
            <motion.span 
              className="text-transparent bg-clip-text bg-linear-to-r from-[#622ba4] to-[#c65bd6]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              PPT
            </motion.span>
            {' '}is The Best Choice For You
          </motion.h2>

          <motion.p 
            variants={headerVariants}
            className="text-lg"
          >
            Everything you need to create professional presentations
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group p-8 rounded-2xl bg-linear-to-t from-purple-500/20 via-purple-500/5 to-transparent backdrop-blur-sm border border-white/10 hover:border-purple-500/50 hover:from-purple-500/30 transition-all duration-300 cursor-pointer"
            >
              {/* Icon */}
              <motion.div 
                variants={iconVariants}
                whileHover="hover"
                className="w-14 h-14 bg-linear-to-br from-pink-500 via-purple-700 to-purple-900 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20"
              >
                <feature.icon className="text-white text-2xl" />
              </motion.div>

              {/* Title */}
              <motion.h3 
                className="text-xl font-bold mb-3 text-white"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: feature.delay + 0.2 }}
              >
                {feature.title}
              </motion.h3>

              {/* Description */}
              <motion.p 
                className="text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: feature.delay + 0.3 }}
              >
                {feature.description}
              </motion.p>

              {/* Hover gradient effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.15), transparent 70%)'
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Features