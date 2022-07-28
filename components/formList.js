import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormList() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Form List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    flex: 1,
    paddingTop: 38,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  }
});