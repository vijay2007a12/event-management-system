'use client';

import { motion } from 'framer-motion';
import {
  FiCalendar,
  FiUsers,
  FiTrendingUp,
  FiZap,
  FiShield,
  FiSmartphone,
  FiGlobe,
  FiBarChart,
  FiAward,
  FiBell,
  FiLock,
} from 'react-icons/fi';

const FeaturesSection = () => {
  const features = [
    {
      icon: FiCalendar,
      title: 'Smart Event Planning',
      description: 'Drag-and-drop calendar, automated scheduling, and intelligent task management',
      color: 'from-purple-600 to-pink-600',
    },
    {
      icon: FiUsers,
      title: 'Guest Management',
      description: 'Effortless attendee tracking, waitlist management, and communications',
      color: 'from-blue-600 to-cyan-600',
    },
    {
      icon: FiTrendingUp,
      title: 'Real-time Analytics',
      description: 'Live dashboards with conversion rates, capacity tracking, and insights',
      color: 'from-cyan-600 to-teal-600',
    },
    {
      icon: FiZap,
      title: 'Seamless Registration',
      description: 'Multi-step wizard, QR tickets, and instant confirmations',
      color: 'from-yellow-600 to-orange-600',
    },
    {
      icon: FiShield,
      title: 'Secure Role Access',
      description: 'Firebase login with focused admin and customer workspaces',
      color: 'from-red-600 to-pink-600',
    },
    {
      icon: FiSmartphone,
      title: 'Mobile Optimized',
      description: 'Perfect experience on all devices with responsive design',
      color: 'from-green-600 to-emerald-600',
    },
    {
      icon: FiGlobe,
      title: 'Global Reach',
      description: 'Multi-language support and international event capabilities',
      color: 'from-indigo-600 to-purple-600',
    },
    {
      icon: FiBarChart,
      title: 'Advanced Reporting',
      description: 'Custom reports, data exports, and predictive analytics',
      color: 'from-violet-600 to-purple-600',
    },
    {
      icon: FiBell,
      title: 'Smart Notifications',
      description: 'Automated reminders, email campaigns, and SMS updates',
      color: 'from-pink-600 to-red-600',
    },
    {
      icon: FiLock,
      title: 'Enterprise Security',
      description: '256-bit encryption, data compliance, and regular backups',
      color: 'from-slate-600 to-gray-600',
    },
    {
      icon: FiAward,
      title: 'Gamification',
      description: 'Leaderboards, badges, and engagement tracking',
      color: 'from-amber-600 to-yellow-600',
    },
    {
      icon: FiGlobe,
      title: 'API Integration',
      description: 'Powerful REST API for custom integrations and automation',
      color: 'from-emerald-600 to-green-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Packed with <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to create unforgettable events and manage them efficiently
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className={`glass-card-light p-6 rounded-xl border border-purple-500/30 hover:border-purple-500/60 transition-all group cursor-pointer bg-gradient-to-br ${feature.color} bg-opacity-5`}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:shadow-lg transition-all`}
                >
                  <Icon size={24} className="text-white" />
                </motion.div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  className="h-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 mt-4"
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">Ready to revolutionize your event management?</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold text-white flex items-center justify-center gap-2 group mx-auto"
          >
            Start Creating Events
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
