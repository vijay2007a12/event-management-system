'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiStar, FiTrendingUp, FiCalendar, FiBarChart, FiCreditCard } from 'react-icons/fi';
import Scene3D from '@/components/3d/Scene3D';

const HeroSection = () => {
  const stats = [
    { number: '10K+', label: 'Active Events', icon: FiTrendingUp },
    { number: '500K+', label: 'Users', icon: FiStar },
    { number: '$50M+', label: 'Revenue', icon: FiStar },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-light border border-purple-500/30 w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
              </span>
              <span className="text-sm gradient-text font-semibold">Live Beta • Join 10K+ users</span>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="gradient-text">Plan. Register.</span>
                <br />
                <span className="text-white">Manage.</span>
                <br />
                <span className="gradient-text">All in One</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                The next-generation event management platform with immersive 3D visuals, real-time analytics, and seamless integrations for creating unforgettable experiences.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link href="/events/create">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold text-white flex items-center justify-center gap-2 group"
                >
                  Create Event
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href="#features">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass-card-light hover:glass-card border border-purple-500/30 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all"
                >
                  Explore Features
                  <FiArrowRight />
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="glass-card-light p-4 rounded-lg border border-purple-500/20 text-center"
                  >
                    <Icon className="mx-auto mb-2 text-purple-400" size={20} />
                    <p className="text-2xl font-bold gradient-text">{stat.number}</p>
                    <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right - 3D Scene */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:block"
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.5)',
                    '0 0 40px rgba(168, 85, 247, 0.8)',
                    '0 0 20px rgba(168, 85, 247, 0.5)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="rounded-2xl overflow-hidden glass-card"
              >
                <Scene3D />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {[
            {
              title: 'Drag & Drop Planning',
              description: 'Intuitive calendar and task management',
              icon: FiCalendar,
            },
            {
              title: 'Real-time Analytics',
              description: 'Live registration and revenue tracking',
              icon: FiBarChart,
            },
            {
              title: 'Seamless Payments',
              description: 'Multiple payment integrations',
              icon: FiCreditCard,
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="glass-card-light p-6 rounded-xl border border-purple-500/20 text-center"
              >
                <Icon className="mx-auto mb-3 text-purple-300" size={36} />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
