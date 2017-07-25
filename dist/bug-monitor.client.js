/**!
  Bug Monitor Client
  @author: mail@markus-falk.com
  @url: https://github.com/markusfalk/bug-monitor-client/
  @license AGPL-3.0
*/
!function(e,t){"function"==typeof define&&define.amd?define("setBugMonitorClientConfigDefaultValue",[],t):"object"==typeof module&&module.exports?module.exports.setBugMonitorClientConfigDefaultValue=t():e.setBugMonitorClientConfigDefaultValue=t()}(this,function(){"strict mode";var e=window.bugMonitorClientConfigDefault,t=function(t,o){"info"===t&&e.verbose?console.info(o):"warn"===t&&e.verbose?console.warn(o):"error"===t&&console.error(o)},o=function(o,n){var r={};r.customFields=e.customFields,r.column=n.column,r.line=n.line,r.message=n.message,r.url=n.url,n.errorObject&&(r.stack=n.errorObject.stack),r.language=navigator.language,r.userAgent=navigator.userAgent,r.innerHeight=window.innerHeight,r.innerWidth=window.innerWidth;var i=new XMLHttpRequest;i.open(e.httpMethod,e.bugMonitorUrl,!0),i.timeout=e.timeout,i.setRequestHeader("Content-type","application/json"),i.onload=function(o){switch(o.currentTarget.status){case 404:t("warn","The bug-monitor-client could not find your back-end! ("+o.currentTarget.status+": "+o.currentTarget.statusText+")");break;case 200:t("info","The bug-monitor-client successfully reported an error to "+e.bugMonitorUrl)}},i.ontimeout=function(e){t("warn","The bug-monitor back-end timed out. "+e)},i.send(JSON.stringify(r))},n=function(){window.onerror=function(e,t,n,r,i){return!e.toLowerCase().indexOf("script error")>-1&&o(0,{message:e,url:t,line:n,column:r,errorObject:i}),!1}},r=function(){var o=!0;try{if(""===e.bugMonitorUrl)throw new Error("No url set for bug-monitor-client! Add bugMonitorUrl option to your setup: setBugMonitorClientConfigDefaultValue('bugMonitorUrl', 'http://your-url.com');")}catch(e){t("error",e)}return e.disabled&&(t("info","The bug-monitor-client script has been disabled on this page."),o=!1),o};return e={bugMonitorUrl:"",customFields:{},disabled:!1,httpMethod:"POST",timeout:2e3,verbose:!0},document.addEventListener("DOMContentLoaded",function(){r()&&n()}),function(t,o){e.hasOwnProperty(t)?e[t]=o:e.customFields[t]=o}});
//# sourceMappingURL=bug-monitor.client.js.map