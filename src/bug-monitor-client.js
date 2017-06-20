/**
  Bug Monitor Client
  @author: mail@markus-falk.com
  @url: https://github.com/markusfalk/bug-monitor
  @license AGPL-3.0
*/

(function(window, navigator) {

  'strict mode';

  // reference global for better minification
  var bugMonitorClientConfigDefault = window.bugMonitorClientConfigDefault;

  // set default values
  bugMonitorClientConfigDefault = {
    bugMonitorUrl: '',
    customFields: {},
    httpMethod: 'POST'
  };

  /**
   * sets values to the global config object
   * @public
   */
  window.setBugMonitorClientConfigDefaultValue = function(property, value) {

     if(bugMonitorClientConfigDefault.hasOwnProperty(property)) {
       bugMonitorClientConfigDefault[property] = value;
     } else {
       bugMonitorClientConfigDefault.customFields[property] = value;
     }

  }

  /**
   * Creates payload and sends it to the endpoint
   * @private
   */
  var sendErrorToBugMonitor = function(config, error) {

    var payload = {};

    payload.customFields = bugMonitorClientConfigDefault.customFields;

    // error
    payload.column = error.column;
    payload.line = error.line;
    payload.message = error.message;
    payload.url = error.url;

    if(error.errorObject) {
      payload.stack = error.errorObject.stack;
    }

    // navigator
    payload.language = navigator.language;
    payload.userAgent = navigator.userAgent;

    // window
    payload.innerHeight = window.innerHeight;
    payload.innerWidth = window.innerWidth;

    var xhr = new XMLHttpRequest();
    xhr.open(bugMonitorClientConfigDefault.httpMethod, bugMonitorClientConfigDefault.bugMonitorUrl, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

  }

  /**
   * Listener-function called by the browser 'onerror'
   * @private
   */
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

      sendErrorToBugMonitor(bugMonitorClientConfigDefault, error);

    }

    return false
  }

}(window, navigator));
