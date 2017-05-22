# Bug Monitor Client

ALPHA - NOT READY FOR PRODUCTION.

## Minimum Setup
```html
<script src="../src/bug-monitor-client.js"></script>
<script>
  setBugMonitorClientConfigDefaultValue('bugMonitorUrl', 'http://192.168.178.37:5000');
</script>
```

## Options

| Property  | Default | Type | Description |
| -------- | -------- | ---- | ----------- |
| bugMonitorUrl | '' | String | URL the script is sending to |
| customFields  | {} | String or Array | A custom field that will be sent with the request |
| httpMethod | 'POST' | String | HTTP method |

### How to use

```javascript
setBugMonitorClientConfigDefaultValue('property', 'value');
```

## Sent Data

Data that will be sent to the collecting endpoint:

```javascript
{
  'appCodeName': '',
  'appVersion': '',
  'column': '',
  'customFields': {},
  'innerHeight': 0,
  'innerHeight': 0,
  'language': '',
  'line': '',
  'message': '',
  'platform': '',
  'stack': '',
  'url': '',
  'userAgent': ''
}
```

### Custom Fields

Send your own data with custom fields:

```javascript
setBugMonitorClientConfigDefaultValue('customProperty', 'customValue');
```

## Browser Support

to be defined!
