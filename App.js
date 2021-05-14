/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Focus} from './src/features/Focus/Focus';
import {colors, spacing} from './src/utilities/colorsAndSizes';
import {Timer} from './src/features/Timer/Timer';
import {FocusHistory} from './src/features/Focus/FocusHistory';

const STATUS = {
  COMPLETE: 1,
  FAILED: 2,
};

export default function App() {
  const [subject, setSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (error) {
      console.warn(error);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory, saveFocusHistory]);

  const addFocusObject = item => {
    setSubject(item);
  };

  const addSubjectToHistory = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      {key: String(focusHistory.length + 1), subject, status},
    ]);
  };
  const TimerEnd = () => {
    addSubjectToHistory(subject, STATUS.COMPLETE);
    setSubject(null);
  };
  const clearSubject = () => {
    addSubjectToHistory(subject, STATUS.FAILED);
    setSubject(null);
  };

  return (
    <View style={styles.container}>
      {!subject ? (
        <View style={{flex: 1}}>
          <Focus addFocusObject={addFocusObject} />
          <FocusHistory
            focusHistory={focusHistory}
            Clear={() => {
              setFocusHistory([]);
            }}
          />
        </View>
      ) : (
        <Timer
          subject={subject}
          TimerEnd={TimerEnd}
          clearSubject={clearSubject}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: spacing.md,
  },
});
