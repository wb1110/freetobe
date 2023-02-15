import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { storeSettings } from './Posts';
import useSettingsStore from '../state/SettingsStore';
import useTrackerStore from '../state/TrackerStore';
import useThreeDayLogStore from '../state/ThreeDayLogStore';
import useMetabolicStore from '../state/MetabolicStore';
import useStore from '../state/Store';
import useAuthStore from '../state/AuthStore';

export const getAssessment = async (id, state) => {
  let userAssessment;
  try {
    const jsonValue = await AsyncStorage.getItem(id);
    const currentUser = JSON.parse(jsonValue);
    if (currentUser.assessment) {
      state.setAssessment(currentUser.assessment);
    }
  } catch (e) {
    return e;
  }
  return userAssessment;
};

export const getTracker = async (state) => {
  let parsedResult;
  try {
    const result = await AsyncStorage.getItem('tracker');
    parsedResult = await JSON.parse(result);
    state.updateTracker(parsedResult);
  } catch (e) {
    return e;
  }
  return parsedResult;
};

export const getThreeDayLog = async (state) => {
  let parsedResult;
  try {
    const result = await AsyncStorage.getItem('threeDayLog');
    parsedResult = await JSON.parse(result);
    state.updateThreeDayLog(parsedResult);
    if (parsedResult.length === 3) {
      state.updateCompletion();
    }
  } catch (e) {
    return e;
  }
  return parsedResult;
};

export const getSettings = async (id, state) => {
  try {
    const jsonValue = await AsyncStorage.getItem(id);
    const currentUser = await JSON.parse(jsonValue);
    if (currentUser.settings) {
      state.updateSettings(currentUser.settings);
    } else {
      storeSettings(id, {
        idealProtein: '30%',
        idealCarbs: '40%',
        idealFat: '30%',
      });
    }
  } catch (e) {
    return e;
  }
};

export const getMetabolicJournal = async (state) => {
  let parsedResult;
  try {
    const result = await AsyncStorage.getItem('metabolicJournal');
    parsedResult = await JSON.parse(result);
    if (parsedResult !== null) {
      state.updateState(parsedResult);
    }
  } catch (e) {
    return e;
  }
  return parsedResult;
};

export const useGetAllData = () => {
  const state = useStore();
  const settingsState = useSettingsStore();
  const trackerState = useTrackerStore();
  const threeDayLogState = useThreeDayLogStore();
  const metabolicState = useMetabolicStore();
  const { id } = useAuthStore();

  const [isDataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      getAssessment(id, state),
      getSettings(id, settingsState),
      // getTracker(id, trackerState),
      // getThreeDayLog(id, threeDayLogState),
      // getMetabolicJournal(id, metabolicState),
    ])
      .then(() => {
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return isDataLoaded;
};
