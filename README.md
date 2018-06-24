# AjSax
A simple javascript library that provides methods for performing the basic HTTP methods asynchronously. "Aj, Sax!" means "Ouch, Scissors!" in swedish. This is fun because it sounds like AJAX.

## Usage
Example:
```javascript
AjSax.post('http://example.com', {
  data: { scissors: "Don't run!" },
  headers: { Accept: 'application/json' }
}, function(data, status) {
  console.log('Warning sent successfully!');
}, function(data, status) {
  console.log('Could not send warning. Try again!');
});
```

Any request is performed with the signature `AjSax.<method>`.

```javascript
AjSax.post(url, options, onSuccess, onFailure);
```

Each method accepts four arguments:
- The `url` to request.
- `options` to modify the request. The following options are available:
    - The HTTP `headers` to be set. Expressed as objects: `{ Accept: 'application/json' }`
    - The form `data` to be sent. Expressed as objects and encoded as JSON.
    - The query `args` to be sent. Expressed as objects and appended to the `url`.
- `onSuccess` should be a function to be called when the response is successful.
  Will be passed the parsed data as well as the status code.
- `onFailure` should be a function to be called when the response is successful.
  Will be passed the parsed data as well as the status code.
