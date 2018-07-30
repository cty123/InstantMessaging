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

type Props = {};
export default class ChatPage extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      notifications: []
    };

    var user = firebase.auth().currentUser;

    if (!user) {
      // Print error message, and go back to the login page
    }

    this.messagesRef = firebase.database().ref("conversations/" + user.uid + "/history");
    this.messagesRef.off();

    this.messagesRef.on('child_added', snapshot=>{
      var child_keyset = snapshot._childKeys;

      console.log(snapshot);

      var last_key = child_keyset[child_keyset.length - 1];

      // Convert to value
      var data = snapshot.val();

      console.log(data);
      // Get the latest message
      var col_notif = data[last_key];

      // Change the id
      col_notif._id = col_notif.interact_id;

      // Get client info
      let ref_user = firebase.database().ref("users/" + col_notif._id);
      ref_user.off();

      ref_user.once("value", snapshot => {
        col_notif.client = snapshot.val();
      })
        .then(()=>{

        this.setState(previousState => ({
          notifications: previousState.notifications.concat(col_notif)
        }));

        console.log(this.state.notifications);
      })
        .catch(err=>{
          console.log(err);
        });
    });

    this.messagesRef.on('child_changed', snapshot => {
      var child_keyset = snapshot._childKeys;

      var last_key = child_keyset[child_keyset.length - 1];

      var data = snapshot.val();

      // Get the latest message
      var col_notif = data[last_key];

      // Change the id
      col_notif._id = col_notif.interact_id;

      // Get client info
      let ref_user = firebase.database().ref("users/" + col_notif._id);
      ref_user.off();

      ref_user.once("value", snapshot => {
        col_notif.client = snapshot.val();

      }).then(()=> {
        for (let note in this.state.notifications) {

          if (!this.state.notifications.hasOwnProperty(note)) continue;

          if (this.state.notifications[note]._id === col_notif._id) {
            this.state.notifications[note] = col_notif;

            this.setState({
              notifications: this.state.notifications
            });

            break;
          }
        }
      });
    });
  }

  _renderItem(data) {
    const {navigation} = this.props;
    return (
      <TouchableHighlight
        onPress={()=>{
        navigation.navigate('ConversationPage', {client_id: data.item._id});
      }}
      >
        <View style={styles.item}>
          <Image
            source={{uri:data.item.client.avatar}}
            style={styles.image}
          />
          <View style={styles.itemMeta}>
            <Text style={{
              fontSize: 20
            }}
            >{data.item.client.name}</Text>
            <Text style={{fontSize: 14,
              color: "#111"}}>
              {data.item.text}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View>
        <FlatList
          extraData={this.state}
          data={this.state.notifications}
          renderItem={(data)=>this._renderItem(data)}
          keyExtractor={(item) => item._id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  item: {
    flex: 1,
    backgroundColor: '#FFF',
    height:60,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    paddingBottom: 5,
  },
  image: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10
  },
  itemMeta: {
    marginLeft: 10,
    justifyContent: 'center',
  },
});