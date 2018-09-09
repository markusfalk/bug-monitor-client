"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BugClient = (function () {
    function BugClient() {
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
    BugClient.prototype.log = function (type, message) {
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
    ;
    BugClient.prototype.sendErrorToBugMonitor = function (error) {
        var _this = this;
        var payload = {};
        payload.customFields = this.bugMonitorClientConfigDefault.customFields;
        payload.column = error.column;
        payload.line = error.line;
        payload.url = error.url;
        if (typeof error.message === 'string') {
            payload.message = error.message;
        }
        if (error.errorObject) {
            payload.stack = error.errorObject.stack;
        }
        payload.language = navigator.language;
        payload.userAgent = navigator.userAgent;
        payload.innerHeight = window.innerHeight;
        payload.innerWidth = window.innerWidth;
        var xhr = new XMLHttpRequest();
        xhr.open(this.bugMonitorClientConfigDefault.httpMethod, this.bugMonitorClientConfigDefault.bugMonitorUrl, true);
        xhr.timeout = this.bugMonitorClientConfigDefault.timeout;
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function (response) {
            switch (response.currentTarget.status) {
                case 404:
                    _this.log('warn', 'The bug-monitor-client could not find your back-end! (' + response.currentTarget.status + ': ' + response.currentTarget.statusText + ')');
                    break;
                case 200:
                    _this.log('info', 'The bug-monitor-client successfully reported an error to ' + _this.bugMonitorClientConfigDefault.bugMonitorUrl);
                    break;
            }
        };
        xhr.send(JSON.stringify(payload));
        xhr.ontimeout = function (err) {
            _this.log('warn', 'The bug-monitor back-end timed out. ' + err);
        };
    };
    BugClient.prototype.setErrorListener = function () {
        var classInstance = this;
        window.onerror = function (message, url, lineNumber, columnNumber, errorObject) {
            var string = '';
            if (typeof message === 'string') {
                string = message.toLowerCase();
            }
            if (!(string.indexOf('script error') > -1)) {
                var error = {
                    message: message,
                    url: url,
                    line: lineNumber,
                    column: columnNumber,
                    errorObject: errorObject
                };
                classInstance.sendErrorToBugMonitor(error);
            }
            return false;
        };
    };
    ;
    BugClient.prototype.validateSetup = function () {
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
    return BugClient;
}());
exports.BugClient = BugClient;
//# sourceMappingURL=bug-client.class.js.map