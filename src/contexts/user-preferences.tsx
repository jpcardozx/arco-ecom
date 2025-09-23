'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

import {
  UserPreferences,
  defaultPreferences,
  getPreferences,
  savePreferences,
  initializeSystemPreferences,
} from '@/lib/utils/user-preferences';

interface UserPreferencesContextType {
  preferences: UserPreferences;
  isLoaded: boolean;
  updatePreferences: (newPrefs: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
}

// Create context
export const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(
  undefined
);

/**
 * Hook to access user preferences directly from this file
 * This prevents circular dependencies
 */
export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
}

/**
 * Provider for user preferences across the application
 */
export function UserPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize preferences on mount
  useEffect(() => {
    // Initialize system preferences (dark mode, etc.)
    initializeSystemPreferences();

    // Load saved preferences
    setPreferences(getPreferences());
    setIsLoaded(true);

    // Listen for preference changes from other components/tabs
    const handlePreferencesUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<UserPreferences>;
      setPreferences(customEvent.detail);
    };

    window.addEventListener('user-preferences-updated', handlePreferencesUpdated);

    return () => {
      window.removeEventListener('user-preferences-updated', handlePreferencesUpdated);
    };
  }, []);

  // Update preferences
  const updatePreferences = (newPrefs: Partial<UserPreferences>) => {
    const updatedPrefs = { ...preferences, ...newPrefs, lastUpdated: Date.now() };
    setPreferences(updatedPrefs);
    savePreferences(updatedPrefs);
  };

  // Reset preferences to defaults
  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    savePreferences(defaultPreferences);
  };

  return (
    <UserPreferencesContext.Provider
      value={{
        preferences,
        isLoaded,
        updatePreferences,
        resetPreferences,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
}
