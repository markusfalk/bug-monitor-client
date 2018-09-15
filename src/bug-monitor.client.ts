import { BugClientError } from './bugClientError.interface';
import { Payload } from './payload.interface';
import { Config } from './config.interface';

/**!
Bug Monitor Client
@author: mail@markus-falk.com
@url: https://github.com/markusfalk/bug-monitor-client/
@license AGPL-3.0
*/

export class BugMonitorClient {

  private bugMonitorClientConfig: Config;

  constructor(userConfig: Config) {

    const bugMonitorClientConfigDefaults: Config = {
      bugMonitorUrl: '',
      clientName: '',
      customFields: [],
      disabled: false,
      httpMethod: 'POST',
      timeout: 2000,
      verbose: true
    };

    this.bugMonitorClientConfig = {...bugMonitorClientConfigDefaults, ...userConfig};

    const classInstance = this;
    document.addEventListener('DOMContentLoaded', () => {
      if(classInstance.validateSetup()) {
        classInstance.setErrorListener();
      }
    });
  }

  /**
   * Logging Helper
   *
   * @private
   * @param {string} type
   * @param {string} message
   * @memberof BugMonitorClient
   */
  private log(type: string, message: string) {
    if(type === 'info' && this.bugMonitorClientConfig.verbose) {
      console.info(message);
    } else if (type === 'warn' && this.bugMonitorClientConfig.verbose) {
      console.warn(message);
    } else if (type === 'error') {
      console.error(message);
    }
  };

  /**
   * Creates payload and sends it to the endpoint
   */
  private sendErrorToBugMonitor(error: BugClientError): void {

    let payload: Payload = {};

    payload.clientName = this.bugMonitorClientConfig.clientName;
    payload.customFields = this.bugMonitorClientConfig.customFields;

    // error
    payload.column = error.column;
    payload.line = error.line;
    payload.filename = error.filename;

    if (typeof error.message === 'string') {
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

    // xhr
    let xhr = new XMLHttpRequest();
    xhr.open(this.bugMonitorClientConfig.httpMethod, this.bugMonitorClientConfig.bugMonitorUrl, true);
    xhr.timeout = this.bugMonitorClientConfig.timeout;
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onload = (response: any) => {

      switch (response.currentTarget.status) {
        case  404:
          this.log('warn', 'The bug-monitor-client could not find your back-end! (' + response.currentTarget.status + ': ' + response.currentTarget.statusText + ')');
          break;
        case 200:
          this.log('info', 'The bug-monitor-client successfully reported an error to ' + this.bugMonitorClientConfig.bugMonitorUrl);
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
   * Sets Listener-function called by the browser 'onerror'
   */
  private setErrorListener (): void {

    window.addEventListener('error', (event) => {
      let error: BugClientError = {
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        errorObject: event.error
      };
      this.sendErrorToBugMonitor(error);
    });

  };

  /**
   * Go thru set options and validate minimum setup
   */
  private validateSetup() {

    let isValid = true;

    try {
      if (this.bugMonitorClientConfig.bugMonitorUrl === '') {
        throw new Error(
          `bugMonitorUrl needs to be set for bug-monitor-client!`
        );
      }
      if (this.bugMonitorClientConfig.clientName === '') {
        throw new Error(
          `clientName needs to be set for bug-monitor-client!`
        );
      }
    } catch (err) {
      this.log('error', err);
    }

    if (this.bugMonitorClientConfig.disabled) {
      this.log('info', 'The bug-monitor-client script has been disabled on this page.');
      isValid = false;
    }

    return isValid;

  }

}
