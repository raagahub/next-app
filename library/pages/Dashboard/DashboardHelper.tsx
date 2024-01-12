import { IconUser, IconBookmarks, IconActivity, IconChevronRight } from '@tabler/icons-react';

export const dashboardElements = [
  { icon: IconUser, label: 'Profile', path: 'profile', private: false },
  { icon: IconBookmarks, label: 'Bookmarks', path: 'bookmarks', private: true },
  { icon: IconActivity, label: 'Activity', path: 'activity', private: true },
];

export const statusColorMap: { [key: string]: string } = {
  'pending': 'orange',
  'approved': 'teal',
  'rejected': 'red',
  'draft': 'blue'
}