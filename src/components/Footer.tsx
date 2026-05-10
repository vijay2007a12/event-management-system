'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: 'Features', href: '/#features' },
      { name: 'Events', href: '/events' },
      { name: 'Planning', href: '/planning' },
      { name: 'Dashboard', href: '/dashboard' },
    ],
    Company: [
      { name: 'About', href: '/#features' },
      { name: 'Create Event', href: '/events/create' },
      { name: 'Register', href: '/register' },
      { name: 'Contact', href: 'mailto:hello@eventhub.example' },
    ],
    Legal: [
      { name: 'Privacy', href: '/' },
      { name: 'Terms', href: '/' },
      { name: 'Cookies', href: '/' },
      { name: 'Compliance', href: '/' },
    ],
  };

  const socialLinks = [
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiGithub, href: '#', label: 'GitHub' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:hello@eventhub.example', label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-purple-500/20 glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 mb-4 group cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold">
                EH
              </div>
              <span className="text-lg font-bold gradient-text">EventHub</span>
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The next-generation platform for managing events with immersive 3D visuals and premium experiences.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <motion.span
                        whileHover={{ x: 4, color: '#a855f7' }}
                        className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer block"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-purple-500/10 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">
            Copyright {currentYear} EventHub. All rights reserved. Built for event creators.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-gray-400 hover:text-purple-400 hover:shadow-neon-purple transition-all"
                  aria-label={social.label}
                >
                  <Icon size={18} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
