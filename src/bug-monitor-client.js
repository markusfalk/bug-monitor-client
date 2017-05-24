/**
  Bug Monitor Client
  @author: mail@markus-falk.com
  @url: https://github.com/markusfalk/bug-monitor
  @license AGPL-3.0
*/

(function(window, navigator) {

  'strict mode';

  // reference global for better minification
  var bmccd = window.bugMonitorClientConfigDefault;

  // set default values
  bmccd = {
    bugMonitorUrl: '',
    customFields: {},
    httpMethod: 'POST'
  };

  /**
   * sets values to the global config object
   * @public
   */
  window.setBugMonitorClientConfigDefaultValue = function(property, value) {

     if(bmccd.hasOwnProperty(property)) {
       bmccd[property] = value;
     } else {
       bmccd.customFields[property] = value;
     }

  }

  /**
   * Creates payload and sends it to the endpoint
   * @private
   */
  var sendErrorToBugMonitor = function(config, error) {

    var payload = {};

    payload.customFields = bmccd.customFields;

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
    xhr.open(bmccd.httpMethod, bmccd.bugMonitorUrl, true);
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

      sendErrorToBugMonitor(bmccd, error);

    }

    return false
  }

}(window, navigator));
