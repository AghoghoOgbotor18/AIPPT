import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { LazyMotion, domAnimation, motion } from 'framer-motion';

const Cta = ({ setIsUser }) => {
  return (
    <section className="flex justify-center items-center stars py-20 px-6 bg-[#0a0c18]">
      <div className="relative max-w-5xl w-full">
        {/* Animated Blur Circles */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="yellow absolute w-72 h-72 rounded-full blur-3xl opacity-20 animate-float-1"></div>
          <div className="purple absolute w-80 h-80 rounded-full blur-3xl opacity-20 animate-float-2"></div>
          <div className="blue absolute w-74 h-74 rounded-full blur-3xl opacity-20 animate-float-3"></div>
          <div className="pink absolute w-72 h-72 rounded-full blur-3xl opacity-20 animate-float-4"></div>
        </div>

        {/* Card */}
        <LazyMotion features={domAnimation}>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="glass-card relative backdrop-blur-xl rounded-3xl p-12 md:p-16 shadow-2xl border"
          >
            <div className="text-center relative z-10">
              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold text-white mb-6"
              >
                Ready to Create Your First Presentation?
              </motion.h2>

              {/* Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
              >
                Join thousands of users who are saving time and creating better presentations with AI
              </motion.p>

              {/* Button */}
              <motion.button
                onClick={() => setIsUser(true)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn py-3.5 rounded-lg inline-flex items-center gap-2"
              >
                <span>Start Creating Free</span>
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaChevronRight />
                </motion.span>
              </motion.button>

              {/* Helper text */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                viewport={{ once: true }}
                className="text-gray-400 mt-6"
              >
                No credit card required • Free forever
              </motion.p>
            </div>
          </motion.div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default Cta;
