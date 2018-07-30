import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {createBottomTabNavigator} from 'react-navigation'
import ProfilePage from '../Pages/ProfilePage'
import ChatPageNavigator from '../Navigators/ChatPageNavigator'
import Contacts from '../Pages/Contacts'

export default MyBottomTabNavigator = createBottomTabNavigator({
  ChatPage: {
    screen: ChatPageNavigator,
    navigationOptions: {
      title: "Chat",
      tabBarIcon: ({focused}) => (
        <Ionicons
          name={focused ? 'ios-text' : 'ios-text-outline'}
          size={26}
        />
      )
    }
  },
  Contacts: {
    screen: Contacts,
    navigationOptions: {
      title: "Contact",
      tabBarIcon: ({focused}) => (
        <Ionicons
          name={focused ? 'ios-person' : 'ios-person-outline'}
          size={26}
        />
      )
    }
  },
  Profile: {
    screen: ProfilePage,
    navigationOptions: {
      title: "Me",
      tabBarIcon: ({focused}) => (
        <Ionicons
          name={focused ? 'ios-person' : 'ios-person-outline'}
          size={26}
        />
      )
    }
  },

});