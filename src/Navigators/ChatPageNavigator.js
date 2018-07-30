import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation'
import ChatPage from '../Pages/ChatPage'
import ConversationPage from '../Pages/ConversationPage'

export default ChatPageNavigator = createStackNavigator({
  ChatPage: {
    screen: ChatPage,
    navigationOptions: {
      title: "ChatPage",
    }
  },
  ConversationPage: {
    screen: ConversationPage,
    navigationOptions: {
      title: "ConversationPage",
    }
  }
});