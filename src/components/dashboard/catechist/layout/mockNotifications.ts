export type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string; // ISO string
};

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Student Enrolled',
    message: 'James Wilson joined First Communion 2025.',
    read: false,
    timestamp: '2025-04-01T10:30:00Z',
  },
  {
    id: '2',
    title: 'Document Missing',
    message: 'Aisha Johnson is missing her baptismal certificate.',
    read: false,
    timestamp: '2025-04-01T09:15:00Z',
  },
  {
    id: '3',
    title: 'Upcoming Sacrament',
    message: 'Confirmation rehearsal is this Saturday at 10 AM.',
    read: true,
    timestamp: '2025-03-30T14:00:00Z',
  },
  {
    id: '4',
    title: 'Resource Updated',
    message: 'New lesson plan uploaded for Session 5.',
    read: false,
    timestamp: '2025-03-29T16:45:00Z',
  },
];