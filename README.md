# Bug Monitor Client

This script will help you track your JS errors in production. 

It is a commonJS module that tracks errors in your code and sends them to a url for you to collect.

## Minimum Setup

```javascript
import { BugMonitorClient } from 'bug-monitor-client';

var bmc = new BugMonitorClient({
  bugMonitorUrl: 'https://url-to-your-local-bug-monitor.io'
});
```

## Options

\* = requried

| Property  | Default | Type | Description |
| -------- | -------- | ---- | ----------- |
| bugMonitorUrl* | "" | String | URL the script is sending to |
| clientName* | "" | String | Name of the project |
| customFields  | {} | any | A custom field that will be sent with the request |
| disabled | false | Boolean | can be used to disable logging in development environments  |
| httpMethod | 'POST' | String | HTTP method |
| timeout | 2000 | Number in milliseconds | This is a timeout for the xhr request to the back-end your sending to |
| verbose | true | Boolean | Set this to false and bug-monitor-client will only report errors |

## Sent Data

Data that will be sent to the collecting endpoint when an error in your JS occurs:

```javascript
{
  'clientName': '',
  'column': 1,
  'customFields': {},
  'innerHeight': 2,
  'innerWidth': 3,
  'language': '',
  'line': 4,
  'message': '',
  'stack': '',
  'url': '',
  'userAgent': ''
}
```

### Custom Fields

Send your own data with custom fields:

```javascript
bmc = new BugMonitorClient({
  bugMonitorUrl: 'http://localhost:4200',
  customFields: [
    { 'string': 'foo' },
    { 'object': {foobar: 'barfoo'} },
    { 'array': [0, 1] }
  ]
});
```

## Browser Support

### Desktop

* Chrome
* Edge
* Firefox
* Internet Explorer >= 9
* Safari

### Mobile

* Android Chrome 6
* iOS Safari 4
