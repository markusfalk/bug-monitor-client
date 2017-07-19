/**!
  Bug Monitor Client
  @author: mail@markus-falk.com
  @url: https://github.com/markusfalk/bug-monitor-client/
  @license AGPL-3.0
*/

(function(window, navigator) {

  'strict mode';

  // reference global for better minification
  var bugMonitorClientConfigDefault = window.bugMonitorClientConfigDefault;

  /**
  * provide default values for known options
  * @private
  */
  var _setupDefaults = function() {
    // set default values
    bugMonitorClientConfigDefault = {
      bugMonitorUrl: '',
      customFields: {},
      disabled: false,
      httpMethod: 'POST',
      timeout: 2000
    };
  }

  /**
  * sets values to the global config object
  * @private
  */
  var _setCustomOptions = function() {
    window.setBugMonitorClientConfigDefaultValue = function(property, value) {
      if(bugMonitorClientConfigDefault.hasOwnProperty(property)) {
        bugMonitorClientConfigDefault[property] = value;
      } else {
        bugMonitorClientConfigDefault.customFields[property] = value;
      }
    }
  };

  /**
   * Creates payload and sends it to the endpoint
   * @private
   */
  var _sendErrorToBugMonitor = function(config, error) {

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

    //options
    xhr.timeout = bugMonitorClientConfigDefault.timeout;
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.ontimeout = function (err) {
      console.warn('The bug-monitor back-end timed out. ' + err);
    };

    xhr.send(JSON.stringify(payload));

  }

  /**
   * Sets Listener-function called by the browser 'onerror'
   * @private
   */
  var _setErrorListener = function() {
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

        _sendErrorToBugMonitor(bugMonitorClientConfigDefault, error);

      }

      return false;

    }
  };

  /**
   * Go thru set options and validate minimum setup
   * @private
   */

  var _validateSetup = function() {

    var isValid = true;

    try {
      if(bugMonitorClientConfigDefault.bugMonitorUrl === '') {
        throw new Error(
          'No url set for bug-monitor-client! Add bugMonitorUrl option to your setup: ' +
          'setBugMonitorClientConfigDefaultValue(\'bugMonitorUrl\', \'http:\/\/your-url.com\');'
        );
      }
    } catch (err) {
      console.error(err);
    }

    if (bugMonitorClientConfigDefault.disabled) {
      console.info('The bug-monitor-client script has been disabled on this page.');
      isValid = false;
    }

    return isValid;

  }

  // init the whole thing
  _setupDefaults();
  _setCustomOptions();

  document.addEventListener('DOMContentLoaded', function() {
    if(_validateSetup()) {
      _setErrorListener();
    }
  });

}(window, navigator));
