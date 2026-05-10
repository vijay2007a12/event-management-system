'use client';

import { FormEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiCalendar, FiMapPin, FiUsers, FiDollarSign, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useEventStore } from '@/store';

const EventPlanningDashboard = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEventStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    capacity: '',
    price: '',
  });

  const handleCreateEvent = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const newEvent = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: new Date(),
      location: formData.location,
      capacity: parseInt(formData.capacity) || 0,
      registeredCount: 0,
      status: 'draft' as const,
      organizer: 'Current User',
      category: 'General',
      price: parseInt(formData.price) || 0,
    };

    addEvent(newEvent);
    setFormData({ title: '', description: '', location: '', capacity: '', price: '' });
    setShowForm(false);
  };

  const handleScheduleEvent = (eventId: string) => {
    updateEvent(eventId, { status: 'scheduled' });
  };

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
        className="flex justify-between items-center mb-12"
      >
        <div>
          <h2 className="text-4xl font-bold mb-2">Event Planning Suite</h2>
          <p className="text-gray-400">Create, manage, and monitor your events</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold flex items-center gap-2"
        >
          <FiPlus size={20} />
          New Event
        </motion.button>
      </motion.div>

      {/* Create Event Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 glass-card-light p-8 rounded-xl border border-purple-500/30"
          >
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-neon-purple transition-all"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-neon-purple transition-all"
                />
              </div>
              <textarea
                placeholder="Event Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-neon-purple transition-all"
                rows={3}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Capacity"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-neon-purple transition-all"
                />
                <input
                  type="number"
                  placeholder="Price ($)"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-neon-purple transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold hover:shadow-neon-purple transition-all"
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Events Grid */}
      {events.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="glass-card-light p-6 rounded-xl border border-purple-500/30 hover:border-purple-500/60 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold flex-grow">{event.title}</h3>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-purple-500/20 rounded transition-colors">
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="p-2 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-4">{event.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FiMapPin size={16} className="text-purple-400" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FiCalendar size={16} className="text-cyan-400" />
                  {event.date.toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FiUsers size={16} className="text-purple-400" />
                  {event.registeredCount} / {event.capacity} attendees
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FiDollarSign size={16} className="text-cyan-400" />
                  ${event.price} per ticket
                </div>
              </div>

              <div className="pt-4 border-t border-purple-500/20 flex gap-2">
                <span className={`flex-grow px-3 py-1 rounded text-xs font-semibold text-center ${
                  event.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                  event.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {event.status}
                </span>
                {event.status === 'draft' && (
                  <button
                    onClick={() => handleScheduleEvent(event.id)}
                    className="px-3 py-1 rounded text-xs font-semibold bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors"
                  >
                    Schedule
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 glass-card-light rounded-xl border border-purple-500/20"
        >
          <p className="text-gray-400 mb-4">No events yet. Create your first event!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold inline-flex items-center gap-2"
          >
            <FiPlus size={20} />
            Create Event
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};

export default EventPlanningDashboard;
