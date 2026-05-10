'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useEventStore } from '@/store';
import Link from 'next/link';

export default function EventsPage() {
  const { events } = useEventStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">Explore Events</h1>
          <p className="text-xl text-gray-400 mb-8">Discover and register for upcoming events</p>

          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="flex-grow relative">
              <FiSearch className="absolute left-4 top-4 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-neon-purple transition-all"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 glass-card-light border border-purple-500/30 rounded-lg flex items-center gap-2 hover:border-purple-500/60 transition-all"
            >
              <FiFilter size={20} />
              Filter
            </motion.button>
          </div>
        </motion.div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card-light p-6 rounded-xl border border-purple-500/30 hover:border-purple-500/60 transition-all group cursor-pointer"
              >
                <Link href={`/events/${event.id}`}>
                  <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-lg mb-4 flex items-center justify-center group-hover:from-purple-600/30 group-hover:to-cyan-600/30 transition-all">
                    <FiCalendar className="text-purple-300" size={44} />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiCalendar size={16} className="text-purple-400" />
                      {event.date.toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiMapPin size={16} className="text-cyan-400" />
                      {event.location}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-purple-500/20 flex justify-between items-center">
                    <span className="text-lg font-bold text-cyan-400">${event.price}</span>
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      event.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                      event.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 glass-card-light rounded-xl border border-purple-500/20"
          >
            <p className="text-gray-400 mb-4">No events found matching your search.</p>
            <Link href="/events/create">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold"
              >
                Create First Event
              </motion.button>
            </Link>
          </motion.div>
        )}
      </section>
    </Layout>
  );
}
