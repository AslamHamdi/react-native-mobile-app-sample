import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, ListItem, Button, Icon, Input } from 'react-native-elements'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function Home() {
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Home</Text>
          <Text style={styles.description}>lorem ipsum dolor sit amet</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.mainContent}>
        
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1565C0',
    height: 150,
    paddingTop: 38,
  },
  headerContent: {
    marginLeft: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 20
  },
  description: {
    fontSize: 15,
    //fontWeight: 'bold',
    color: 'white'
  },
  content: {

  },
  mainContent: {

  }
});