import React, { Component } from 'react';
import {createSwitchNavigator} from 'react-navigation'
import Login from '../Pages/Login'
import MyBottomTabNavigator from '../Navigators/MyBottomTabNavigator'

export default MyStackNavigator = createSwitchNavigator({
  Home: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  },
  AppTab: {
    screen: MyBottomTabNavigator,
    navigationOptions: {
      title: 'AppTab'
    }
  }
});