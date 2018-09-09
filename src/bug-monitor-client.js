(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BugMonitorClient = (function () {
        function BugMonitorClient() {
            this.log = function (type, message) {
                if (type === 'info' && this.bugMonitorClientConfigDefault.verbose) {
                    console.info(message);
                }
                else if (type === 'warn' && this.bugMonitorClientConfigDefault.verbose) {
                    console.warn(message);
                }
                else if (type === 'error') {
                    console.error(message);
                }
            };
            this.sendErrorToBugMonitor = function (config, error) {
                var payload = {};
                payload.customFields = this.bugMonitorClientConfigDefault.customFields;
                payload.column = error.column;
                payload.line = error.line;
                payload.message = error.message;
                payload.url = error.url;
                if (error.errorObject) {
                    payload.stack = error.errorObject.stack;
                }
                payload.language = navigator.language;
                payload.userAgent = navigator.userAgent;
                payload.innerHeight = window.innerHeight;
                payload.innerWidth = window.innerWidth;
                var xhr = new XMLHttpRequest();
                xhr.open(bugMonitorClientConfigDefault.httpMethod, bugMonitorClientConfigDefault.bugMonitorUrl, true);
                xhr.timeout = bugMonitorClientConfigDefault.timeout;
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.onload = function (response) {
                    switch (response.currentTarget.status) {
                        case 404:
                            this.log('warn', 'The bug-monitor-client could not find your back-end! (' + response.currentTarget.status + ': ' + response.currentTarget.statusText + ')');
                            break;
                        case 200:
                            this.log('info', 'The bug-monitor-client successfully reported an error to ' + bugMonitorClientConfigDefault.bugMonitorUrl);
                            break;
                    }
                };
                xhr.ontimeout = function (err) {
                    this.log('warn', 'The bug-monitor back-end timed out. ' + err);
                };
                xhr.send(JSON.stringify(payload));
            };
            this.setupDefaults = function () {
                this.bugMonitorClientConfigDefault = {
                    bugMonitorUrl: '',
                    customFields: {},
                    disabled: false,
                    httpMethod: 'POST',
                    timeout: 2000,
                    verbose: true
                };
            };
            this.setCustomOptions = function () {
                window.setBugMonitorClientConfigDefaultValue = function (property, value) {
                    if (this.bugMonitorClientConfigDefault.hasOwnProperty(property)) {
                        this.bugMonitorClientConfigDefault[property] = value;
                    }
                    else {
                        this.bugMonitorClientConfigDefault.customFields[property] = value;
                    }
                };
            };
            this.setErrorListener = function () {
                window.onerror = function (message, url, lineNumber, columnNumber, errorObject) {
                    var string = message.toLowerCase();
                    if (!string.indexOf('script error') > -1) {
                        var error = {
                            'message': message,
                            'url': url,
                            'line': lineNumber,
                            'column': columnNumber,
                            'errorObject': errorObject
                        };
                        this.sendErrorToBugMonitor(this.bugMonitorClientConfigDefault, error);
                    }
                    return false;
                };
            };
            this.validateSetup = function () {
                var isValid = true;
                try {
                    if (this.bugMonitorClientConfigDefault.bugMonitorUrl === '') {
                        throw new Error('No url set for bug-monitor-client! Add bugMonitorUrl option to your setup: ' +
                            'setBugMonitorClientConfigDefaultValue(\'bugMonitorUrl\', \'http:\/\/your-url.com\');');
                    }
                }
                catch (err) {
                    this.log('error', err);
                }
                if (this.bugMonitorClientConfigDefault.disabled) {
                    this.log('info', 'The bug-monitor-client script has been disabled on this page.');
                    isValid = false;
                }
                return isValid;
            };
        }
        return BugMonitorClient;
    }());
    var bugMonitorClient = new BugMonitorClient();
    bugMonitorClient.setupDefaults();
    bugMonitorClient.setCustomOptions();
    document.addEventListener('DOMContentLoaded', function () {
        if (bugMonitorClient.validateSetup()) {
            bugMonitorClient.setErrorListener();
        }
    });
});
//# sourceMappingURL=bug-monitor-client.js.map