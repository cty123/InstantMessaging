import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableHighlight,
  Image,
  Dimensions
} from 'react-native';
import firebase from 'react-native-firebase';

type props = {};

export default class Contacts extends Component<props> {
  constructor(props) {
    super(props);

    this.state = {
      contacts: []
    }
  }

  render() {
    return (
      <View>
        <FlatList
          extraData={this.state}
          data={this.state.contacts}
          renderItem={(data)=>this._renderItem(data)}
          keyExtractor={(item) => item._id}
        />
      </View>
    )
  }
}