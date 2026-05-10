'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import Layout from '@/components/Layout';
import HeroSection from '@/components/hero/HeroSection';
import FeaturesSection from '@/components/hero/FeaturesSection';
import EventPlanningDashboard from '@/components/planning/EventPlanningDashboard';
import RegistrationForm from '@/components/registration/RegistrationForm';
import RegistrationAnalyticsDashboard from '@/components/analytics/RegistrationAnalyticsDashboard';

const chapters = [
  { title: 'Launch', subtitle: 'Immersive event command center', content: <HeroSection /> },
  { title: 'Discover', subtitle: 'Tools that appear as you scroll', content: <FeaturesSection /> },
  { title: 'Plan', subtitle: 'Create and schedule live events', content: <EventPlanningDashboard /> },
  { title: 'Register', subtitle: 'Guide attendees through booking', content: <RegistrationForm /> },
  { title: 'Analyze', subtitle: 'Track registrations and capacity', content: <RegistrationAnalyticsDashboard /> },
];

function ScrollChapter({
  children,
  index,
  onEnter,
}: {
  children: ReactNode;
  index: number;
  onEnter: (index: number) => void;
}) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 34 : -34, index % 2 === 0 ? -34 : 34]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1.01, 0.98]);

  return (
    <motion.div
      style={{ y, scale }}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => onEnter(index)}
      viewport={{ once: false, amount: 0.42 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative cinematic-chapter"
    >
      {children}
    </motion.div>
  );
}

function ScrollDirector({ activeChapter }: { activeChapter: number }) {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });
  const chapterMotion = useMotionValue(activeChapter);
  const smoothChapter = useSpring(chapterMotion, { stiffness: 170, damping: 24, mass: 0.4 });
  const titleY = useTransform(smoothChapter, (latest) => `-${latest * 100}%`);

  useEffect(() => {
    chapterMotion.set(activeChapter);
  }, [activeChapter, chapterMotion]);

  return (
    <div className="pointer-events-none fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
      <div className="glass-card-light flex w-56 items-center gap-4 rounded-xl border border-cyan-400/20 p-4 shadow-2xl shadow-cyan-900/20">
        <div className="relative h-44 w-1 overflow-hidden rounded-full bg-slate-700/80">
          <motion.div
            style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
            className="absolute left-0 top-0 h-full w-full rounded-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400"
          />
        </div>

        <div className="min-w-0">
          <p className="mb-2 text-xs uppercase tracking-[0.28em] text-cyan-200/80">
            Scene {String(activeChapter + 1).padStart(2, '0')}
          </p>
          <div className="h-9 overflow-hidden">
            <motion.div style={{ y: titleY }}>
              {chapters.map((chapter) => (
                <h2 key={chapter.title} className="h-9 text-2xl font-bold leading-9 text-white">
                  {chapter.title}
                </h2>
              ))}
            </motion.div>
          </div>
          <p className="mt-2 text-sm leading-5 text-gray-300">
            {chapters[activeChapter].subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeChapter, setActiveChapter] = useState(0);

  return (
    <Layout>
      <ScrollDirector activeChapter={activeChapter} />
      {chapters.map((chapter, index) => (
        <ScrollChapter key={chapter.title} index={index} onEnter={setActiveChapter}>
          {chapter.content}
        </ScrollChapter>
      ))}
    </Layout>
  );
}
