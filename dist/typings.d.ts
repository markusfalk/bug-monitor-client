// Type definitions for bug-monitor-client
// Definitions by: @markus_falk

declare module 'bug-monitor-client' {

  /*
   * URL the script is sending to
   */
  export function setBugMonitorClientConfigDefaultValue(
    property: "bugMonitorUrl" ,
    value: string
  ): void

  /*
   * A custom field that will be sent with the request
   */
  export function setBugMonitorClientConfigDefaultValue(
    property: "customFields" ,
    value: any
  ): void

  /*
   * can be used to disable logging in development environments
   */
  export function setBugMonitorClientConfigDefaultValue(
    property: "disabled" ,
    value: boolean
  ): void

  /*
   * HTTP method the script uses to send
   */
  export function setBugMonitorClientConfigDefaultValue(
    property: "httpMethod" ,
    value: string
  ): void

  /*
   * This is a timeout (in milliseconds) for the xhr request to the back-end your sending to
   */
  export function setBugMonitorClientConfigDefaultValue(
    property: "timeout" ,
    value: number
  ): void

  /*
   * Set this to false and bug-monitor-client will only report errors
   */
  export function setBugMonitorClientConfigDefaultValue(
    property: "verbose" ,
    value: boolean
  ): void

}
