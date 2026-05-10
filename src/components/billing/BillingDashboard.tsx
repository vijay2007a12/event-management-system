'use client';

import { motion } from 'framer-motion';
import { FiTrendingUp, FiDollarSign, FiBarChart, FiDownloadCloud } from 'react-icons/fi';
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

const BillingDashboard = () => {
  const revenueData = [
    { name: 'Jan', revenue: 4000, expected: 5000 },
    { name: 'Feb', revenue: 6000, expected: 5500 },
    { name: 'Mar', revenue: 8000, expected: 6000 },
    { name: 'Apr', revenue: 10000, expected: 7000 },
    { name: 'May', revenue: 12000, expected: 8000 },
    { name: 'Jun', revenue: 15000, expected: 9000 },
  ];

  const ticketSalesData = [
    { name: 'Regular', value: 400, fill: '#a855f7' },
    { name: 'VIP', value: 300, fill: '#0ea5e9' },
    { name: 'Premium', value: 200, fill: '#06b6d4' },
  ];

  const invoiceData = [
    { id: 'INV-001', date: '2024-01-15', amount: 2500, status: 'paid' },
    { id: 'INV-002', date: '2024-01-20', amount: 3500, status: 'paid' },
    { id: 'INV-003', date: '2024-02-05', amount: 1800, status: 'pending' },
    { id: 'INV-004', date: '2024-02-10', amount: 4200, status: 'pending' },
  ];

  const stats = [
    { label: 'Total Revenue', value: '$58,500', change: '+12.5%', icon: FiDollarSign, color: 'from-purple-600 to-pink-600' },
    { label: 'Avg. Ticket Price', value: '$85', change: '+4.2%', icon: FiTrendingUp, color: 'from-blue-600 to-cyan-600' },
    { label: 'Total Transactions', value: '1,243', change: '+8.1%', icon: FiBarChart, color: 'from-cyan-600 to-teal-600' },
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl font-bold mb-2">Billing & Analytics</h2>
        <p className="text-gray-400">Monitor revenue, payments, and financial performance</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {stats.map((stat, idx) => {
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
                <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        {/* Revenue Chart */}
        <motion.div
          variants={itemVariants}
          className="glass-card-light p-6 rounded-xl border border-purple-500/30"
        >
          <h3 className="text-lg font-semibold mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 85, 247, 0.2)" />
              <XAxis stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7' }} />
              <Line type="monotone" dataKey="expected" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Ticket Sales Distribution */}
        <motion.div
          variants={itemVariants}
          className="glass-card-light p-6 rounded-xl border border-purple-500/30"
        >
          <h3 className="text-lg font-semibold mb-6">Ticket Sales Distribution</h3>
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
                {ticketSalesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Invoices Table */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="glass-card-light p-6 rounded-xl border border-purple-500/30"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Recent Invoices</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 glass-card border border-purple-500/30 rounded-lg hover:border-purple-500/60 transition-colors"
          >
            <FiDownloadCloud size={18} />
            Export
          </motion.button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-purple-500/20">
                <th className="text-left py-3 px-4 font-semibold">Invoice ID</th>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
                <th className="text-left py-3 px-4 font-semibold">Amount</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.map((invoice) => (
                <motion.tr
                  key={invoice.id}
                  whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                  className="border-b border-purple-500/10 transition-colors"
                >
                  <td className="py-4 px-4">{invoice.id}</td>
                  <td className="py-4 px-4 text-gray-400">{invoice.date}</td>
                  <td className="py-4 px-4 font-semibold">${invoice.amount}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      invoice.status === 'paid'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <motion.button
                      whileHover={{ color: '#a855f7' }}
                      className="text-cyan-400 hover:text-purple-400 transition-colors text-sm"
                    >
                      View
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Payment Methods */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
      >
        {[
          { name: 'Card Payments', amount: '$35,000', percentage: 60 },
          { name: 'UPI Transfers', amount: '$15,500', percentage: 26 },
          { name: 'Bank Transfer', amount: '$8,000', percentage: 14 },
        ].map((method, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="glass-card-light p-6 rounded-xl border border-purple-500/30"
          >
            <p className="text-gray-400 text-sm mb-2">{method.name}</p>
            <p className="text-2xl font-bold mb-4">{method.amount}</p>
            <div className="w-full bg-purple-500/10 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${method.percentage}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">{method.percentage}% of total</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BillingDashboard;
