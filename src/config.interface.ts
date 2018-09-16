import { CustomField } from "./custom-field.interface";

export interface Config {

  /**
   * URL to the collecting back-end.
   *
   * @type {string}
   * @memberof Config
   */
  bugMonitorUrl: string;

  /**
   * An identifier that can be used by the back-end to
   * filter differenct clients sending errors.
   *
   * @type {string}
   * @memberof Config
   */
  clientName: string;

  /**
   * An object that cann be filled with custom properties
   * that will then be sent to the back-end.
   *
   * @type {CustomField}
   * @default null
   * @memberof Config
   */
  customFields?: CustomField | null;

  /**
   * Invalidates the setup.
   * No error listener will be added to `window` if set to `true`.
   *
   * @type {boolean}
   * @default false
   * @memberof Config
   */
  disabled?: boolean;

  /**
   * Adjust the method of the XMLHttpRequest.
   *
   * @type {string}
   * @default 'POST'
   * @memberof Config
   */
  httpMethod?: string;

  /**
   * Adjust the timeout of the XMLHttpRequest.
   *
   * @type {number}
   * @default 2000
   * @memberof Config
   */
  timeout?: number;

  /**
   * Adjust console output.
   *
   * @type {boolean}
   * @default true
   * @memberof Config
   */
  verbose?: boolean;
}
