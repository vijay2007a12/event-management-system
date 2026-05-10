'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEventStore } from '@/store';
import { FiX, FiCheck, FiAlertCircle, FiInfo } from 'react-icons/fi';

const Notifications = () => {
  const { notifications, removeNotification } = useEventStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <FiCheck className="text-green-500" />;
      case 'error':
        return <FiAlertCircle className="text-red-500" />;
      case 'warning':
        return <FiAlertCircle className="text-yellow-500" />;
      default:
        return <FiInfo className="text-blue-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/30';
      case 'error':
        return 'bg-red-500/10 border-red-500/30';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30';
      default:
        return 'bg-blue-500/10 border-blue-500/30';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`glass-card-light ${getBgColor(notification.type)} rounded-lg p-4 flex items-start gap-3 border`}
          >
            <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>
            <div className="flex-grow min-w-0">
              <h3 className="text-sm font-semibold text-white">{notification.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0"
            >
              <FiX size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
