import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from "@react-native-material/core";

export default function Home() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Home page</Text>
      <Button title="Click Me" onPress={() => alert("gello")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 38,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  }
});