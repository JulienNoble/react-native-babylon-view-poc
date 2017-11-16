/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { BabylonView } from './app/components/BabylonView';

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <BabylonView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
