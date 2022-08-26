import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Card, ListItem, Button, Icon, Input } from 'react-native-elements'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import axios from 'axios'

export default class Home extends React.Component {

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    try {
      let response = await axios.get('https://api.publicapis.org/entries').then((resp) => {
        console.log("RESPONSE: ", resp.data.entries[0])
      })

    } catch (error) {
      console.log("ERROR: ", error)
    }
    
  }

  render(){
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
            <View style={{
              height: '10%',
              alignItems: 'center',
              //width: '98%'
            }}>
              <Text style={{
                fontSize: 20,
              }}>Chart Sample</Text>
            </View>
            <View>
              <LineChart
                data={{
                  labels: ["January", "February", "March", "April", "May", "June"],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ]
                    }
                  ]
                }}
                width={350} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#1a02b5",
                  backgroundGradientFrom: "#1d02d1",
                  backgroundGradientTo: "#8979f2",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
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
    color: 'white'
  },
  content: {

  },
  mainContent: {
    //flex: 1,
    alignItems: 'center',
    //flex: 1,
    justifyContent: 'center',
    width: "100%",
    maxHeight: "87%",
  }
});