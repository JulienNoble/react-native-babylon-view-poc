import { WebView } from 'react-native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class CustomWebView extends Component {
  constructor(props) {
    super(props);
    this.registerWebView = this.registerWebView.bind(this);
    this.evaluateJavaScript = this.evaluateJavaScript.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  onMessage(event) {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      this.props.onMessage({
        body: data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  registerWebView(ref) {
    this.webview = ref;
  }

  evaluateJavaScript(script) {
    if (this.webview) {
      this.webview.injectJavaScript(`window.${script}`);
    }
  }

  render() {
    return (
      <WebView
        ref={this.registerWebView}
        source={this.props.source}
        onLoadEnd={this.props.onLoadEnd}
        onMessage={this.onMessage}
      />
    );
  }
}

CustomWebView.propTypes = {
  source: PropTypes.object,
  onLoadEnd: PropTypes.func,
  onMessage: PropTypes.func,
};
