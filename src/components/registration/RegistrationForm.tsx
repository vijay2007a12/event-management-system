'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiCalendar, FiCode, FiCreditCard, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { useEventStore } from '@/store';

export const PENDING_PAYMENT_KEY = 'eventhub-pending-demo-payment';

const RegistrationForm = ({ eventId }: { eventId?: string }) => {
  const router = useRouter();
  const { events } = useEventStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedEventId: eventId || '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ticketType: 'regular' as 'regular' | 'vip' | 'premium',
    specialRequests: '',
  });
  const [formError, setFormError] = useState('');

  const steps = ['Personal', 'Ticket', 'Review'];
  const selectedEvent = events.find((event) => event.id === formData.selectedEventId);

  const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      if (!formData.selectedEventId) return 'Please select an event.';
      if (!formData.firstName.trim()) return 'First name is mandatory.';
      if (!formData.lastName.trim()) return 'Last name is mandatory.';
      if (!isValidEmail(formData.email)) return 'Enter a valid email address.';
      if (!formData.phone.trim()) return 'Phone number is mandatory.';
    }

    if (currentStep === 2 && !formData.ticketType) {
      return 'Please select a ticket type.';
    }

    if (currentStep === 3 && !formData.specialRequests.trim()) {
      return 'Please add your requirements or type N/A.';
    }

    return '';
  };

  const handleNext = () => {
    const error = validateStep(step);
    if (error) {
      setFormError(error);
      return;
    }

    setFormError('');
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const error = validateStep(step);
    if (error) {
      setFormError(error);
      return;
    }

    const registrationId = Date.now().toString();
    const ticketPrice = ticketPrices[formData.ticketType];
    const taxAmount = Math.round(ticketPrice * 0.1);

    const pendingPayment = {
      registration: {
        id: registrationId,
        eventId: formData.selectedEventId,
        userId: `user-${Date.now()}`,
        userName: `${formData.firstName} ${formData.lastName}`,
        userEmail: formData.email,
        registeredAt: new Date().toISOString(),
        status: 'registered',
        ticketType: formData.ticketType,
        qrCode: `QR-${registrationId}`,
      },
      billing: {
        eventTitle: selectedEvent?.title || 'Selected event',
        subtotal: ticketPrice,
        tax: taxAmount,
        total: ticketPrice + taxAmount,
        currency: 'USD',
      },
    };

    window.localStorage.setItem(PENDING_PAYMENT_KEY, JSON.stringify(pendingPayment));
    router.push('/payment');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const ticketPrices = {
    regular: 49,
    vip: 99,
    premium: 199,
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl font-bold mb-2">Event Registration</h2>
        <p className="text-gray-400">Secure your spot at the event</p>
      </motion.div>

      <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass-card-light p-8 rounded-2xl border border-purple-500/30">
              {/* Progress indicator */}
              <div className="flex gap-4 mb-8">
                {steps.map((s, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{
                        backgroundColor: idx + 1 <= step ? 'rgb(168, 85, 247)' : 'rgba(168, 85, 247, 0.2)',
                      }}
                      className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
                    >
                      {idx + 1}
                    </motion.div>
                    <span className={idx + 1 <= step ? 'text-purple-400' : 'text-gray-500'}>
                      {s}
                    </span>
                    {idx < steps.length - 1 && (
                      <div className={`h-1 w-12 mx-2 rounded ${
                        idx + 1 < step ? 'bg-purple-600' : 'bg-purple-500/20'
                      }`} />
                    )}
                  </motion.div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {formError && (
                  <div className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {formError}
                  </div>
                )}

                {/* Step 1: Personal */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold mb-6">Personal Information</h3>
                    <select
                      value={formData.selectedEventId}
                      onChange={(e) => setFormData({ ...formData, selectedEventId: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white focus:border-purple-500 focus:shadow-neon-purple transition-all"
                      required
                      disabled={Boolean(eventId)}
                    >
                      <option value="">Select Event</option>
                      {events.map((event) => (
                        <option key={event.id} value={event.id}>
                          {event.title} - {event.location}
                        </option>
                      ))}
                    </select>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-neon-purple transition-all"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-neon-purple transition-all"
                        required
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-neon-purple transition-all"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-neon-purple transition-all"
                      required
                    />
                  </motion.div>
                )}

                {/* Step 2: Ticket */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold mb-6">Select Ticket Type</h3>
                    <div className="space-y-3">
                      {(['regular', 'vip', 'premium'] as const).map((type) => (
                        <label key={type} className="flex items-center p-4 rounded-lg glass-card border border-purple-500/20 hover:border-purple-500/50 cursor-pointer transition-all">
                          <input
                            type="radio"
                            name="ticketType"
                            value={type}
                            checked={formData.ticketType === type}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                ticketType: e.target.value as 'regular' | 'vip' | 'premium',
                              })
                            }
                            className="mr-4"
                          />
                          <div className="flex-grow">
                            <p className="font-semibold capitalize">{type} Ticket</p>
                            <p className="text-sm text-gray-400">Premium access and benefits</p>
                          </div>
                          <span className="text-lg font-bold text-cyan-400">
                            ${ticketPrices[type]}
                          </span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold mb-6">Review Your Registration</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-400">Event</span>
                        <span className="text-right">{selectedEvent?.title || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Name</span>
                        <span>{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Email</span>
                        <span>{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Phone</span>
                        <span>{formData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Ticket Type</span>
                        <span className="capitalize">{formData.ticketType}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-400">Requirements</span>
                        <span className="text-right">{formData.specialRequests}</span>
                      </div>
                      <div className="border-t border-purple-500/20 pt-3 flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span className="text-cyan-400">${ticketPrices[formData.ticketType]}</span>
                      </div>
                    </div>
                    <textarea
                      placeholder="Requirements / Special Requests (type N/A if none)"
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg glass-card border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500 transition-all"
                      rows={3}
                      required
                    />
                  </motion.div>
                )}

                {/* Navigation buttons */}
                <div className="flex gap-4 pt-6 border-t border-purple-500/20">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handlePrev}
                    disabled={step === 1}
                    className="px-6 py-3 glass-card-light border border-purple-500/30 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </motion.button>

                  {step < steps.length ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={handleNext}
                      className="flex-grow px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold"
                    >
                      Next
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="flex-grow px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg font-semibold inline-flex items-center justify-center gap-2"
                    >
                      <FiCreditCard size={18} />
                      Continue to Payment
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card-light p-6 rounded-2xl border border-purple-500/30 sticky top-24 space-y-6"
            >
              <h4 className="font-semibold mb-4">Registration Summary</h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FiCalendar className="text-cyan-400 mt-1" />
                  <div className="text-sm">
                    <p className="text-gray-400">Event</p>
                    <p>{selectedEvent?.title || 'Select an event'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiUser className="text-purple-400 mt-1" />
                  <div className="text-sm">
                    <p className="text-gray-400">Attendee</p>
                    <p>{formData.firstName || 'Your name'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiMail className="text-cyan-400 mt-1" />
                  <div className="text-sm">
                    <p className="text-gray-400">Email</p>
                    <p>{formData.email || 'your@email.com'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiPhone className="text-purple-400 mt-1" />
                  <div className="text-sm">
                    <p className="text-gray-400">Phone</p>
                    <p>{formData.phone || '+91 98765 43210'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiCode className="text-cyan-400 mt-1" />
                  <div className="text-sm">
                    <p className="text-gray-400">Ticket</p>
                    <p className="capitalize">{formData.ticketType}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-purple-500/20 pt-4">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${ticketPrices[formData.ticketType]}</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-400">Tax (10%)</span>
                  <span>${Math.round(ticketPrices[formData.ticketType] * 0.1)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-cyan-400">
                  <span>Total</span>
                  <span>${Math.round(ticketPrices[formData.ticketType] * 1.1)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
    </section>
  );
};

export default RegistrationForm;
