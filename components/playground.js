import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, AppRegistry, Platform, processColor } from 'react-native';
import { ListItem, Button, Icon, Input } from 'react-native-elements'
import update from 'immutability-helper';
import _ from 'lodash';
import { LineChart } from 'react-native-charts-wrapper';

//var LineChart = require('react-native-charts-wrapper').default


const COLOR_PURPLE = processColor('#697dfb');

export default class PlayGround extends React.Component {
    constructor() {
        super();
    
        this.state = {
          data: {},
          xAxis: {},
          yAxis: {}
        };
      }
    
      componentDidMount() {
        const valueRange = 100;
        const size = 30;
    
        this.setState(
          update(this.state, {
            xAxis: {
              $set: {
                textColor: processColor('red'),
                textSize: 16,
                gridColor: processColor('red'),
                gridLineWidth: 1,
                axisLineColor: processColor('darkgray'),
                axisLineWidth: 1.5,
                gridDashedLine: {
                  lineLength: 10,
                  spaceLength: 10
                },
                avoidFirstLastClipping: true,
                position: 'BOTTOM'
              }
            },
            yAxis: {
              $set: {
                left: {
                  drawGridLines: false
                },
                right: {
                  enabled: false
                }
              }
            },
            data: {
              $set: {
                dataSets: [{
                  values: this._randomYValues(valueRange, size),
                  label: '',
                  config: {
                    lineWidth: 1.5,
                    drawCircles: false,
                    drawCubicIntensity: 0.3,
                    drawCubic: true,
                    drawHighlightIndicators: false,
                    color: COLOR_PURPLE,
                    drawFilled: true,
                    fillColor: COLOR_PURPLE,
                    fillAlpha: 90
                  }
                }],
              }
            }
          })
        );
      }
    
      _randomYValues(range: number, size: number) {
        const nextValueMaxDiff = 0.2;
        let lastValue = range / 2;
    
        return _.times(size, () => {
          let min = lastValue * (1 - nextValueMaxDiff);
          let max = lastValue * (1 + nextValueMaxDiff);
          return {y: Math.random() * (max - min) + min};
        });
      }
    
      handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
          this.setState({...this.state, selectedEntry: null})
        } else {
          this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
        }
    
        console.log(event.nativeEvent)
      }
    
  render(){
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Playground</Text>
            <Text style={styles.description}>lorem ipsum dolor sit amet</Text>
          </View>
        </View>
         <View style={styles.content}>
          <View style={styles.mainContent}>
            {/* <ScrollView> */}
                <View>
                    {/* <LineChart/> */}
                {/* <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: ''}}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            legend={{enabled: false}}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
          /> */}
                </View>

            {/* </ScrollView> */}
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