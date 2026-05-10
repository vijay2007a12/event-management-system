'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithPopup, signOut } from 'firebase/auth';
import { FiLogIn, FiLogOut, FiShield, FiUser } from 'react-icons/fi';
import { firebaseAuth, googleProvider } from '@/lib/firebase';
import { useEventStore } from '@/store';
import { User } from '@/types';
import { ROLE_STORAGE_KEY } from './AuthProvider';

const roles: Array<{
  id: User['role'];
  label: string;
  description: string;
  icon: typeof FiUser;
}> = [
  {
    id: 'customer',
    label: 'Customer',
    description: 'Browse events, register, and manage your tickets.',
    icon: FiUser,
  },
  {
    id: 'admin',
    label: 'Admin',
    description: 'Manage events, users, payments, and reports.',
    icon: FiShield,
  },
];

export default function AuthPanel({ compact = false }: { compact?: boolean }) {
  const { user, setUser, addNotification } = useEventStore();
  const [isWorking, setIsWorking] = useState(false);

  const handleGoogleLogin = async () => {
    if (!firebaseAuth || !googleProvider) {
      addNotification({
        id: `note-firebase-missing-${Date.now()}`,
        userId: 'guest',
        title: 'Firebase is not configured',
        message: 'Add the Firebase environment variables in Vercel to enable Google login.',
        type: 'warning',
        read: false,
        timestamp: new Date(),
      });
      return;
    }

    setIsWorking(true);

    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const role = (window.localStorage.getItem(ROLE_STORAGE_KEY) as User['role']) || 'customer';

      setUser({
        id: result.user.uid,
        email: result.user.email || '',
        name: result.user.displayName || result.user.email || 'EventHub user',
        avatar: result.user.photoURL || undefined,
        role,
        createdAt: new Date(),
      });

      addNotification({
        id: `note-login-${Date.now()}`,
        userId: result.user.uid,
        title: 'Signed in with Google',
        message: 'Your EventHub workspace is ready.',
        type: 'success',
        read: false,
        timestamp: new Date(),
      });
    } finally {
      setIsWorking(false);
    }
  };

  const handleSignOut = async () => {
    if (!firebaseAuth) return;

    await signOut(firebaseAuth);
    setUser(null);
  };

  const handleRoleChange = (role: User['role']) => {
    if (!user) return;

    window.localStorage.setItem(ROLE_STORAGE_KEY, role);
    setUser({ ...user, role });
  };

  if (!user) {
    return (
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleGoogleLogin}
        disabled={isWorking || !firebaseAuth || !googleProvider}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 px-5 py-2.5 font-semibold text-white transition-all hover:shadow-neon-purple disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FiLogIn size={18} />
        {!firebaseAuth || !googleProvider ? 'Firebase Setup Needed' : isWorking ? 'Signing in...' : 'Google Login'}
      </motion.button>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-8 w-8 rounded-full border border-cyan-400/40"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-purple-200">
            <FiUser size={16} />
          </div>
        )}
        <span className="hidden max-w-28 truncate text-sm text-gray-300 lg:block">{user.name}</span>
        <button
          onClick={handleSignOut}
          className="rounded-lg border border-purple-500/30 p-2 text-gray-300 transition-colors hover:border-red-400/60 hover:text-red-300"
          aria-label="Sign out"
        >
          <FiLogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card-light rounded-xl border border-purple-500/30 p-6">
      <div className="mb-6 flex items-center gap-4">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-14 w-14 rounded-full border border-cyan-400/40"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/20 text-purple-200">
            <FiUser size={24} />
          </div>
        )}
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold">{user.name}</h2>
          <p className="truncate text-sm text-gray-400">{user.email}</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {roles.map((role) => {
          const Icon = role.icon;
          const isActive = user.role === role.id;

          return (
            <button
              key={role.id}
              onClick={() => handleRoleChange(role.id)}
              className={`rounded-xl border p-4 text-left transition-all ${
                isActive
                  ? 'border-cyan-400/70 bg-cyan-500/10'
                  : 'border-purple-500/20 bg-slate-900/40 hover:border-purple-400/50'
              }`}
            >
              <Icon className={isActive ? 'mb-3 text-cyan-300' : 'mb-3 text-purple-300'} size={22} />
              <p className="font-semibold">{role.label}</p>
              <p className="mt-1 text-sm leading-5 text-gray-400">{role.description}</p>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSignOut}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-400/30 px-4 py-3 text-red-200 transition-colors hover:border-red-300/70 hover:bg-red-500/10"
      >
        <FiLogOut size={18} />
        Sign Out
      </button>
    </div>
  );
}
