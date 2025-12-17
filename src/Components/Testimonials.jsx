import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaStar, FaRocket, FaUserCircle } from "react-icons/fa";
import passportOne from "../assets/Images/pass1.webp";
import passportTwo from "../assets/Images/pass2.webp";
import passportThree from "../assets/Images/pass3.webp";
import passportFour from "../assets/Images/pass4.webp";

const testimonials = [
  {
    name: "Melina Lopez",
    role: "Founder | Circooles",
    image: passportOne,
    review:
      "I recently started using AIPPT, and it has truly exceeded my expectations! The web interface makes navigation effortless and smooth.",
    stars: 5,
  },
  {
    name: "Daniel Carter",
    role: "Marketing Lead",
    image: passportTwo,
    review:
      "The AI-powered designs helped me finish my slides in minutes. This is a game changer for my workflow.It's being of great help to me and my team.",
    stars: 5,
  },
  {
    name: "Sophia Martins",
    role: "Educator",
    image: passportThree,
    review:
      "As a teacher, AIPPT saved me hours of slide creation time to present to my students and colleagues. Absolutely amazing experience!",
    stars: 5,
  },
  {
    name: "Sylvia Carles",
    role: "Student",
    image: passportFour,
    review:
      "As a Student, AIPPT saved me hours of slide creation time for assignments. Iand my friends really loved it and can't stop using it.",
    stars: 5,
  },
];

const slideVariants = {
  enter: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  center: {
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

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <section className="w-full flex flex-col items-center py-20 stars" id="testimonials">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-linear-to-r from-[#9f44d8] to-[#311758]/10 py-1 px-4 rounded-xl text-sm mb-6 flex items-center gap-2"
      >
        <FaUserCircle />
        Stories of Success
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-center mb-12"
      >
        What People{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#622ba4] to-[#c65bd6]">
          Say
        </span>
      </motion.h2>


      <motion.div
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="
          w-[90%] md:w-[700px] bg-white/5
          rounded-3xl p-6 pt-3 md:p-8 relative
          shadow-[2px_2px_#b856ca]
          border border-white/5
          transition-all duration-500
          before:absolute before:w-30 before:h-30 before:bg-[#c65bd5] before:rounded-full before:top-2 before:left-0 before:blur-3xl
          after:absolute after:w-30 after:h-30 after:bg-[#622ba4] after:rounded-full after:bottom-2 after:right-0 after:blur-3xl
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col md:flex-row justify-center gap-3"
          >
            {/* left side */}
            <div className="mt-3 md:mt-0 md:w-1/3 flex md:flex-col justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center shadow-lg"
                  style={{ background: 'linear-gradient(to right, #b856ca, #622ba4)' }}
                >
                  <FaRocket className="text-white text-xl" size={12} />
                </div>
                <h1 className="font-bold text-lg text-white">
                  AI<span style={{ color: '#8f43eb' }}>PPT</span>
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border-4 border-[#0a0c18] shadow-xl"
                />
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs">{t.role}</p>
                </div>
              </div>
            </div>

            {/* right side */}
            <div className="bg-[#0a0c18] flex flex-col gap-3 p-5 rounded-md mb-4 md:mb-1 md:w-[80%]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex space-x-1 mb-4"
              >
                {Array.from({ length: t.stars }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <FaStar className="text-yellow-500 text-lg" />
                  </motion.div>
                ))}
              </motion.div>

              <p className="text-gray-400 text-sm">{t.review}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between absolute -bottom-6 left-0 right-0">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-[#0a0c18] shadow-[4px_4px_10px_#0a0713,-4px_-4px_10px_#24163d] hover:bg-[#0c0e1b] transition transform -translate-y-1/2"
          >
            <FaChevronLeft className="text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-[#0a0c18] shadow-[4px_4px_10px_#0a0713,-4px_-4px_10px_#24163d] hover:bg-[#0c0e1b] transition transform -translate-y-1/2"
          >
            <FaChevronRight className="text-white" />
          </button>
        </div>
      </motion.div>

      {/* Indicators */}
      <div className="flex mt-10 space-x-2">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === index ? "bg-purple-500" : "bg-gray-600"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
