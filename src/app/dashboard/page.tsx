'use client';

import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiBarChart, FiUsers, FiTrendingUp, FiCalendar, FiBell, FiSettings, FiPlus, FiMail, FiDownloadCloud, FiCreditCard } from 'react-icons/fi';
import { useEventStore } from '@/store';
import BillingDashboard from '@/components/billing/BillingDashboard';

export default function DashboardPage() {
  const { events, registrations, payments } = useEventStore();

  const dashboardStats = [
    {
      label: 'Total Events',
      value: events.length,
      icon: FiCalendar,
      color: 'from-purple-600 to-pink-600',
      trend: '+2 this month',
    },
    {
      label: 'Registrations',
      value: registrations.length,
      icon: FiUsers,
      color: 'from-blue-600 to-cyan-600',
      trend: '+15 new',
    },
    {
      label: 'Total Revenue',
      value: `$${payments.reduce((sum, p) => sum + (p.status === 'completed' ? p.amount : 0), 0)}`,
      icon: FiTrendingUp,
      color: 'from-cyan-600 to-teal-600',
      trend: '+8.5% from last month',
    },
    {
      label: 'Conversion Rate',
      value: registrations.length > 0 ? `${Math.round((registrations.length / (events.length || 1)) * 100)}%` : '0%',
      icon: FiBarChart,
      color: 'from-green-600 to-emerald-600',
      trend: 'Above average',
    },
  ];

  const recentActivity = [
    { type: 'registration', message: 'New registration for Tech Conference 2024', time: '2 hours ago' },
    { type: 'payment', message: 'Payment received - $249.99', time: '4 hours ago' },
    { type: 'event', message: 'Event "Summer Festival" created', time: '1 day ago' },
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
    <Layout>
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-5xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here&apos;s your performance overview.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-3 glass-card-light border border-purple-500/30 rounded-lg hover:border-purple-500/60 transition-all"
          >
            <FiSettings size={24} />
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {dashboardStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className={`glass-card-light p-6 rounded-xl border border-purple-500/30 bg-gradient-to-br ${stat.color} bg-opacity-10`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-lg glass-card flex items-center justify-center">
                    <Icon size={24} className="text-cyan-400" />
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-xs text-green-400">{stat.trend}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Recent Activity */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 glass-card-light p-6 rounded-xl border border-purple-500/30"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FiBell size={20} />
                Recent Activity
              </h3>
              <motion.button
                whileHover={{ color: '#a855f7' }}
                className="text-cyan-400 hover:text-purple-400 transition-colors text-sm"
              >
                View All
              </motion.button>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 p-4 rounded-lg glass-card hover:bg-purple-500/10 transition-all"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === 'registration' ? 'bg-cyan-400' :
                    activity.type === 'payment' ? 'bg-green-400' :
                    'bg-purple-400'
                  }`} />
                  <div className="flex-grow">
                    <p className="text-sm mb-1">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="glass-card-light p-6 rounded-xl border border-purple-500/30"
          >
            <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { label: 'Create Event', icon: FiPlus, href: '/events/create' },
                { label: 'Send Email', icon: FiMail, href: '/dashboard' },
                { label: 'Download Report', icon: FiDownloadCloud, href: '/dashboard' },
                { label: 'View Payments', icon: FiCreditCard, href: '/dashboard' },
              ].map((action, idx) => {
                const Icon = action.icon;

                return (
                  <Link key={idx} href={action.href}>
                    <motion.button
                      whileHover={{ x: 8 }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg glass-card hover:glass-card-light transition-all group"
                    >
                      <Icon className="text-cyan-400" size={18} />
                      <span className="text-sm group-hover:text-purple-400 transition-colors">{action.label}</span>
                    </motion.button>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Billing Section */}
        <BillingDashboard />
      </section>
    </Layout>
  );
}
