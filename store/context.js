import {useState, useContext, useEffect, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext({
  timerHistory: {},
  saveTimer: async (title, duration) => {},
  getTimerHistory: async title => [],
  getAllTimers: async () => {},
  clearTimerHistory: async () => {},
});

export const AppProvider = ({children}) => {
  const [timerHistory, setTimerHistory] = useState({});
  console.log(timerHistory);

  // Load all timer data when the app starts
  useEffect(() => {
    loadAllTimers();
  }, []);

  // Load all timers from AsyncStorage
  const loadAllTimers = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const timerKeys = keys.filter(key => key.startsWith('timer_'));
      const result = {};

      for (const key of timerKeys) {
        const data = await AsyncStorage.getItem(key);
        const activity = key.replace('timer_', '');
        result[activity] = JSON.parse(data);
      }

      setTimerHistory(result);
    } catch (error) {
      console.error('Error loading timers:', error);
    }
  };

  // Save a new timer entry
  const saveTimer = async (title, duration) => {
    try {
      const currentTimers = timerHistory[title] || [];

      const newTimer = {
        duration,
        date: new Date().toISOString(),
      };

      const updatedTimers = [...currentTimers, newTimer];

      // Update AsyncStorage
      await AsyncStorage.setItem(
        `timer_${title}`,
        JSON.stringify(updatedTimers),
      );

      // Update state
      setTimerHistory(prev => ({
        ...prev,
        [title]: updatedTimers,
      }));

      return true;
    } catch (error) {
      console.error('Error saving timer:', error);
      return false;
    }
  };

  // Get timer history for specific activity
  const getTimerHistory = title => {
    return timerHistory[title] || [];
  };

  // Get all timer data
  const getAllTimers = () => {
    return timerHistory;
  };

  // Clear timer history for specific activity or all
  const clearTimerHistory = async title => {
    try {
      if (title) {
        await AsyncStorage.removeItem(`timer_${title}`);
        setTimerHistory(prev => {
          const newHistory = {...prev};
          delete newHistory[title];
          return newHistory;
        });
      } else {
        const keys = await AsyncStorage.getAllKeys();
        const timerKeys = keys.filter(key => key.startsWith('timer_'));
        await AsyncStorage.multiRemove(timerKeys);
        setTimerHistory({});
      }
      return true;
    } catch (error) {
      console.error('Error clearing timer history:', error);
      return false;
    }
  };

  const value = {
    timerHistory,
    saveTimer,
    getTimerHistory,
    getAllTimers,
    clearTimerHistory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
