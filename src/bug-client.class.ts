import { BugClientError } from './bugClientError.interface';
import { Config } from './config.interface';
import { Payload } from './payload.interface';

export class BugClient {

  // reference global for better minification
  // bugMonitorClientConfigDefault: Config = window.bugMonitorClientConfigDefault;
  bugMonitorClientConfigDefault: Config;

  constructor() {
    console.log('construct');
    this.bugMonitorClientConfigDefault = {
      bugMonitorUrl: '',
      customFields: {},
      disabled: false,
      httpMethod: 'POST',
      timeout: 2000,
      verbose: true
    };
  }

  /**
  * makes bug-monitor-client more or less verbose
  */
  private log(type: string, message: string) {
    if(type === 'info' && this.bugMonitorClientConfigDefault.verbose) {
      console.info(message);
    } else if (type === 'warn' && this.bugMonitorClientConfigDefault.verbose) {
      console.warn(message);
    } else if (type === 'error') {
      console.error(message);
    }
  };

  /**
   * Creates payload and sends it to the endpoint
   */
  private sendErrorToBugMonitor(error: BugClientError) {

    let payload: Payload = {};

    payload.customFields = this.bugMonitorClientConfigDefault.customFields;

    // error
    payload.column = error.column;
    payload.line = error.line;
    payload.url = error.url;

    if(typeof error.message === 'string') {
      payload.message = error.message;
    }

    if(error.errorObject) {
      payload.stack = error.errorObject.stack;
    }

    // navigator
    payload.language = navigator.language;
    payload.userAgent = navigator.userAgent;

    // window
    payload.innerHeight = window.innerHeight;
    payload.innerWidth = window.innerWidth;

    let xhr = new XMLHttpRequest();

    xhr.open(this.bugMonitorClientConfigDefault.httpMethod, this.bugMonitorClientConfigDefault.bugMonitorUrl, true);

    //options
    xhr.timeout = this.bugMonitorClientConfigDefault.timeout;
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onload = (response: any) => {

      switch (response.currentTarget.status) {
        case  404:
          this.log('warn', 'The bug-monitor-client could not find your back-end! (' + response.currentTarget.status + ': ' + response.currentTarget.statusText + ')');
          break;
        case 200:
          this.log('info', 'The bug-monitor-client successfully reported an error to ' + this.bugMonitorClientConfigDefault.bugMonitorUrl);
          break;
        //default:

      }

    };

    xhr.send(JSON.stringify(payload));

    xhr.ontimeout = (err) => {
      this.log('warn', 'The bug-monitor back-end timed out. ' + err);
    };

  }

  /**
  * sets values to the global config object
  */
  // setCustomOptions () {
  //   window.setBugMonitorClientConfigDefaultValue = function(property, value) {
  //     if(this.bugMonitorClientConfigDefault.hasOwnProperty(property)) {
  //       this.bugMonitorClientConfigDefault[property] = value;
  //     } else {
  //       this.bugMonitorClientConfigDefault.customFields[property] = value;
  //     }
  //   }
  // };

  /**
   * Sets Listener-function called by the browser 'onerror'
   */
  setErrorListener () {
    const classInstance = this;
    window.onerror = function(message, url, lineNumber, columnNumber, errorObject) {

      let string = '';

      if (typeof message === 'string') {
        string = message.toLowerCase();
      }

      if (!(string.indexOf('script error') > -1)) {

        let error: BugClientError = {
          message: message,
          url: url,
          line: lineNumber,
          column: columnNumber,
          errorObject: errorObject
        };

        classInstance.sendErrorToBugMonitor(error);

      }

      return false;
    }
  };

  /**
   * Go thru set options and validate minimum setup
   */
  validateSetup () {

    let isValid = true;

    try {
      if(this.bugMonitorClientConfigDefault.bugMonitorUrl === '') {
        throw new Error(
          'No url set for bug-monitor-client! Add bugMonitorUrl option to your setup: ' +
          'setBugMonitorClientConfigDefaultValue(\'bugMonitorUrl\', \'http:\/\/your-url.com\');'
        );
      }
    } catch (err) {
      this.log('error', err);
    }

    if (this.bugMonitorClientConfigDefault.disabled) {
      this.log('info', 'The bug-monitor-client script has been disabled on this page.');
      isValid = false;
    }

    return isValid;

  }

}
