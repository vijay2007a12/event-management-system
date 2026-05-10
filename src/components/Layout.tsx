'use client';

import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ParticleBackground from './background/ParticleBackground';
import Notifications from './Notifications';

interface LayoutProps {
  children: ReactNode;
  hideSidebar?: boolean;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative w-full min-h-screen bg-dark-950 text-gray-100 overflow-x-hidden">
      {/* Animated background */}
      <ParticleBackground />

      {/* Gradient overlays */}
      <div className="fixed inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-radial from-cyan-900/10 via-transparent to-transparent pointer-events-none" />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10 pt-20">
        {children}
      </main>

      {/* Notifications */}
      <Notifications />

      {/* Footer */}
      <Footer />
    </div>
  );
}
