'use client';

import { motion } from 'framer-motion';
import { FiBarChart, FiCalendar, FiDownloadCloud, FiTrendingUp, FiUsers } from 'react-icons/fi';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useEventStore } from '@/store';

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const RegistrationAnalyticsDashboard = () => {
  const { events, registrations } = useEventStore();

  const registrationTrend = monthLabels.map((name, monthIndex) => ({
    name,
    registrations: registrations.filter(
      (registration) => registration.registeredAt.getMonth() === monthIndex
    ).length,
  }));

  const ticketSalesData = (['regular', 'vip', 'premium'] as const).map((type, index) => ({
    name: type[0].toUpperCase() + type.slice(1),
    value: registrations.filter((registration) => registration.ticketType === type).length,
    fill: ['#14b8a6', '#0ea5e9', '#f59e0b'][index],
  }));

  const activeEvents = events.filter((event) => event.status === 'scheduled');
  const filledSeats = events.reduce((sum, event) => sum + event.registeredCount, 0);
  const totalCapacity = events.reduce((sum, event) => sum + event.capacity, 0);
  const fillRate = totalCapacity > 0 ? Math.round((filledSeats / totalCapacity) * 100) : 0;

  const stats = [
    { label: 'Active Events', value: activeEvents.length, icon: FiCalendar, color: 'from-teal-600 to-cyan-600' },
    { label: 'Registrations', value: registrations.length, icon: FiUsers, color: 'from-blue-600 to-cyan-600' },
    { label: 'Capacity Filled', value: `${fillRate}%`, icon: FiTrendingUp, color: 'from-amber-500 to-teal-600' },
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl font-bold mb-2">Registration Analytics</h2>
        <p className="text-gray-400">Monitor event demand, ticket mix, and capacity usage</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`glass-card-light p-6 rounded-xl border border-cyan-500/30 bg-gradient-to-br ${stat.color} bg-opacity-10`}
            >
              <div className="mb-4 w-12 h-12 rounded-lg glass-card flex items-center justify-center">
                <Icon size={24} className="text-cyan-400" />
              </div>
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        <motion.div
          variants={itemVariants}
          className="glass-card-light p-6 rounded-xl border border-cyan-500/30"
        >
          <h3 className="text-lg font-semibold mb-6">Registration Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={registrationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(45, 212, 191, 0.2)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis allowDecimals={false} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(45, 212, 191, 0.3)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="registrations"
                stroke="#14b8a6"
                strokeWidth={2}
                dot={{ fill: '#14b8a6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass-card-light p-6 rounded-xl border border-cyan-500/30"
        >
          <h3 className="text-lg font-semibold mb-6">Ticket Type Mix</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ticketSalesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label
              >
                {ticketSalesData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(45, 212, 191, 0.3)',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="glass-card-light p-6 rounded-xl border border-cyan-500/30"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FiBarChart />
            Event Capacity
          </h3>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 glass-card border border-cyan-500/30 rounded-lg hover:border-cyan-500/60 transition-colors"
          >
            <FiDownloadCloud size={18} />
            Export Report
          </button>
        </div>

        <div className="space-y-4">
          {events.map((event) => {
            const percentage = event.capacity > 0 ? Math.round((event.registeredCount / event.capacity) * 100) : 0;

            return (
              <div key={event.id} className="rounded-lg border border-cyan-500/10 bg-slate-950/35 p-4">
                <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-gray-400">
                    {event.registeredCount} / {event.capacity} seats
                  </p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-cyan-500/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-sky-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default RegistrationAnalyticsDashboard;
