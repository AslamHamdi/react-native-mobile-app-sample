import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, AppRegistry, Platform } from 'react-native';
import { ListItem, Button, Icon, Input } from 'react-native-elements'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Card from './card'

import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

import axios from 'axios'

const apiRouter = require('../routers/apiRouter')

const ptData = [
  {value: 160, date: '1 Apr 2022'},
  {value: 180, date: '2 Apr 2022'},
  {value: 190, date: '3 Apr 2022'},
  {value: 180, date: '4 Apr 2022'},
  {value: 140, date: '5 Apr 2022'},
  {value: 145, date: '6 Apr 2022'},
  {value: 160, date: '7 Apr 2022'},
  {value: 200, date: '8 Apr 2022'},

  {value: 220, date: '9 Apr 2022'},
  {
    value: 240,
    date: '10 Apr 2022',
    label: '10 Apr',
    labelTextStyle: {color: 'lightgray', width: 60},
  },
  {value: 280, date: '11 Apr 2022'},
  {value: 260, date: '12 Apr 2022'},
  {value: 340, date: '13 Apr 2022'},
  {value: 385, date: '14 Apr 2022'},
  {value: 280, date: '15 Apr 2022'},
  {value: 390, date: '16 Apr 2022'},

  {value: 370, date: '17 Apr 2022'},
  {value: 285, date: '18 Apr 2022'},
  {value: 295, date: '19 Apr 2022'},
  {
    value: 300,
    date: '20 Apr 2022',
    label: '20 Apr',
    labelTextStyle: {color: 'lightgray', width: 60},
  },
  {value: 280, date: '21 Apr 2022'},
  {value: 295, date: '22 Apr 2022'},
  {value: 260, date: '23 Apr 2022'},
  {value: 255, date: '24 Apr 2022'},

  {value: 190, date: '25 Apr 2022'},
  {value: 220, date: '26 Apr 2022'},
  {value: 205, date: '27 Apr 2022'},
  {value: 230, date: '28 Apr 2022'},
  {value: 210, date: '29 Apr 2022'},
  {
    value: 200,
    date: '30 Apr 2022',
    label: '30 Apr',
    labelTextStyle: {color: 'lightgray', width: 60},
  },
  {value: 240, date: '1 May 2022'},
  {value: 250, date: '2 May 2022'},
  {value: 280, date: '3 May 2022'},
  {value: 250, date: '4 May 2022'},
  {value: 210, date: '5 May 2022'},
];

const barData = [
  {value: 2500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'Jan'},
  {value: 2400, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

  {value: 3500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'Feb'},
  {value: 3000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

  {value: 4500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'Mar'},
  {value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

  {value: 5200, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'Apr'},
  {value: 4900, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

  {value: 3000, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'May'},
  {value: 2800, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
];

const pieData = [
  {
    value: 47,
    color: '#009FFF',
    gradientCenterColor: '#006DFF',
    focused: true,
  },
  {value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE'},
  {value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3'},
  {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
];


const renderDot = color => {
  return (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 10,
      }}
    />
  );
};

const renderLegendComponent = () => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
          }}>
          {renderDot('#006DFF')}
          <Text style={{color: 'white'}}>Excellent: 47%</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#8F80F3')}
          <Text style={{color: 'white'}}>Okay: 16%</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
          }}>
          {renderDot('#3BE9DE')}
          <Text style={{color: 'white'}}>Good: 40%</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#FF7F97')}
          <Text style={{color: 'white'}}>Poor: 3%</Text>
        </View>
      </View>
    </>
  );
};

export default class Home extends React.Component {

