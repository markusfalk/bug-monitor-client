import { BugClientError } from './bugClientError.interface';
import { Payload } from './payload.interface';
import { UserConfig } from './user-config.interface';
import { DefaultConfig } from './default-config.interface';

/**!
  * Bug Monitor Client
  * @author: mail@markus-falk.com
  * @class BugMonitorClient
  * @export
  * @license AGPL-3.0
  * @url: https://github.com/markusfalk/bug-monitor-client/
*/
export class BugMonitorClient {

  private bugMonitorClientConfig: DefaultConfig;

  /**
   * Creates an instance of BugMonitorClient.
   * @param {UserConfig} userConfig
   * @memberof BugMonitorClient
   */
  constructor(userConfig: UserConfig) {

    const bugMonitorClientConfigDefaults: DefaultConfig = {
      bugMonitorUrl: '',
      clientName: '',
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
   * @returns {void}
   * @memberof BugMonitorClient
   */
  private log(type: string, message: string): void {
    if(console.info && type === 'info' && this.bugMonitorClientConfig.verbose) {
      console.info(message);
    } else if (console.warn && type === 'warn' && this.bugMonitorClientConfig.verbose) {
      console.warn(message);
    } else if (console.error && type === 'error') {
      console.error(message);
    }
  };

  /**
   * Creates payload and sends it to the endpoint
   *
   * @private
   * @returns {void}
   * @param {BugClientError} error
   * @memberof BugMonitorClient
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
    xhr.open(
      this.bugMonitorClientConfig.httpMethod,
      this.bugMonitorClientConfig.bugMonitorUrl,
      true
    );
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
   * Adds event listener to catch errors on window
   *
   * @private
   * @returns {void}
   * @memberof BugMonitorClient
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
   * Validates the given setup by the user.
   *
   * @private
   * @returns {boolean}
   * @memberof BugMonitorClient
   */
  private validateSetup(): boolean {

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
