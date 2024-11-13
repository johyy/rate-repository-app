import React from 'react';
import { StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    paddingTop: 40,
    paddingBottom: 20,
    padding: 10
  },
});

const AppBarTab = ({ text }) => {
  return (
    <Text style={styles.text}>{text}</Text>
  );
};

export default AppBarTab;