'use client';

import Layout from '@/components/Layout';
import AuthPanel from '@/components/auth/AuthPanel';
import { motion } from 'framer-motion';
import { FiBarChart, FiCalendar, FiShield, FiUsers } from 'react-icons/fi';

const highlights = [
  { label: 'Google secure login', icon: FiShield },
  { label: 'Customer ticket center', icon: FiUsers },
  { label: 'Admin event control', icon: FiCalendar },
  { label: 'Registration reports', icon: FiBarChart },
];

export default function LoginPage() {
  return (
    <Layout>
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_420px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              EventHub Access
            </p>
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
              One login for <span className="gradient-text">admins</span> and customers.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-gray-300">
              Sign in with Google, then choose the workspace you need. Customers can manage
              registrations while admins get event, user, and reporting controls.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="glass-card-light flex items-center gap-3 rounded-xl border border-purple-500/20 p-4"
                  >
                    <Icon className="text-cyan-300" size={22} />
                    <span className="text-sm font-medium text-gray-200">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AuthPanel />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
