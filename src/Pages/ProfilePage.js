import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import firebase from 'react-native-firebase';

type Props = {};
export default class ProfilePage extends Component<Props> {
  constructor(props) {
    super(props);
  }

  logout(){
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title={"Logout"}
          onPress={()=>{
            firebase.auth().signOut()
              .then(()=>{
                // Sign-out successful.
                this.logout();
                alert("Logout successfully");
              })
              .catch(error=>{
                // An error happened.
                alert("Logout failed: " + error);
                this.logout();
              });
          }}
        />
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
