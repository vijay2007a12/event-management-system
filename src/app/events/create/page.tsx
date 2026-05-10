'use client';

import { FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useEventStore } from '@/store';
import Link from 'next/link';

export default function CreateEventPage() {
  const { addEvent, addNotification } = useEventStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    price: '',
    category: 'general',
  });

  const steps = ['Basic Info', 'Details', 'Review'];

  const handleNext = () => {
    if (step < steps.length) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newEvent = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: new Date(formData.date),
      location: formData.location,
      capacity: parseInt(formData.capacity) || 0,
      registeredCount: 0,
      status: 'draft' as const,
      organizer: 'Current User',
      category: formData.category,
      price: parseInt(formData.price) || 0,
    };

    addEvent(newEvent);
    addNotification({
      id: Date.now().toString(),
      userId: 'current-user',
      title: 'Event Created!',
      message: `"${formData.title}" has been created successfully.`,
      type: 'success',
      read: false,
      timestamp: new Date(),
    });

    // Redirect after creation
    setTimeout(() => {
      window.location.href = '/events';
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Layout>
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Link href="/events">
            <motion.button
              whileHover={{ x: -4 }}
              className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-6"
            >
              <FiArrowLeft />
              Back to Events
            </motion.button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Create New Event</h1>
          <p className="text-gray-400">Build an amazing event experience</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="glass-card-light p-8 rounded-2xl border border-purple-500/30"
        >
          {/* Progress */}
          <div className="flex gap-4 mb-12">
            {steps.map((s, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2"
              >
                <motion.div
                  animate={{
                    backgroundColor: idx + 1 <= step ? 'rgb(168, 85, 247)' : 'rgba(168, 85, 247, 0.2)',
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
                >
                  {idx + 1}
                </motion.div>
                <span className={idx + 1 <= step ? 'text-purple-400' : 'text-gray-500'}>
                  {s}
                </span>
                {idx < steps.length - 1 && (
                  <div className={`h-1 w-12 mx-2 rounded ${
                    idx + 1 < step ? 'bg-purple-600' : 'bg-purple-500/20'
                  }`} />
                )}
              </motion.div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1 */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>
                <input
                  type="text"
                  placeholder="Event Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-neon-purple transition-all"
                  required
                />
                <textarea
                  placeholder="Event Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-neon-purple transition-all"
                  rows={4}
                  required
                />
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-semibold mb-6">Event Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white focus:border-purple-500 focus:shadow-neon-purple transition-all"
                    required
                  />
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white focus:border-purple-500 focus:shadow-neon-purple transition-all"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Location / Venue"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-neon-purple transition-all"
                  required
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white focus:border-purple-500 focus:shadow-neon-purple transition-all"
                >
                  <option value="general">General</option>
                  <option value="tech">Tech & Innovation</option>
                  <option value="business">Business</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="sports">Sports</option>
                  <option value="education">Education</option>
                </select>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Capacity"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-neon-purple transition-all"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price per Ticket ($)"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-neon-purple transition-all"
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-semibold mb-6">Review Your Event</h2>
                <div className="space-y-3 bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Title:</span>
                    <span className="font-semibold">{formData.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="font-semibold">{formData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time:</span>
                    <span className="font-semibold">{formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location:</span>
                    <span className="font-semibold">{formData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="font-semibold capitalize">{formData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Capacity:</span>
                    <span className="font-semibold">{formData.capacity} attendees</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span className="font-semibold">${formData.price}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  Review your event details. Once created, you&apos;ll be able to edit these details from your dashboard.
                </p>
              </motion.div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t border-purple-500/20">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handlePrev}
                disabled={step === 1}
                className="px-6 py-3 glass-card-light border border-purple-500/30 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <FiArrowLeft /> Previous
              </motion.button>

              {step < steps.length ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleNext}
                  className="flex-grow px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  Next <FiArrowRight />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex-grow px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg font-semibold"
                >
                  Create Event
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </section>
    </Layout>
  );
}
