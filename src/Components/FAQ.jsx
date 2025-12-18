import React, { useState } from 'react';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { LazyMotion, domAnimation, motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is AI-PPT and how does it work?",
      answer:
        "AI-PPT is an AI-powered tool that instantly generates presentation slides based on your topic, presenter name, and preferred number of slides. The system designs the layout, writes the content, and provides ready-made visuals automatically.",
    },
    {
      question: "Do I need any design skills to use AIPPT?",
      answer:
        "No. AI-PPT handles the structure, design, and text for you. Just enter your topic, and the AI creates clean, professional slides without any design knowledge required.",
    },
    {
      question: "Does AI-PPT cost anything to use?",
      answer:
        "No. AI-PPT is completely free to use. You can generate as many presentations as you want with no subscription or payment required.",
    },
    {
      question: "Can I download the slides I generate?",
      answer:
        "Yes. After generating your slides, you can download the full presentation in PowerPoint (PPT) format and edit it however you like.",
    },
    {
      question: "How fast does AI-PPT generate a presentation?",
      answer:
        "AI-PPT creates a complete presentation in just a few seconds, depending on your slide count.",
    },
    {
      question: "Can I edit the presentation after downloading it?",
      answer:
        "Absolutely. Once you download the PPT file, you can open it in PowerPoint or Google Slides and customize the text, colors, images, and layout.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-20 px-4 stars">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">

            {/* Header Section */}
            <div className="text-center md:text-start">
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Frequently Asked{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#622ba4] to-[#c65bd6]">
                  Questions
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  Still have a question?
                </h2>
                <p className="text-gray-400 text-lg max-w-xl mb-8">
                  Can't find the answer to your question? Send us an email and we'll get back to you as soon as possible!
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn font-semibold py-3 px-8 rounded-lg shadow-lg"
                >
                  Send email
                </motion.button>
              </motion.div>
            </div>

            {/* FAQ Items */}
            <div className="max-w-xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  layout
                  transition={{ layout: { duration: 0.4, ease: "easeOut" } }}
                  whileHover={{ y: -2 }}
                  className="
                    bg-[#0e1020] border border-white/10
                    rounded-md overflow-hidden
                    shadow-[4px_4px_10px_#0b0713,-4px_-4px_10px_#180f2b]
                  "
                >
                  <button onClick={() => toggleFAQ(index)}
                    className="
                      w-full text-left p-3
                      flex justify-between items-center
                      hover:bg-white/5 transition-colors
                    "
                  >
                    <span className="text-white font-semibold text-md md:text-xl">
                      {faq.question}
                    </span>

                    <span
                      className="
                        ml-4 text-sm font-light
                        border border-white/10 shadow-3xl
                        text-[#b856ca] p-2 rounded
                      "
                    >
                      {activeIndex === index ? <FaCaretUp /> : <FaCaretDown />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {activeIndex === index && (
                      <motion.div
                        className="p-6 md:p-8 pt-0 border-t border-white/5"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <p className="text-gray-400 text-lg leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default FAQ;
