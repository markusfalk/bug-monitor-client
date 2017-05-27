/**
  Bug Monitor Client
  @author: mail@markus-falk.com
  @url: https://github.com/markusfalk/bug-monitor
  @license AGPL-3.0
*/
!function(e,t){"strict mode";var n=e.bugMonitorClientConfigDefault;n={bugMonitorUrl:"",customFields:{},httpMethod:"POST"},e.setBugMonitorClientConfigDefaultValue=function(e,t){n.hasOwnProperty(e)?n[e]=t:n.customFields[e]=t};var r=function(r,o){var i={};i.customFields=n.customFields,i.url=o.url,i.column=o.column,i.line=o.line,i.message=o.message,o.errorObject&&(i.stack=o.errorObject.stack),i.appCodeName=t.appCodeName,i.appVersion=t.appVersion,i.language=t.language,i.userAgent=t.userAgent,i.userAgent=t.userAgent,i.userAgent=t.userAgent,i.innerHeight=e.innerHeight,i.innerWidth=e.innerWidth;var s=new XMLHttpRequest;s.open(n.httpMethod,n.bugMonitorUrl,!0),s.setRequestHeader("Content-type","application/json"),s.send(JSON.stringify(i))};e.onerror=function(e,t,n,o,i){return!e.toLowerCase().indexOf("script error")>-1&&r(0,{message:e,url:t,line:n,column:o,errorObject:i}),!1}}(window,navigator);