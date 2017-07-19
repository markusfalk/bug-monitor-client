# Bug Monitor Client

## Minimum Setup
```html
<script src="bug-monitor-client.js"></script>
<script>
  setBugMonitorClientConfigDefaultValue('bugMonitorUrl', 'https://url-to-your-local-bug-monitor.io');
</script>
```

This setup will load the `bug-monitor-client.js` and then set it up with the URL the data is sent to.

## Options

\* = requried

| Property  | Default | Type | Description |
| -------- | -------- | ---- | ----------- |
| bugMonitorUrl* | "" | String | URL the script is sending to |
| customFields  | {} | any | A custom field that will be sent with the request |
| disabled | false | Boolean | can be used to disable logging in development environments  |
| httpMethod | 'POST' | String | HTTP method |
| timeout | 2000 | Number in milliseconds | This is a timeout for the xhr request to the back-end your sending to |
| verbose | true | Boolean | Set this to false and bug-monitor-client will only report errors |

### How to use

```javascript
setBugMonitorClientConfigDefaultValue('property', 'value');
```

#### Example

```javascript
// default 'POST'
setBugMonitorClientConfigDefaultValue('httpMethod', 'GET');

// disable logging while developing
var isDevEnvironment = true; // somehwere in your code
setBugMonitorClientConfigDefaultValue('disabled', isDevEnvironment);
```

## Sent Data

Data that will be sent to the collecting endpoint when an error in your JS occurs:

```javascript
{
  'column': 1,
  'customFields': {},
  'innerHeight': 2,
  'innerHeight': 3,
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
setBugMonitorClientConfigDefaultValue('customProperty', customValue);
```

#### Examples

```javascript
setBugMonitorClientConfigDefaultValue('custom field: string', 'String');

setBugMonitorClientConfigDefaultValue('custom field: array', ['foo', 'bar']);

setBugMonitorClientConfigDefaultValue('custom field: object', {'foo': 'bar', 'xyz': 123});

setBugMonitorClientConfigDefaultValue('custom field: boolean', true);

setBugMonitorClientConfigDefaultValue('custom field: number', 123);
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
