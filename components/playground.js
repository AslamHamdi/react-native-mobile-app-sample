import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, AppRegistry, Platform, processColor } from 'react-native';
import { ListItem, Button, Icon, Input } from 'react-native-elements'
import update from 'immutability-helper';
import _ from 'lodash';

import { WebView } from "react-native-webview";
import { readAsStringAsync } from "expo-file-system";
import { useAssets } from "expo-asset";
import ReactNativeFusionCharts from 'react-native-fusioncharts';
import { LineChart, BarChart } from 'react-native-charts-wrapper';
// import FusionCharts from 'react-native-fusioncharts';

//var LineChart = require('react-native-charts-wrapper').default


const COLOR_PURPLE = processColor('#697dfb');

export default class PlayGround extends React.Component {
  constructor(props) {
    super(props);
    //STEP 3 - Chart Configurations
    const chartConfig = {
      type: "scrollline2d",
      width: "100%",
      height: "400",
      dataFormat: "json",
      compactDataMode: 1,
      dataSource: {
        "chart": {
          "theme": "fusion",
          "caption": "Sales Trends",
          "subCaption": "(2016 to 2017)",
          "xAxisName": "Month",
          "yAxisName": "Revenue",
          "numberPrefix": "$",
          "lineThickness": "3",
          "flatScrollBars": "1",
          "scrollheight": "10",
          "numVisiblePlot": "12",
          "showHoverEffect": "1",
          "borderColor": "#666666",
          "showBorder": "1",
          "borderThickness": "4",
          //"borderRadius": "20",
          "borderAlpha": "80",
          "bgColor": "#232B5D",
          "bgratio": "60,40",
          //"bgAlpha": "70,80",
          "bgAngle": "180"
      },
      "categories": [
          {
              "category": [
                  {
                      "label": "Jan 2016"
                  },
                  {
                      "label": "Feb 2016"
                  },
                  {
                      "label": "Mar 2016"
                  },
                  {
                      "label": "Apr 2016"
                  },
                  {
                      "label": "May 2016"
                  },
                  {
                      "label": "Jun 2016"
                  },
                  {
                      "label": "Jul 2016"
                  },
                  {
                      "label": "Aug 2016"
                  },
                  {
                      "label": "Sep 2016"
                  },
                  {
                      "label": "Oct 2016"
                  },
                  {
                      "label": "Nov 2016"
                  },
                  {
                      "label": "Dec 2016"
                  },
                  {
                      "label": "Jan 2017"
                  },
                  {
                      "label": "Feb 2017"
                  },
                  {
                      "label": "Mar 2017"
                  },
                  {
                      "label": "Apr 2017"
                  },
                  {
                      "label": "May 2017"
                  },
                  {
                      "label": "Jun 2017"
                  },
                  {
                      "label": "Jul 2017"
                  },
                  {
                      "label": "Aug 2017"
                  },
                  {
                      "label": "Sep 2017"
                  },
                  {
                      "label": "Oct 2017"
                  },
                  {
                      "label": "Nov 2017"
                  },
                  {
                      "label": "Dec 2017"
                  }
              ]
          }
      ],
      "dataset": [
          {
              "data": [
                  {
                      "value": "27400"
                  },
                  {
                      "value": "29800"
                  },
                  {
                      "value": "25800"
                  },
                  {
                      "value": "26800"
                  },
                  {
                      "value": "29600"
                  },
                  {
                      "value": "32600"
                  },
                  {
                      "value": "31800"
                  },
                  {
                      "value": "36700"
                  },
                  {
                      "value": "29700"
                  },
                  {
                      "value": "31900"
                  },
                  {
                      "value": "34800"
                  },
                  {
                      "value": "24800"
                  },
                  {
                      "value": "26300"
                  },
                  {
                      "value": "31800"
                  },
                  {
                      "value": "30900"
                  },
                  {
                      "value": "33000"
                  },
                  {
                      "value": "36200"
                  },
                  {
                      "value": "32100"
                  },
                  {
                      "value": "37500"
                  },
                  {
                      "value": "38500"
                  },
                  {
                      "value": "35400"
                  },
                  {
                      "value": "38200"
                  },
                  {
                      "value": "33300"
                  },
                  {
                      "value": "38300"
                  }
              ]
          }
      ]
    }
    };

    this.state = {
      chartConfig
    };
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
                            //margin: 20,
                            padding: 16,
                            borderRadius: 20,
                            backgroundColor: '#232B5D',
                          }}>
                          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                            Bar Chart
                          </Text>
                          <View style={{}}>
                          <ReactNativeFusionCharts
                            style={{
                              borderRadius: 20
                            }}
                            chartConfig={this.state.chartConfig}
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
                          {/* <LineChart 
                            data={{dataSets:[{label: "demo", values: [{y: 1}, {y: 2}, {y: 1}]}]}}
                          /> */}
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

                          </View>
                        </View>
                      </View>
                      {/* 3D */}
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
                            3D Three
                          </Text>
                          <View style={{padding: 20, alignItems: 'center'}}>
                            

                          </View>
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
    width: "104%",
    maxHeight: "87%",
  },
  chart: {
    flex: 1
  }
});

AppRegistry.registerComponent('ReactNativeFusionCharts', () => PlayGround);
//AppRegistry.registerComponent('RNLineChart', () => PlayGround);