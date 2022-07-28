import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import Home from './components/home'
import FormList from './components/formList'
import NewForm from './components/newForm'
import HomeIcon from './assets/home.png'

import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <Pressable
  style={{
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    ...styles.shadow
  }}
  onPress={onPress}
  >
    <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      //borderWidth: 3,
      width: 80,
      height: 75,
      borderBottomLeftRadius: 45,
      borderBottomRightRadius: 45,
      backgroundColor: 'white',
    }}>
      <View
      style={{
          width: 60,
          height: 60,
          borderRadius: 35,
          backgroundColor: onPress ? '#1976D2': 'black'
      }}
      >
        {children}
      </View>
    </View>
  </Pressable>
);

const Tabindicator = (props) => (
  <Pressable
    {...props}
    style={
      props.accessibilityState.selected
        ? [props.style, { borderBottomColor: 'red', borderBottomWidth: 4, width: 20 }]
        : props.style
    }
  />
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      barStyle={ styles.navBar }
      labeled={false}
      screenOptions={{
        tabBarStyle: styles.navBar
      }}>
        <Tab.Screen name="Home" component={Home} options={{
          tabBarIcon: ({focused, tintColor}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image 
                source={require('./assets/home.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: 'white'
                }}
              />
              {/* <Text
                style={{
                  color: 'white', fontSize: focused ? 12 : 0
                }}
              >Home</Text> */}
            </View>
          ),
          //tabBarButton: Tabindicator
        }}/>
        <Tab.Screen name="New Form"  component={NewForm} options={{
          tabBarIcon: ({focused}) => (
            <Image 
            source={require('./assets/add.png')}
            resizeMode='contain'
            style={{
              width: 20,
              height: 20,
              tintColor: '#ffffff'
            }}
          />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          )    
        }}/>
        <Tab.Screen name="Form List" component={FormList} options={{
          tabBarIcon: ({focused, tintColor}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image 
                source={require('./assets/form.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: 'white'
                }}
              />
              {/* <Text
                style={{
                  color: 'white', fontSize: focused ? 12 : 0
                }}
              >Form List</Text> */}
            </View>
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    position: 'absolute',
    //bottom: 5,
    //left: 20,
    //right: 20,
    //elevation: 0,
    backgroundColor: '#1565C0',
    //borderRadius: 15,
    height: 50,
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
  icon: {

  }
});
