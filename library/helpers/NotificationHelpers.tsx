import { AuthError, PostgrestError } from '@supabase/supabase-js';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconCheck, IconBookmarkFilled } from '@tabler/icons-react';
import { Raga } from './RagaHelpers';

// ERROR NOTIFICATIONS

export const databaseErrorNotification = (error: PostgrestError) => {
  notifications.show({
    title: `Error - ${error.code}`,
    message: error.message,
    color: "red",
    icon: <IconAlertCircle size="1.1rem" />
  })
}

export const authErrorNotification = (error: AuthError) => {
  notifications.show({
    title: `Error - ${error.name}`,
    message: error.message,
    color: "red",
    icon: <IconAlertCircle size="1.1rem" />
  })
}


// AUTH NOTIFICATIONS

export const signInSuccessNotification = (username: string) => {
  notifications.show({
    title: 'Sign In Successful',
    message: `Welcome Back, ${username}`,
    color: "teal",
    icon: <IconCheck size="1.1rem" />
  })
}

export const signOutSuccessNotification = () => {
  notifications.show({
    title: 'Sign Out',
    message: "You've been signed out successfully!",
    color: "teal",
    icon: <IconCheck size="1.1rem" />
  })
}

export const registrationSuccessNotification = () => {
  notifications.show({
    title: 'Registration Successful',
    message: 'Please check your email to confirm your registration.',
    color: "teal",
    icon: <IconCheck size="1.1rem" />
  })
}

// RAGA RELATED NOTIFICATIONS

export const bookmarkAddedNotification = (raga: Raga) => {
  notifications.show({
    message: `${raga.format_name} was added to your bookmarks.`,
    color: "yellow",
    icon: <IconBookmarkFilled size="1.1rem" />
  })
}

export const bookmarkRemovedNotification = (raga: Raga) => {
  notifications.show({
    message: `${raga.format_name} was removed from your bookmarks.`,
    color: "yellow",
    icon: <IconBookmarkFilled size="1.1rem" />
  })
}