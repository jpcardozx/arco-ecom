/**
 * User Preferences Management
 * Handles theme, settings, and user preferences
 */

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  animations: boolean;
  notifications: boolean;
  analytics: boolean;
}

export const defaultPreferences: UserPreferences = {
  theme: 'system',
  language: 'en',
  animations: true,
  notifications: true,
  analytics: true,
};

const PREFERENCES_KEY = 'arco-user-preferences';

export function getPreferences(): UserPreferences {
  if (typeof window === 'undefined') {
    return defaultPreferences;
  }

  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultPreferences, ...parsed };
    }
  } catch (error) {
    console.warn('Failed to parse user preferences:', error);
  }

  return defaultPreferences;
}

export function savePreferences(preferences: UserPreferences): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn('Failed to save user preferences:', error);
  }
}

export function initializeSystemPreferences(): UserPreferences {
  const preferences = getPreferences();

  // Apply theme
  if (preferences.theme === 'dark' ||
      (preferences.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return preferences;
}