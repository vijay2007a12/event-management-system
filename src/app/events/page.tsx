'use client';

import { useMemo, useState } from 'react';
import { ReactNode } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { FiChevronDown, FiClock, FiMapPin, FiMenu, FiSearch, FiSliders, FiStar, FiUsers } from 'react-icons/fi';
import { useEventStore } from '@/store';
import Link from 'next/link';

const navItems = ['Events', 'Workshops', 'Comedy', 'Music', 'Meetups', 'Conferences'];
const dateFilters = ['Today', 'Tomorrow', 'This Weekend', 'Next 7 Days'];
const languageFilters = ['English', 'Tamil', 'Hindi'];
const formatFilters = ['Indoor', 'Outdoor', 'Family Friendly', 'Networking'];

export default function EventsPage() {
  const { events } = useEventStore();
  const cities = useMemo(() => Array.from(new Set(events.map((event) => event.city || event.location))), [events]);
  const defaultCity = cities.includes('Chennai') ? 'Chennai' : cities[0] || 'All Cities';
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [selectedHallId, setSelectedHallId] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const cityEvents = events.filter((event) => (event.city || event.location) === selectedCity);
  const categories = ['All', ...Array.from(new Set(cityEvents.map((event) => event.category)))];
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
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;

    return matchesSearch && matchesHall && matchesCategory;
  });

  return (
    <Layout>
      <section className="min-h-screen bg-slate-100 pb-20 pt-20 text-slate-950">
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-2xl font-black tracking-tight text-slate-900">
              event<span className="rounded-md bg-rose-500 px-1.5 py-0.5 text-white">hub</span>
            </Link>

            <div className="relative hidden flex-1 md:block">
              <FiSearch className="absolute left-4 top-3.5 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search for events, workshops, comedy shows and meetups"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-md border border-slate-200 bg-white py-3 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:border-rose-400 focus:shadow-none"
              />
            </div>

            <select
              value={selectedCity}
              onChange={(event) => {
                setSelectedCity(event.target.value);
                setSelectedHallId('all');
                setSelectedCategory('All');
              }}
              className="w-36 rounded-md border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 focus:border-rose-400 focus:shadow-none"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <Link href="/login">
              <button className="hidden rounded-md bg-rose-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/20 sm:block">
                Sign in
              </button>
            </Link>
            <button className="rounded-md border border-slate-200 p-3 text-slate-700">
              <FiMenu size={22} />
            </button>
          </div>

          <div className="border-t border-slate-100 bg-slate-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 overflow-x-auto px-4 py-3 text-sm sm:px-6 lg:px-8">
              <div className="flex gap-7">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedCategory(item === 'Events' ? 'All' : item === 'Comedy' ? 'Comedy Shows' : item === 'Music' ? 'Music Shows' : item)}
                    className={`whitespace-nowrap font-medium ${
                      (item === 'Events' && selectedCategory === 'All') ||
                      item === selectedCategory ||
                      (item === 'Comedy' && selectedCategory === 'Comedy Shows') ||
                      (item === 'Music' && selectedCategory === 'Music Shows')
                        ? 'text-rose-500'
                        : 'text-slate-700 hover:text-rose-500'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="hidden gap-7 text-slate-600 lg:flex">
                <span>ListYourShow</span>
                <span>Offers</span>
                <span>Gift Cards</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-9 px-4 pt-12 sm:px-6 lg:grid-cols-[376px_1fr] lg:px-8">
          <aside className="hidden lg:block">
            <h2 className="mb-8 text-3xl font-bold">Filters</h2>
            <div className="space-y-4">
              <FilterPanel title="Categories">
                <div className="flex flex-wrap gap-2">
                  {categories.filter((category) => category !== 'All').map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`border px-4 py-3 text-sm font-medium ${
                        selectedCategory === category
                          ? 'border-rose-500 bg-rose-50 text-rose-500'
                          : 'border-slate-200 bg-white text-rose-500 hover:border-rose-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </FilterPanel>

              <FilterPanel title="Date">
                <div className="flex flex-wrap gap-2">
                  {dateFilters.map((item) => (
                    <span key={item} className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                      {item}
                    </span>
                  ))}
                </div>
              </FilterPanel>

              <FilterPanel title="Halls">
                <select
                  value={selectedHallId}
                  onChange={(event) => setSelectedHallId(event.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 focus:border-rose-400 focus:shadow-none"
                >
                  <option value="all">All halls in {selectedCity}</option>
                  {halls.map((hall) => (
                    <option key={`${hall.eventId}-${hall.id}`} value={hall.id}>
                      {hall.name}
                    </option>
                  ))}
                </select>
              </FilterPanel>

              <FilterPanel title="Languages">
                <div className="flex flex-wrap gap-2">
                  {languageFilters.map((item) => (
                    <span key={item} className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                      {item}
                    </span>
                  ))}
                </div>
              </FilterPanel>

              <FilterPanel title="More Filters">
                <div className="flex flex-wrap gap-2">
                  {formatFilters.map((item) => (
                    <span key={item} className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                      {item}
                    </span>
                  ))}
                </div>
              </FilterPanel>
            </div>
          </aside>

          <main>
            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-rose-500">
                  <FiMapPin />
                  {selectedCity}
                </p>
                <h1 className="text-3xl font-bold md:text-4xl">Events In {selectedCity}</h1>
              </div>
              <button className="inline-flex w-fit items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 lg:hidden">
                <FiSliders />
                Filters
              </button>
            </div>

            <div className="mb-9 flex gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 rounded-full border px-5 py-3 text-sm transition-all ${
                    selectedCategory === category
                      ? 'border-rose-500 bg-rose-500 text-white'
                      : 'border-slate-300 bg-white text-rose-500 hover:border-rose-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {filteredEvents.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filteredEvents.map((event, index) => {
                  const defaultHall = event.halls?.find((hall) => hall.id === selectedHallId) || event.halls?.[0];
                  const bookingHref = `/register?eventId=${event.id}&city=${encodeURIComponent(event.city || event.location)}${
                    defaultHall ? `&hallId=${defaultHall.id}` : ''
                  }`;
                  const seatsLeft = Math.max(event.capacity - event.registeredCount, 0);
                  const dateLabel = event.date.toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: '2-digit',
                    month: 'short',
                  });

                  return (
                    <motion.article
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06 }}
                      className="group"
                    >
                      <Link href={`/events/${event.id}`}>
                        <div
                          className="relative aspect-[2/3] overflow-hidden rounded-lg bg-cover bg-center shadow-xl shadow-slate-300/70"
                          style={{ backgroundImage: `url(${event.thumbnail})` }}
                        >
                          <div className="absolute left-0 top-4 rounded-r bg-rose-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                            Promoted
                          </div>
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent px-4 pb-4 pt-16">
                            <p className="text-lg font-semibold text-white">{dateLabel}</p>
                            <p className="mt-1 flex items-center gap-2 text-xs text-white/80">
                              <FiClock />
                              {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </Link>

                      <div className="pt-4">
                        <h2 className="line-clamp-2 text-lg font-bold text-slate-950">{event.title}</h2>
                        <p className="mt-1 text-sm text-slate-500">{event.category}</p>
                        <p className="mt-3 flex items-start gap-2 text-sm text-slate-600">
                          <FiMapPin className="mt-0.5 shrink-0 text-rose-500" />
                          <span>
                            {defaultHall?.name || event.location}
                            <span className="block text-slate-400">{defaultHall ? `${defaultHall.area}, ${event.city}` : event.location}</span>
                          </span>
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                              <FiUsers />
                              {seatsLeft} seats left
                            </p>
                            <p className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                              <FiStar />
                              {Math.round((event.registeredCount / event.capacity) * 100)}% booked
                            </p>
                          </div>
                          <Link href={bookingHref}>
                            <button className="rounded-md bg-rose-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-500/25 transition-colors hover:bg-rose-600">
                              Book
                            </button>
                          </Link>
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
                className="rounded-xl border border-slate-200 bg-white py-20 text-center"
              >
                <p className="text-slate-500">No events found for these filters.</p>
              </motion.div>
            )}
          </main>
        </div>
      </section>
    </Layout>
  );
}

function FilterPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-md bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-lg font-medium text-slate-900">
          <FiChevronDown size={16} />
          {title}
        </h3>
        <button className="text-sm text-slate-500">Clear</button>
      </div>
      {children}
    </div>
  );
}
