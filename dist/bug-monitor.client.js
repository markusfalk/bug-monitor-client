"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BugMonitorClient = (function () {
    function BugMonitorClient(userConfig) {
        var bugMonitorClientConfigDefaults = {
            bugMonitorUrl: '',
            clientName: '',
            customFields: {},
            disabled: false,
            httpMethod: 'POST',
            timeout: 2000,
            verbose: true
        };
        this.bugMonitorClientConfig = __assign({}, bugMonitorClientConfigDefaults, userConfig);
        var classInstance = this;
        document.addEventListener('DOMContentLoaded', function () {
            if (classInstance.validateSetup()) {
                classInstance.setErrorListener();
            }
        });
    }
    BugMonitorClient.prototype.log = function (type, message) {
        if (type === 'info' && this.bugMonitorClientConfig.verbose) {
            console.info(message);
        }
        else if (type === 'warn' && this.bugMonitorClientConfig.verbose) {
            console.warn(message);
        }
        else if (type === 'error') {
            console.error(message);
        }
    };
    ;
    BugMonitorClient.prototype.sendErrorToBugMonitor = function (error) {
        var _this = this;
        var payload = {};
        payload.clientName = this.bugMonitorClientConfig.clientName;
        payload.customFields = this.bugMonitorClientConfig.customFields;
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
        xhr.open(this.bugMonitorClientConfig.httpMethod, this.bugMonitorClientConfig.bugMonitorUrl, true);
        xhr.timeout = this.bugMonitorClientConfig.timeout;
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function (response) {
            switch (response.currentTarget.status) {
                case 404:
                    _this.log('warn', 'The bug-monitor-client could not find your back-end! (' + response.currentTarget.status + ': ' + response.currentTarget.statusText + ')');
                    break;
                case 200:
                    _this.log('info', 'The bug-monitor-client successfully reported an error to ' + _this.bugMonitorClientConfig.bugMonitorUrl);
                    break;
            }
        };
        xhr.send(JSON.stringify(payload));
        xhr.ontimeout = function (err) {
            _this.log('warn', 'The bug-monitor back-end timed out. ' + err);
        };
    };
    BugMonitorClient.prototype.setErrorListener = function () {
        var _this = this;
        window.addEventListener('error', function (event) {
            var error = {
                message: event.message,
                url: event.filename,
                line: event.lineno,
                column: event.colno,
                errorObject: event.error
            };
            _this.sendErrorToBugMonitor(error);
        });
    };
    ;
    BugMonitorClient.prototype.validateSetup = function () {
        var isValid = true;
        try {
            if (this.bugMonitorClientConfig.bugMonitorUrl === '') {
                throw new Error("bugMonitorUrl needs to be set for bug-monitor-client!");
            }
            if (this.bugMonitorClientConfig.clientName === '') {
                throw new Error("clientName needs to be set for bug-monitor-client!");
            }
        }
        catch (err) {
            this.log('error', err);
        }
        if (this.bugMonitorClientConfig.disabled) {
            this.log('info', 'The bug-monitor-client script has been disabled on this page.');
            isValid = false;
        }
        return isValid;
    };
    return BugMonitorClient;
}());
exports.BugMonitorClient = BugMonitorClient;
//# sourceMappingURL=bug-monitor.client.js.map