'use client';

import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiBarChart, FiUsers, FiTrendingUp, FiCalendar, FiBell, FiSettings, FiPlus, FiMail, FiDownloadCloud, FiShield, FiUser, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { useEventStore } from '@/store';
import RegistrationAnalyticsDashboard from '@/components/analytics/RegistrationAnalyticsDashboard';
import AuthPanel from '@/components/auth/AuthPanel';

export default function DashboardPage() {
  const { events, registrations, user } = useEventStore();
  const isAdmin = user?.role === 'admin';
  const customerRegistrations = user
    ? registrations.filter((registration) => registration.userEmail === user.email)
    : registrations.slice(0, 1);

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
      label: 'Capacity Filled',
      value: `${Math.round(
        (events.reduce((sum, event) => sum + event.registeredCount, 0) /
          (events.reduce((sum, event) => sum + event.capacity, 0) || 1)) *
          100
      )}%`,
      icon: FiTrendingUp,
      color: 'from-cyan-600 to-teal-600',
      trend: 'Across all events',
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
    { type: 'registration', message: 'New registration for Future Tech Summit', time: '2 hours ago' },
    { type: 'registration', message: 'VIP ticket added for Design Systems Night', time: '4 hours ago' },
    { type: 'event', message: 'Campus Startup Fair is scheduled', time: '1 day ago' },
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
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]"
          >
            <div className="glass-card-light rounded-xl border border-cyan-400/30 p-6">
              <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                <FiShield /> Login recommended
              </p>
              <h2 className="text-2xl font-bold">Sign in to unlock your admin or customer workspace.</h2>
              <p className="mt-2 text-gray-400">
                You can preview dashboard data now, but Google login personalizes tickets, roles, and actions.
              </p>
            </div>
            <AuthPanel />
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 px-3 py-1 text-sm text-purple-200">
              {isAdmin ? <FiShield /> : <FiUser />}
              {isAdmin ? 'Admin workspace' : 'Customer workspace'}
            </p>
            <h1 className="text-5xl font-bold mb-2">
              {isAdmin ? 'Admin Dashboard' : 'Customer Dashboard'}
            </h1>
            <p className="text-gray-400">
              {isAdmin
                ? 'Manage events, registrations, users, and platform activity.'
                : 'Track your tickets, upcoming events, and registration activity.'}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-3 glass-card-light border border-purple-500/30 rounded-lg hover:border-purple-500/60 transition-all"
          >
            <FiSettings size={24} />
          </motion.button>
        </motion.div>

        {isAdmin ? (
          <>
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

            {/* Analytics Section */}
            <RegistrationAnalyticsDashboard />
          </>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3"
            >
              {[
                { label: 'My Tickets', value: customerRegistrations.length, icon: FiCheckCircle, color: 'from-cyan-600 to-teal-600' },
                { label: 'Upcoming Events', value: events.filter((event) => event.status === 'scheduled').length, icon: FiCalendar, color: 'from-purple-600 to-pink-600' },
                { label: 'Checked In', value: customerRegistrations.filter((registration) => registration.status === 'checked-in').length, icon: FiCheckCircle, color: 'from-blue-600 to-cyan-600' },
              ].map((stat) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    className={`glass-card-light rounded-xl border border-purple-500/30 bg-gradient-to-br ${stat.color} bg-opacity-10 p-6`}
                  >
                    <Icon className="mb-4 text-cyan-300" size={28} />
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
              <div className="glass-card-light rounded-xl border border-purple-500/30 p-6">
                <h3 className="mb-6 text-xl font-semibold">Recommended Events</h3>
                <div className="space-y-4">
                  {events.slice(0, 3).map((event) => (
                    <Link key={event.id} href={`/events/${event.id}`}>
                      <motion.div
                        whileHover={{ x: 8 }}
                        className="rounded-lg border border-purple-500/20 bg-slate-900/50 p-4 transition-colors hover:border-cyan-400/50"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h4 className="font-semibold">{event.title}</h4>
                            <p className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                              <FiMapPin className="text-cyan-300" />
                              {event.location}
                            </p>
                          </div>
                          <span className="text-lg font-bold text-cyan-300">${event.price}</span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <AuthPanel />
                <div className="glass-card-light rounded-xl border border-purple-500/30 p-6">
                  <h3 className="mb-4 text-lg font-semibold">My Registrations</h3>
                  {customerRegistrations.length > 0 ? (
                    <div className="space-y-3">
                      {customerRegistrations.map((registration) => (
                        <div key={registration.id} className="rounded-lg bg-slate-900/50 p-4">
                          <p className="font-semibold">{registration.userName}</p>
                          <p className="text-sm capitalize text-cyan-300">{registration.ticketType} ticket</p>
                          {registration.bookedSlot && (
                            <p className="mt-1 text-sm text-gray-400">{registration.bookedSlot}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm leading-6 text-gray-400">
                      No tickets yet. Pick an event and complete registration to see it here.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}
