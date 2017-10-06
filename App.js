import React, {Component} from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import * as firebase from 'firebase';
import Authentication from './components/Authentication';
import HomePage from './components/HomePage';

var config = {
  apiKey: "AIzaSyCQuRFgPxOvM4vomcOebzAdoqwX47De9x4",
  authDomain: "my-project-1489478119694.firebaseapp.com",
  databaseURL: "https://my-project-1489478119694.firebaseio.com",
  projectId: "my-project-1489478119694",
  storageBucket: "my-project-1489478119694.appspot.com",
  messagingSenderId: "750999724433"
};
firebase.initializeApp(config);
console.ignoredYellowBox = [
  "Setting a timer"
];

export default class App extends Component {
  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };
  }
  componentWillMount() {
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true });
    });
  }
  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else {
      return (
        <Router>
          <Scene key='root'>
            <Scene
              component={Authentication}
              hideNavBar={true}
              initial={!this.state.hasToken}
              key='Authentication'
              title='Authentication'
            />
            <Scene
              component={HomePage}
              hideNavBar={true}
              initial={this.state.hasToken}
              key='HomePage'
              title='Home Page'
            />
          </Scene>
        </Router>
      );
    }
  }
}