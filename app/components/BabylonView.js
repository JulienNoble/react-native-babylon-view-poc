import PropTypes from 'prop-types';
import React, { Component } from 'react';
import StaticServer from 'react-native-static-server';
import { CustomWebView } from './CustomWebView';

const RNFS = require('react-native-fs');

export class BabylonView extends Component {
  constructor(props) {
    super(props);
    this.registerWebView = this.registerWebView.bind(this);
    this.onLoadEnd = this.onLoadEnd.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  componentDidMount() {
    const documentDir = RNFS.DocumentDirectoryPath;
    this.server = new StaticServer(8800, `${documentDir}/`);
    this.server.start();
  }

  onLoadEnd() {
    if (this.webview) {
      // init code goes here
    }
  }

  // keep a ref of our webview
  registerWebView(ref) {
    this.webview = ref;
  }

  onMessage(event) {
    if (event.body.message) {
      if (event.body.type) {
        // send log to app debugger
        switch (event.body.type) {
          case 'error':
            console.error(event.body.message);
            break;
          case 'info':
            console.debug(event.body.message);
            break;
          default:
            console.log(event.body.message);
            break;
        }
      } else console.log(event.body.message);
    }
  }

  render() {
    return (
      <CustomWebView
        ref={this.registerWebView}
        source={{ uri: 'http://localhost:8800/engine/' }}
        onLoadEnd={this.onLoadEnd}
        onMessage={this.onMessage}
      />
    );
  }
}
