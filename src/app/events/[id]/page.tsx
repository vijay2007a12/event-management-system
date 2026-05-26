'use client';

import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiCalendar, FiMapPin, FiUsers, FiDollarSign, FiMic, FiCoffee, FiGift, FiShare2, FiClock } from 'react-icons/fi';
import { useEventStore } from '@/store';

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const { events } = useEventStore();
  const event = events.find(e => e.id === params.id);

  if (!event) {
    return (
      <Layout>
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <p className="text-gray-400 mb-8">The event you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold inline-flex items-center gap-2"
            >
              <FiArrowLeft />
              Back to Events
            </motion.button>
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/events">
          <motion.button
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8"
          >
            <FiArrowLeft />
            Back to Events
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card-light rounded-2xl border border-purple-500/30 overflow-hidden"
        >
          {/* Hero Image */}
          <div
            className="relative aspect-video bg-cover bg-center"
            style={{ backgroundImage: `url(${event.thumbnail})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-full border border-cyan-300/30 bg-slate-950/80 px-4 py-2 text-sm font-semibold text-cyan-100">
              {event.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
                
                <div className="space-y-4 mb-8 text-lg text-gray-400">
                  <div className="flex items-center gap-3">
                    <FiCalendar className="text-purple-400 flex-shrink-0" />
                    <span>{event.date.toLocaleDateString()} at 2:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMapPin className="text-cyan-400 flex-shrink-0" />
                    <span>{event.city || event.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiUsers className="text-purple-400 flex-shrink-0" />
                    <span>{event.registeredCount} / {event.capacity} attendees</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiDollarSign className="text-cyan-400 flex-shrink-0" />
                    <span>${event.price} per ticket</span>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none mb-8">
                  <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {event.description}
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    Join us for an unforgettable experience at this premium event. This event brings together industry leaders, innovators, and enthusiasts for a day of inspiring talks, networking, and celebration.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-semibold">Choose Hall</h2>
                  <div className="space-y-3">
                    {(event.halls || []).map((hall) => (
                      <div
                        key={hall.id}
                        className="grid gap-4 rounded-xl border border-cyan-400/20 bg-slate-950/50 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                      >
                        <div>
                          <p className="font-semibold text-white">{hall.name}</p>
                          <p className="mt-1 text-sm text-gray-400">{hall.area} - {hall.address}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {['09:30 AM', '01:00 PM', '05:30 PM'].map((time) => (
                              <span key={time} className="inline-flex items-center gap-1 rounded-full border border-cyan-400/20 px-3 py-1 text-xs text-cyan-100">
                                <FiClock />
                                {time}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Link href={`/register?eventId=${event.id}&city=${encodeURIComponent(event.city || event.location)}&hallId=${hall.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="rounded-lg bg-gradient-to-r from-rose-500 to-amber-400 px-5 py-3 font-bold text-slate-950"
                          >
                            Book Hall
                          </motion.button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: FiMic, title: 'Expert Speakers', description: 'Industry leaders' },
                    { icon: FiCoffee, title: 'Catering', description: 'Premium meals' },
                    { icon: FiGift, title: 'Gifts', description: 'Swag bag included' },
                    { icon: FiUsers, title: 'Networking', description: 'Connect with peers' },
                  ].map((feature, idx) => {
                    const Icon = feature.icon;

                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="p-4 glass-card rounded-lg border border-purple-500/20 text-center"
                      >
                        <Icon className="mx-auto mb-2 text-cyan-400" size={30} />
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-sm text-gray-400">{feature.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-xl border border-purple-500/30 sticky top-24"
                >
                  <h3 className="text-lg font-semibold mb-4">Event Details</h3>

                  <div className="space-y-4 mb-6 pb-6 border-b border-purple-500/20">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        event.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                        event.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Organizer</p>
                      <p className="font-semibold">{event.organizer}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Category</p>
                      <p className="font-semibold">{event.category}</p>
                    </div>
                  </div>

                  <Link href={`/register?eventId=${event.id}&city=${encodeURIComponent(event.city || event.location)}${event.halls?.[0] ? `&hallId=${event.halls[0].id}` : ''}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold text-lg mb-3"
                    >
                      Register Now
                    </motion.button>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="w-full px-6 py-3 glass-card border border-purple-500/30 rounded-lg font-semibold hover:border-purple-500/60 transition-all inline-flex items-center justify-center gap-2"
                  >
                    <FiShare2 />
                    Share Event
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
