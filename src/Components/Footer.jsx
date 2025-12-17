import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTwitter, 
  FaLinkedin, 
  FaGithub, 
  FaInstagram,
  FaPaperPlane,
  FaRocket,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart
} from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email && message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
        setMessage('');
      }, 3000);
    }
  };

  const socialLinks = [
    { icon: <FaTwitter />, label: 'Twitter', href: '#', color: '#1DA1F2', glow: 'rgba(29, 161, 242, 0.5)' },
    { icon: <FaLinkedin />, label: 'LinkedIn', href: '#', color: '#0A66C2', glow: 'rgba(10, 102, 194, 0.5)' },
    { icon: <FaGithub />, label: 'GitHub', href: '#', color: '#fff', glow: 'rgba(255, 255, 255, 0.5)' },
    { icon: <FaInstagram />, label: 'Instagram', href: '#', color: '#E4405F', glow: 'rgba(228, 64, 95, 0.5)' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
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

  const contactCardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <footer id="footer" className="relative overflow-hidden bg-[#0a0c18] border-t border-white/10 rounded-xl before:absolute before:w-30 before:h-30 before:bg-[#c65bd5] before:rounded-full before:top-2 before:left-[40%] before:blur-3xl after:absolute after:w-30 after:h-30 after:bg-[#622ba4] after:rounded-full after:top-2 after:left-[50%] after:blur-3xl">
      <div className="container mx-auto px-6 py-16 relative z-10">
        <motion.div 
          className="grid lg:grid-cols-2 gap-16 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          
          {/* Left Side - Brand & Contact Info */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg" 
                  style={{ background: 'linear-gradient(to right, #b856ca, #622ba4)' }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <FaRocket className="text-white text-xl" />
                </motion.div>
                <h1 className="font-bold text-2xl text-white">
                  AI<span style={{ color: '#8f43eb' }}>PPT</span>
                </h1>
              </div>
              <motion.p 
                className="text-gray-400 text-md leading-relaxed py-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Transform your ideas into stunning presentations with the power of AI. 
                Join thousands of creators worldwide.
              </motion.p>
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div 
              className="grid grid-cols-1 gap-4"
              variants={containerVariants}
            >
              <motion.a 
                href="mailto:aghoghoogbotor@gmail.com" 
                className="group flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
                variants={contactCardVariants}
                whileHover={{ x: 10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-500/20"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaEnvelope className="text-purple-400" />
                </motion.div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
                  <p className="text-white font-medium">aghoghoogbotor@gmail.com</p>
                </div>
              </motion.a>

              <motion.a 
                href="tel:+1234567890" 
                className="group flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300"
                variants={contactCardVariants}
                whileHover={{ x: 10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500/20"
                  whileHover={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaPhone className="text-blue-400" />
                </motion.div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Phone</p>
                  <p className="text-white font-medium">+234 (802) 693-0078</p>
                </div>
              </motion.a>

              <motion.div 
                className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border hover:border-pink-400 border-white/10"
                variants={contactCardVariants}
                whileHover={{ x: 10, scale: 1.02 }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-pink-500/20"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaMapMarkerAlt className="text-pink-400" />
                </motion.div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Location</p>
                  <p className="text-white font-medium">Port Harcourt, Nigeria</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Interactive Contact Form */}
          <motion.div 
            className="relative"
            variants={formVariants}
          >
            <motion.div 
              className="relative bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
              whileHover={{ 
                borderColor: 'rgba(168, 85, 247, 0.5)',
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)'
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 
                className="text-2xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Get In Touch
              </motion.h3>
              <motion.p 
                className="text-gray-400 mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Send us a message and we'll respond within 24 hours
              </motion.p>

              {submitted ? (
                <motion.div 
                  className="flex flex-col items-center justify-center py-12"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <motion.path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                    </svg>
                  </motion.div>
                  <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-400 text-center">Thank you for reaching out. We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="group"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <motion.input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-purple-500 focus:bg-white/10 outline-none text-white placeholder-gray-500 transition-all duration-300"
                      whileFocus={{ borderColor: '#a855f7' }}
                    />
                  </motion.div>

                  <motion.div 
                    className="group"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <motion.textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your message..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-purple-500 focus:bg-white/10 outline-none text-white placeholder-gray-500 resize-none transition-all duration-300"
                      whileFocus={{ borderColor: '#a855f7' }}
                    />
                  </motion.div>

                  <motion.button
                    onClick={handleSubmit}
                    className="group relative w-full py-4 rounded-xl font-semibold text-white overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div 
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(135deg, #b856ca, #622ba4)' }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative flex items-center justify-center space-x-2">
                      <span>Send Message</span>
                      <motion.div
                        animate={{ 
                          x: [0, 5, 0],
                          y: [0, -5, 0]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <FaPaperPlane />
                      </motion.div>
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Social Media Section */}
        <motion.div 
          className="relative mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
        >
          <div className="flex flex-col items-center space-y-6">
            <motion.h3 
              className="text-xl font-bold text-white"
              variants={itemVariants}
            >
              Connect With Us
            </motion.h3>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="group relative w-14 h-14 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300"
                  custom={index}
                  variants={socialVariants}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -10, 10, 0]
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"
                    style={{ backgroundColor: social.glow }}
                    animate={{
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="relative text-2xl text-white">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="relative pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm flex items-center space-x-1">
              <span>&copy; 2025 AIPPT. Made with</span>
              <motion.span
                animate={{ 
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FaHeart className="text-pink-500" />
              </motion.span>
              <span>by Aghogho Ogbotor</span>
            </p>
            <div className="flex items-center space-x-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, color: '#ffffff' }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;