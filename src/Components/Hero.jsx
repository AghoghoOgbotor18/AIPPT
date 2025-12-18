import React from 'react';
import { FaStar, FaChevronRight } from 'react-icons/fa';
import { LazyMotion, domAnimation, motion } from 'framer-motion';
import heroImg from "../assets/Images/heroImg.webp";

const Hero = ({ setIsUser }) => {
  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
    },
  };

  return (
    <section className="pt-25 pb-20 px-6 stars" id="hero">
      <div className="container mx-auto">
        <LazyMotion features={domAnimation}>
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Badge */}
            <motion.div
              variants={badgeVariants}
              className="inline-flex items-center space-x-2 bg-[#260c46] px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <div className="animate-spin">
                <FaStar className="text-yellow-500" />
              </div>
              <span>AI-Powered Presentation Generator</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={headingVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
            >
              From Idea to{' '}
              <motion.span
                className="text-transparent bg-clip-text bg-linear-to-r from-[#622ba4] to-[#c65bd6]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Presentation
              </motion.span>{' '}
              in One Click
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Generate sleek, editable PPT decks in minutes. AI handles slide design, formatting,
              and visual content so you can focus on your message, impress your audience,
              and work smarter, not harder.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                onClick={() => setIsUser(true)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                className="group flex items-center space-x-2 px-5 py-4 btn rounded-xl hover:bg-[#8c3cee] transition shadow-lg hover:shadow-xl text-lg font-semibold"
              >
                <span>Get Started Free</span>
                <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <FaChevronRight />
                </motion.div>
              </motion.button>

              <motion.a
                href="#examples"
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-5 py-4 border rounded-xl bg-slate-950/30 hover:bg-slate-950/60 cursor-pointer transition shadow-md border-gray-600 text-lg font-semibold"
              >
                <span>View Examples</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex justify-center items-center stars"
          >
            <motion.img
              src={heroImg}
              className="w-[1500px] h-auto"
              alt="presentation"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default Hero;
