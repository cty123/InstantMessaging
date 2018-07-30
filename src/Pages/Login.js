import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TextInput, Button } from 'react-native';
import LoginForm from '../components/LoginForm'

export default class Login extends React.Component {
  _login() {
    this.props.navigation.navigate("AppTab")
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginForm login={()=> this._login() }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
