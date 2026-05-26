'use client';

import { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

export default function Home() {
  return (
    <Layout>
      {chapters.map((chapter, index) => (
        <ScrollChapter key={chapter.title} index={index} onEnter={() => undefined}>
          {chapter.content}
        </ScrollChapter>
      ))}
    </Layout>
  );
}
