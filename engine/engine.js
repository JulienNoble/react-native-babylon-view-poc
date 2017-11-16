// check if we're on iOS
var userAgent = window.navigator.userAgent.toLowerCase(),
  ios = /iphone|ipod|ipad/.test(userAgent);

// "helper" function to help you get stuff back to the app
var sendMessage = function(message) {
  if (window.webkit.messageHandlers.reactNative.postMessage) {
    // iOS
    window.webkit.messageHandlers.reactNative.postMessage(message);
  } else {
    // Windows (and probably Android too)
    window.postMessage(JSON.stringify(message));
  }
};

// helper log function
var log = function(message, type) {
  if (ios)
    sendMessage({
      message: `[BabylonView] ${message}`,
      type,
    });
};

// replacing console.log and error event to redirect their outputs to the app
var baseLogFunction = console.log;
console.log = function() {
  baseLogFunction.apply(console, arguments);

  var args = Array.prototype.slice.call(arguments);
  for (var i = 0; i < args.length; i++) {
    log(`[window] ${args[i]}`, 'info');
  }
};

window.onerror = function(message, url, linenumber) {
  log(
    'JavaScript error: ' + message + ' on line ' + linenumber + ' for ' + url,
    'error',
  );
};

// testing logs
log('Yo logs woohoo');
log('More discrete logs', 'info');
console.log('window logs');
