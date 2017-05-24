/**
  Bug Monitor Client
  @author: mail@markus-falk.com
  @url: https://github.com/markusfalk/bug-monitor
  @license AGPL-3.0
*/

(function(window, navigator) {

  'strict mode';

  window.bugMonitorClientConfigDefault = {
    bugMonitorUrl: '',
    customFields: {},
    httpMethod: 'POST'
  };

  window.setBugMonitorClientConfigDefaultValue = function(property, value) {

     if(window.bugMonitorClientConfigDefault.hasOwnProperty(property)) {
       window.bugMonitorClientConfigDefault[property] = value;
     } else {
       window.bugMonitorClientConfigDefault.customFields[property] = value;
     }

  }

  var sendErrorToBugMonitor = function(config, error) {

    var payload = {};

    payload.customFields = window.bugMonitorClientConfigDefault.customFields;

    // error
    payload.url = error.url;
    payload.column = error.column;
    payload.line = error.line;
    payload.message = error.message;

    if(error.errorObject) {
      payload.stack = error.errorObject.stack;
    }

    // navigator
    payload.appCodeName = navigator.appCodeName;
    payload.appVersion = navigator.appVersion;
    payload.language = navigator.language;
    payload.userAgent = navigator.userAgent;
    payload.userAgent= navigator.userAgent;
    payload.userAgent= navigator.userAgent;

    // window
    payload.innerHeight = window.innerHeight;
    payload.innerWidth = window.innerWidth;

    var xhr = new XMLHttpRequest();
    xhr.open(window.bugMonitorClientConfigDefault.httpMethod, window.bugMonitorClientConfigDefault.bugMonitorUrl, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

  }

  window.onerror = function(message, url, lineNumber, columnNumber, errorObject) {

    var string = message.toLowerCase();

    if (!string.indexOf('script error') > -1) {

      var error = {
        'message': message,
        'url': url,
        'line': lineNumber,
        'column': columnNumber,
        'errorObject': errorObject
      };

      sendErrorToBugMonitor(window.bugMonitorClientConfigDefault, error);

    }

    return false
  }


}(window, navigator));
