'use client';

import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiHome } from 'react-icons/fi';

export default function NotFound() {
  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto"
        >
          {/* Animated 404 */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mb-8"
          >
            <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
          </motion.div>

          <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-400 text-lg mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* Suggestions */}
          <div className="glass-card-light p-6 rounded-xl border border-purple-500/30 mb-8">
            <p className="text-sm text-gray-400 mb-4">Here are some helpful links:</p>
            <div className="space-y-2">
              <Link href="/">
                <motion.button
                  whileHover={{ x: 8 }}
                  className="w-full text-left px-4 py-2 hover:bg-purple-500/10 rounded transition-colors flex items-center gap-2"
                >
                  <FiHome size={18} />
                  Go to Home
                </motion.button>
              </Link>
              <Link href="/events">
                <motion.button
                  whileHover={{ x: 8 }}
                  className="w-full text-left px-4 py-2 hover:bg-purple-500/10 rounded transition-colors flex items-center gap-2"
                >
                  <FiArrowRight size={18} />
                  View Events
                </motion.button>
              </Link>
              <Link href="/planning">
                <motion.button
                  whileHover={{ x: 8 }}
                  className="w-full text-left px-4 py-2 hover:bg-purple-500/10 rounded transition-colors flex items-center gap-2"
                >
                  <FiArrowRight size={18} />
                  Event Planning
                </motion.button>
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold inline-flex items-center gap-2"
            >
              Return Home
              <FiArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
}