  state = {
    reportList: [],
  }

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
            <ScrollView>
              <View>
                <View style={{
                  width: '95%',
                }}>
                  <View style={{

                  }}>
                      <View
                        style={{
                          paddingVertical: 100,
                          backgroundColor: '#34448B',
                          flex: 1,
                        }}>
                        <View
                          style={{
                            margin: 20,
                            padding: 16,
                            borderRadius: 20,
                            backgroundColor: '#232B5D',
                          }}>
                          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                            Bar Chart
                          </Text>
                          <View style={{padding: 20, alignItems: 'center'}}>
                            <BarChart
                              isAnimated
                              data={barData}
                              barWidth={16}
                              initialSpacing={10}
                              spacing={14}
                              barBorderRadius={4}
                              yAxisThickness={0}
                              xAxisType={'dashed'}
                              xAxisColor={'lightgray'}
                              yAxisTextStyle={{color: 'lightgray'}}
                              stepValue={1000}
                              maxValue={6000}
                              noOfSections={6}
                              yAxisLabelTexts={['0', '1k', '2k', '3k', '4k', '5k', '6k']}
                              labelWidth={40}
                              xAxisLabelTextStyle={{color: 'lightgray', textAlign: 'center'}}
                              showLine
                              lineConfig={{
                                color: '#F29C6E',
                                thickness: 3,
                                curved: true,
                                hideDataPoints: true,
                                shiftY: 20,
                                initialSpacing: -30,
                              }}
                            />
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          paddingVertical: 100,
                          backgroundColor: '#34448B',
                          flex: 1,
                        }}>
                        <View
                          style={{
                            margin: 20,
                            padding: 16,
                            borderRadius: 20,
                            backgroundColor: '#232B5D',
                          }}>
                          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                            Line Chart
                          </Text>
                          <View style={{padding: 20, alignItems: 'center'}}>
                            <LineChart
                              isAnimated
                              areaChart
                              data={ptData}
                              rotateLabel
                              width={300}
                              hideDataPoints
                              spacing={10}
                              color="#00ff83"
                              thickness={2}
                              startFillColor="rgba(20,105,81,0.3)"
                              endFillColor="rgba(20,85,81,0.01)"
                              startOpacity={0.9}
                              endOpacity={0.2}
                              initialSpacing={0}
                              noOfSections={6}
                              maxValue={600}
                              yAxisColor="white"
                              yAxisThickness={0}
                              rulesType="solid"
                              rulesColor="gray"
                              yAxisTextStyle={{color: 'gray'}}
                              yAxisSide='right'
                              xAxisColor="lightgray"
                              pointerConfig={{
                                pointerStripHeight: 160,
                                pointerStripColor: 'lightgray',
                                pointerStripWidth: 2,
                                pointerColor: 'lightgray',
                                radius: 6,
                                pointerLabelWidth: 100,
                                pointerLabelHeight: 90,
                                activatePointersOnLongPress: true,
                                autoAdjustPointerLabelPosition: false,
                                pointerLabelComponent: items => {
                                  return (
                                    <View
                                      style={{
                                        height: 90,
                                        width: 100,
                                        justifyContent: 'center',
                                        marginTop: -30,
                                        marginLeft: -40,
                                      }}>
                                      <Text style={{color: 'white', fontSize: 14, marginBottom:6,textAlign:'center'}}>
                                        {items[0].date}
                                      </Text>
                      
                                      <View style={{paddingHorizontal:14,paddingVertical:6, borderRadius:16, backgroundColor:'white'}}>
                                        <Text style={{fontWeight: 'bold',textAlign:'center'}}>
                                          {'$' + items[0].value + '.0'}
                                        </Text>
                                      </View>
                                    </View>
                                  );
                                },
                              }}
                            />
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          paddingVertical: 100,
                          backgroundColor: '#34448B',
                          flex: 1,
                        }}>
                        <View
                          style={{
                            margin: 20,
                            padding: 16,
                            borderRadius: 20,
                            backgroundColor: '#232B5D',
                          }}>
                          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                            Pie Chart
                          </Text>
                          <View style={{padding: 20, alignItems: 'center'}}>
                            <PieChart
                              data={pieData}
                              donut
                              showGradient
                              sectionAutoFocus
                              radius={90}
                              innerRadius={60}
                              innerCircleColor={'#232B5D'}
                              centerLabelComponent={() => {
                                return (
                                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text
                                      style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                                      47%
                                    </Text>
                                    <Text style={{fontSize: 14, color: 'white'}}>Excellent</Text>
                                  </View>
                                );
                              }}
                            />
                          </View>
                          {renderLegendComponent()}
                        </View>
                      </View>
                    </View>
                </View>
              </View>
            </ScrollView>
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
    backgroundColor: '#34448B',
    flex: 1
  },
  mainContent: {
    flex: 1,
    width: "105%",
    maxHeight: "87%",
  }
});

// AppRegistry.registerComponent('ReactNativeFusionCharts', () => Home);