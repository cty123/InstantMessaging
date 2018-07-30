import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'react-native-firebase';

export default class ConversationPage extends React.Component {
  constructor(props) {
    super(props);

    // Set all the states
    this.state = {
      // Initialize the messages array
      messages: [],
      // Get the uid of the client user
      client_id: this.props.navigation.state.params.client_id,
      // Get the current user object
      user_id: firebase.auth().currentUser.uid
    };

    var self = this;

    // Initialize message reference
    let conversation_database = firebase.database().ref("conversations/" + this.state.user_id + "/history/" + this.state.client_id);
    // Clear all the handler first
    conversation_database.off();

    // Pull the latest 20 messages only access once
    //conversation_database.limitToLast(20).once('value', setConversations);

    conversation_database.on("child_added", snapshot => {
      var msg_body = snapshot.val();

      //if (msg_body["user"]["_id"] === self.state.user_id)
        //return;

      self.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, msg_body),
      }));

      console.log(msg_body);
    });

  }

  componentDidMount() {

  }


  componentWillMount() {
    // Read from async database and check for updates
  }

  onSend(messages = []) {
    const database_sender = firebase.database().ref("conversations/" + this.state.user_id + "/history/" +
      this.state.client_id);
    const database_receiver = firebase.database().ref("conversations/" + this.state.client_id + "/history/" +
      this.state.user_id);

    for (let m in messages) {
      // Skip loop if the property is from prototype
      if (!messages.hasOwnProperty(m)) continue;
      messages[m].interact_id = this.state.client_id;
      // Save the message to the current user database
      database_sender.push(messages[m]);

      messages[m].interact_id = this.state.user_id;
      // Save the message to the current client database
      database_receiver.push(messages[m]);
    }
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.user_id
        }}
      />
    )
  }
}