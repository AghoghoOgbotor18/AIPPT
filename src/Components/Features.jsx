import React from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import {
  FaMagic,
  FaPalette,
  FaDownload,
  FaClock,
  FaImage,
  FaEdit,
  FaShieldAlt
} from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
};

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

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: [0, -10, 10, -10, 0],
    transition: { duration: 0.5 }
  }
};

const features = [
  {
    icon: FaMagic,
    title: 'AI-Powered Content',
    description: 'Advanced GPT-4 generates compelling content and structure for your presentations automatically.'
  },
  {
    icon: FaPalette,
    title: '5+ Slide Styles',
    description: 'Corporate, Professional, Playful, Creative, and Minimalist styles with full customization.'
  },
  {
    icon: FaImage,
    title: 'Auto Image Integration',
    description: 'Relevant, high-quality images from Unsplash automatically added to your slides.'
  },
  {
    icon: FaClock,
    title: 'Save 10x Time',
    description: 'Create complete presentations in minutes instead of hours.'
  },
  {
    icon: FaEdit,
    title: 'Live Preview & Edit',
    description: 'Edit slides in real-time with instant preview before downloading.'
  },
  {
    icon: FaDownload,
    title: 'Instant Download',
    description: 'Export as PowerPoint or PDF. Compatible with all devices.'
  }
];

const Features = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section
        id="features"
        className="relative overflow-hidden border-t border-b border-white/10 py-24 rounded-xl"
      >
        <div className="container mx-auto px-6">
          {/* Header */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-16 flex flex-col items-center gap-4"
          >
            <m.p
              variants={headerVariants}
              className="bg-linear-to-r from-purple-600/40 to-purple-900/10 px-4 py-1 rounded-xl text-sm flex items-center gap-2"
            >
              <FaShieldAlt /> Why Choose Us?
            </m.p>

            <m.h2 variants={headerVariants} className="text-3xl md:text-5xl font-bold">
              Why AI
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-500"> PPT</span>
              {' '}Is the Best Choice
            </m.h2>

            <m.p variants={headerVariants} className="text-lg text-gray-400">
              Everything you need to create professional presentations
            </m.p>
          </m.div>

          {/* Grid */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-120px' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <m.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="relative group rounded-2xl p-8 border border-white/10 bg-linear-to-t from-purple-500/20 via-purple-500/5 to-transparent backdrop-blur-sm hover:border-purple-500/40 transition-all"
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 0%, rgba(168,85,247,0.18), transparent 70%)'
                  }}
                />

                {/* Icon */}
                <m.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="w-14 h-14 rounded-xl bg-linear-to-br from-pink-500 via-purple-700 to-purple-900 flex items-center justify-center mb-6 shadow-lg"
                >
                  <feature.icon className="text-white text-2xl" />
                </m.div>

                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default Features;