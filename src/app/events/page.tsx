'use client';

import { useMemo, useState } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiFilter, FiMapPin, FiSearch, FiStar, FiUsers } from 'react-icons/fi';
import { useEventStore } from '@/store';
import Link from 'next/link';

export default function EventsPage() {
  const { events } = useEventStore();
  const cities = useMemo(() => Array.from(new Set(events.map((event) => event.city || event.location))), [events]);
  const [selectedCity, setSelectedCity] = useState(cities[0] || 'All Cities');
  const [selectedHallId, setSelectedHallId] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const cityEvents = events.filter((event) => (event.city || event.location) === selectedCity);
  const halls = cityEvents.flatMap((event) =>
    (event.halls || []).map((hall) => ({
      ...hall,
      eventId: event.id,
    }))
  );

  const filteredEvents = cityEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHall = selectedHallId === 'all' || event.halls?.some((hall) => hall.id === selectedHallId);

    return matchesSearch && matchesHall;
  });

  const selectedHallName = halls.find((hall) => hall.id === selectedHallId)?.name;

  return (
    <Layout>
      <section className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-950/70 shadow-2xl shadow-cyan-950/20">
            <div className="relative min-h-[360px] bg-[url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/82 to-slate-950/35" />
              <div className="relative z-10 flex min-h-[360px] max-w-3xl flex-col justify-center p-6 sm:p-10 lg:p-12">
                <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                  <FiMapPin />
                  {selectedCity}
                </p>
                <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                  Events, halls, and seats in one place
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
                  Choose your city, compare halls, pick a slot, and book the event like a real ticketing experience.
                </p>
              </div>
            </div>

            <div className="grid gap-4 border-t border-cyan-400/15 bg-slate-950/90 p-4 lg:grid-cols-[1fr_280px_180px]">
              <div className="relative">
                <FiSearch className="absolute left-4 top-4 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search events, categories, speakers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-cyan-400/20 bg-slate-900/90 py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-cyan-400"
                />
              </div>
              <select
                value={selectedHallId}
                onChange={(e) => setSelectedHallId(e.target.value)}
                className="rounded-lg border border-cyan-400/20 bg-slate-900/90 px-4 py-3 text-white focus:border-cyan-400"
              >
                <option value="all">All halls</option>
                {halls.map((hall) => (
                  <option key={`${hall.eventId}-${hall.id}`} value={hall.id}>
                    {hall.name}
                  </option>
                ))}
              </select>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-400/20 bg-slate-900/90 px-4 py-3 font-semibold text-cyan-100">
                <FiFilter />
                Filter
              </button>
            </div>
          </div>

          <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  setSelectedHallId('all');
                }}
                className={`shrink-0 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                  selectedCity === city
                    ? 'bg-cyan-400 text-slate-950'
                    : 'border border-cyan-400/20 bg-slate-900/80 text-slate-200 hover:border-cyan-300'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Now booking</p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                {selectedHallName ? `Events at ${selectedHallName}` : `Popular events in ${selectedCity}`}
              </h2>
            </div>
            <p className="text-sm text-gray-400">{filteredEvents.length} event{filteredEvents.length === 1 ? '' : 's'} available</p>
          </div>

          {filteredEvents.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {filteredEvents.map((event, idx) => {
                const defaultHall = event.halls?.find((hall) => hall.id === selectedHallId) || event.halls?.[0];
                const bookingHref = `/register?eventId=${event.id}&city=${encodeURIComponent(event.city || event.location)}${
                  defaultHall ? `&hallId=${defaultHall.id}` : ''
                }`;
                const seatsLeft = Math.max(event.capacity - event.registeredCount, 0);

                return (
                  <motion.article
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="overflow-hidden rounded-xl border border-cyan-400/20 bg-slate-950/80 shadow-xl shadow-slate-950/30"
                  >
                    <Link href={`/events/${event.id}`}>
                      <div
                        className="relative aspect-[16/10] bg-cover bg-center"
                        style={{ backgroundImage: `url(${event.thumbnail})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        <div className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-cyan-100">
                          {event.category}
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                          <p className="mt-1 flex items-center gap-2 text-sm text-slate-200">
                            <FiStar className="text-amber-300" />
                            {Math.round((event.registeredCount / event.capacity) * 100)}% booked
                          </p>
                        </div>
                      </div>
                    </Link>

                    <div className="p-5">
                      <div className="space-y-3 text-sm text-gray-300">
                        <p className="flex items-center gap-2">
                          <FiCalendar className="text-cyan-300" />
                          {event.date.toLocaleDateString()} at {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="flex items-start gap-2">
                          <FiMapPin className="mt-0.5 text-cyan-300" />
                          <span>
                            {defaultHall?.name || event.location}
                            <span className="block text-gray-500">{defaultHall ? `${defaultHall.area}, ${event.city}` : event.location}</span>
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <FiUsers className="text-cyan-300" />
                          {seatsLeft} seats left
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-cyan-400/15 pt-5">
                        <div>
                          <p className="text-xs text-gray-500">Starts from</p>
                          <p className="text-2xl font-bold text-cyan-300">${event.price}</p>
                        </div>
                        <Link href={bookingHref}>
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="rounded-lg bg-gradient-to-r from-rose-500 to-amber-400 px-5 py-3 font-bold text-slate-950"
                          >
                            Book
                          </motion.button>
                        </Link>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {['09:30 AM', '01:00 PM', '05:30 PM'].map((time) => (
                          <div key={time} className="rounded-md border border-cyan-400/15 bg-slate-900/70 px-2 py-2 text-center text-xs text-cyan-100">
                            <FiClock className="mx-auto mb-1" />
                            {time}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 rounded-xl border border-cyan-400/20 bg-slate-950/70 py-20 text-center"
            >
              <p className="text-gray-400">No events found for this city and hall.</p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}
