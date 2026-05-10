'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiBell } from 'react-icons/fi';
import { useEventStore } from '@/store';
import AuthPanel from './auth/AuthPanel';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, user } = useEventStore();
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Planning', href: '/planning' },
    { name: 'Register', href: '/register' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-cyan-300/25 bg-slate-950/88 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold neon-glow"
            >
              EH
            </motion.div>
            <span className="text-xl font-bold text-cyan-100">EventHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.span
                  whileHover={{ color: '#67e8f9' }}
                  className="text-slate-100/90 hover:text-cyan-200 transition-colors relative group cursor-pointer font-medium"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-sky-400 group-hover:w-full transition-all duration-300" />
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Right side - Notifications & Auth */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative text-slate-100/90 hover:text-cyan-200 transition-colors"
            >
              <FiBell size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </motion.button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-slate-100 hover:text-cyan-200"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <div className="hidden md:block">
              {user ? <AuthPanel compact /> : (
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-teal-500 to-sky-500 rounded-lg font-semibold text-white hover:shadow-neon-cyan transition-all"
                  >
                    Login
                  </motion.button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-4 pt-4 pb-6 space-y-4 border-t border-cyan-400/20 bg-slate-950/95">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ x: 8 }}
                  className="text-slate-100 hover:text-cyan-200 transition-colors cursor-pointer"
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
            <div className="pt-2">
              {user ? <AuthPanel compact /> : (
                <Link href="/login">
                  <button className="w-full rounded-lg bg-gradient-to-r from-teal-500 to-sky-500 px-4 py-3 font-semibold text-white">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
