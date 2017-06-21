/**
  Bug Monitor Client
  @author: mail@markus-falk.com
  @url: https://github.com/markusfalk/bug-monitor
  @license AGPL-3.0
*/
!function(e,n){"strict mode";var t=e.bugMonitorClientConfigDefault,o=function(o,r){var i={};i.customFields=t.customFields,i.column=r.column,i.line=r.line,i.message=r.message,i.url=r.url,r.errorObject&&(i.stack=r.errorObject.stack),i.language=n.language,i.userAgent=n.userAgent,i.innerHeight=e.innerHeight,i.innerWidth=e.innerWidth;var u=new XMLHttpRequest;u.open(t.httpMethod,t.bugMonitorUrl,!0),u.setRequestHeader("Content-type","application/json"),u.send(JSON.stringify(i))},r=function(){e.onerror=function(e,n,t,r,i){return!e.toLowerCase().indexOf("script error")>-1&&o(0,{message:e,url:n,line:t,column:r,errorObject:i}),!1}};!function(){t={bugMonitorUrl:"",customFields:{},httpMethod:"POST",disabled:!1}}(),function(){e.setBugMonitorClientConfigDefaultValue=function(e,n){t.hasOwnProperty(e)?t[e]=n:t.customFields[e]=n}}(),document.addEventListener("DOMContentLoaded",function(){t.disabled||r()})}(window,navigator);