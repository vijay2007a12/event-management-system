'use client';

import { ReactNode, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase';
import { useEventStore } from '@/store';
import { User } from '@/types';

const ROLE_STORAGE_KEY = 'eventhub-role';

function getStoredRole(): User['role'] {
  if (typeof window === 'undefined') return 'customer';

  const role = window.localStorage.getItem(ROLE_STORAGE_KEY);
  return role === 'admin' || role === 'organizer' || role === 'attendee' || role === 'customer'
    ? role
    : 'customer';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const setUser = useEventStore((state) => state.setUser);

  useEffect(() => {
    if (!firebaseAuth) return;

    const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        return;
      }

      setUser({
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || firebaseUser.email || 'EventHub user',
        avatar: firebaseUser.photoURL || undefined,
        role: getStoredRole(),
        createdAt: firebaseUser.metadata.creationTime
          ? new Date(firebaseUser.metadata.creationTime)
          : new Date(),
      });
    });

    return unsubscribe;
  }, [setUser]);

  return children;
}

export { ROLE_STORAGE_KEY };
