import { mockAlerts } from '../data/alerts';

export const alertService = {
  getAlerts: async () => {
    return Promise.resolve([...mockAlerts]);
  },

  markAsRead: async (id) => {
    const alert = mockAlerts.find((a) => a.id === id);
    if (alert) alert.isRead = true;
    return Promise.resolve(alert);
  },
};
