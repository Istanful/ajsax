# AjSax
A simple javascript library that provides methods
for performing the basic HTTP methods asyncrhonously.

## Methods

### POST
```javascript
AjSax.post('http://example.com', { my_key: 'my_data' }, onSuccess, onFailure)
```

### PUT
```javascript
AjSax.put('http://example.com', { my_key: 'my_data' }, onSuccess, onFailure)
```

### GET
```javascript
AjSax.get('http://example.com', { my_key: 'my_data' }, onSuccess, onFailure)
```

### DELETE
```javascript
AjSax.delete('http://example.com', { my_key: 'my_data' }, onSuccess, onFailure)
```
