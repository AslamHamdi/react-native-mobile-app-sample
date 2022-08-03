import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState }  from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import Home from './components/home'
import FormList from './components/formList'
import NewForm from './components/newForm'
import HomeIcon from './assets/home.png'
import AddIcon from './assets/add.png'
import FormIcon from './assets/form.png'
import * as Animatable from 'react-native-animatable';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//const apiRouter = require('./routers/apiRouter')

const Tab = createBottomTabNavigator();

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// const Tab = createMaterialBottomTabNavigator();

const Routes = [
  { route: 'Home', name: 'Home', component: Home, icon: HomeIcon },
  { route: 'Add', name: 'New Form', component: NewForm, icon: AddIcon },
  { route: 'FormList', name: 'Form List', component: FormList, icon: FormIcon }
]

const CustomTabBarButton = ({children, onPress}) => (
  <Pressable
  onPress={onPress}
  style={{
    top: -10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    ...styles.shadow
  }}
  onPress={onPress}
  // style={(pressed) => [{
  //   top: -10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: pressed ? '#1565C0' : 'black',
  //   shadowColor: '#1565C0',
  //   shadowOffset: {
  //     width: 10,
  //     height: 10
  //   },
  //   elevation: 5,
  //   borderRadius: 35,
  //   width: 60,
  //   height: 60,
  //   ...styles.shadow
  // }]}
  >
    <View
      style={{
          width: 60,
          height: 60,
          borderRadius: 35,
          backgroundColor: onPress ? '#1565C0'  : '#1976D2',
          shadowColor: '#1565C0',
          shadowOffset: {
            width: 10,
            height: 10
          },
            elevation: 5
      }}
      >
        {children}
    </View>
  </Pressable>
);

export default function App(){

  return (
  <NavigationContainer 
  barStyle={ styles.navBar }
  labeled={false}
  screenOptions={{
    tabBarStyle: styles.navBar
  }}>
  <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            bottom: 16,
            right: 16,
            left: 16,
            borderRadius: 16
          }
        }}
      >
      {Routes.map((item, index) => {
        if(item.route == 'Add'){
          return (
            <Tab.Screen key={index} name={item.route} component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarIcon: ({focused, tintColor}) => (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image 
                      source={item.icon}
                      resizeMode='contain'
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: 'white'
                      }}
                    />
                  </View>
                ),
                tabBarButton: (props) => (
                  <CustomTabBarButton {...props} />
                )    
              }}
            />
          )
        }else{
          return (
            <Tab.Screen key={index} name={item.route} component={item.component}
              options={{
                unmountOnBlur: true,
                tabBarShowLabel: false,
                tabBarIcon: ({focused, tintColor}) => (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image 
                      source={item.icon}
                      resizeMode='contain'
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#1565C0' : '#6d9bc3'
                      }}
                    />
                  </View>
                ),
              }}
            />
          )
        }

      })}
    </Tab.Navigator>
  </NavigationContainer>
  )
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
    bottom: 5,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: '#1565C0',
    borderRadius: 15,
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
