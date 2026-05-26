'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheckCircle, FiCreditCard, FiLock, FiShield } from 'react-icons/fi';
import Layout from '@/components/Layout';
import { PENDING_PAYMENT_KEY } from '@/components/registration/RegistrationForm';
import { useEventStore } from '@/store';
import { Registration } from '@/types';

interface PendingPayment {
  registration: Omit<Registration, 'registeredAt'> & {
    registeredAt: string;
  };
  billing: {
    eventTitle: string;
    bookedSlot: string;
    customerName: string;
    customerEmail: string;
    paymentMethod: 'card' | 'upi' | 'netbanking';
    subtotal: number;
    tax: number;
    total: number;
    currency: string;
  };
}

export default function PaymentPage() {
  const router = useRouter();
  const { addRegistration, addNotification, events, updateEvent } = useEventStore();
  const [pendingPayment, setPendingPayment] = useState<PendingPayment | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const rawPayment = window.localStorage.getItem(PENDING_PAYMENT_KEY);

    if (!rawPayment) {
      setError('No pending payment was found.');
      return;
    }

    try {
      setPendingPayment(JSON.parse(rawPayment) as PendingPayment);
    } catch {
      setError('The pending payment could not be loaded.');
    }
  }, []);

  const handlePayment = () => {
    if (!pendingPayment) return;

    setIsPaying(true);

    window.setTimeout(() => {
      const registration: Registration = {
        ...pendingPayment.registration,
        registeredAt: new Date(pendingPayment.registration.registeredAt),
        status: 'registered',
      };

      const event = events.find((item) => item.id === registration.eventId);

      addRegistration(registration);

      if (event) {
        updateEvent(event.id, {
          registeredCount: Math.min(event.capacity, event.registeredCount + 1),
        });
      }

      addNotification({
        id: `note-payment-${Date.now()}`,
        userId: registration.userId,
        title: 'Payment successful',
        message: `Your ${registration.bookedSlot} slot for ${pendingPayment.billing.eventTitle} has been confirmed.`,
        type: 'success',
        read: false,
        timestamp: new Date(),
        actionUrl: '/dashboard',
      });

      window.localStorage.removeItem(PENDING_PAYMENT_KEY);
      router.push('/dashboard?payment=success');
    }, 1100);
  };

  return (
    <Layout>
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card-light rounded-xl border border-cyan-400/30 p-8"
          >
            <Link href="/register" className="mb-8 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-100">
              <FiArrowLeft />
              Back to registration
            </Link>

            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 px-3 py-1 text-sm font-semibold text-cyan-200">
              <FiShield />
              Secure checkout
            </p>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Billing Payment</h1>
            <p className="max-w-2xl text-gray-300">
              Review the invoice, confirm the booked slot, and complete the registration payment.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: 'Invoice ready', icon: FiCreditCard },
                { label: 'Protected details', icon: FiLock },
                { label: 'Instant confirmation', icon: FiCheckCircle },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="rounded-lg border border-cyan-400/20 bg-slate-950/40 p-4">
                    <Icon className="mb-3 text-cyan-300" size={24} />
                    <p className="text-sm font-semibold">{item.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 rounded-xl border border-purple-500/20 bg-slate-950/40 p-5">
              <p className="mb-4 text-sm font-semibold text-gray-300">Payment method preview</p>
              <div className="rounded-xl bg-gradient-to-br from-teal-500 via-sky-500 to-amber-500 p-5 text-slate-950 shadow-2xl">
                <div className="mb-10 flex items-center justify-between">
                  <span className="font-bold">EventHub Pay</span>
                  <FiCreditCard size={26} />
                </div>
                <p className="mb-4 text-lg font-semibold tracking-[0.24em]">**** **** **** 4829</p>
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span>{pendingPayment?.billing.customerName || 'Customer'}</span>
                  <span>{pendingPayment?.billing.paymentMethod || 'card'}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card-light h-fit rounded-xl border border-purple-500/30 p-6"
          >
            <h2 className="mb-6 text-xl font-semibold">Billing Summary</h2>

            {error ? (
              <div className="rounded-lg border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            ) : pendingPayment ? (
              <>
                <div className="mb-6 space-y-4 text-sm">
                  <div>
                    <p className="text-gray-400">Event</p>
                    <p className="mt-1 font-semibold">{pendingPayment.billing.eventTitle}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Ticket holder</p>
                    <p className="mt-1 font-semibold">{pendingPayment.registration.userName}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Ticket type</p>
                    <p className="mt-1 font-semibold capitalize">{pendingPayment.registration.ticketType}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Booked slot</p>
                    <p className="mt-1 font-semibold">{pendingPayment.billing.bookedSlot}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Billing email</p>
                    <p className="mt-1 font-semibold">{pendingPayment.billing.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Payment type</p>
                    <p className="mt-1 font-semibold capitalize">{pendingPayment.billing.paymentMethod}</p>
                  </div>
                </div>

                <div className="space-y-3 border-t border-purple-500/20 pt-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${pendingPayment.billing.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax</span>
                    <span>${pendingPayment.billing.tax}</span>
                  </div>
                  <div className="flex justify-between border-t border-purple-500/20 pt-4 text-lg font-bold text-cyan-300">
                    <span>Total</span>
                    <span>${pendingPayment.billing.total}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={isPaying}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-cyan-600 px-5 py-3 font-semibold text-white transition-all hover:shadow-neon-cyan disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <FiCreditCard size={18} />
                  {isPaying ? 'Processing...' : 'Pay Bill'}
                </button>
              </>
            ) : (
              <p className="text-sm text-gray-400">Loading checkout...</p>
            )}
          </motion.aside>
        </div>
      </section>
    </Layout>
  );
}
