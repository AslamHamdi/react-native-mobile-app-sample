import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NewForm() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>New Form</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 38,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  }
});