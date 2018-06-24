var AjSax = function() {};

AjSax.Request = function(url, method, options) {
  this.url = url.toString();
  this.method = method;
  this.options = options;
  this.xhr = new XMLHttpRequest();

  this.perform = function(data, onSuccess, onFailure) {
    var that = this;
    this.xhr.open(this.method, this.url, true);
    this.setHeaders();
    this.xhr.onreadystatechange = function() {
      that.onStateChanged(onSuccess, onFailure);
    }
    this.xhr.send(JSON.stringify(data));
  }

  this.onStateChanged = function(onSuccess, onFailure) {
    if (this.isPerforming()) { return; }
    if (this.isSuccess()) { return this.performCallback(onSuccess); }
    return this.performCallback(onFailure);
  }

  this.parsedData = function() {
    try { return JSON.parse(this.xhr.responseText); }
    catch { return this.xhr.responseText; }
  }

  this.setHeaders = function() {
    for (var key in this.options.headers) {
      this.xhr.setRequestHeader(key, this.options.headers[key]);
    }
  }

  this.performCallback = function(callback) {
    if (!callback) { return; }
    callback(this.parsedData(), this.xhr.status);
  }

  this.isPerforming = function() { return this.xhr.readyState != 4; }
  this.isSuccess = function() { return this.xhr.status == 200; }
}

AjSax.Query = function(object) {
  this.object = object;
  this.toString = function() {
    var query = '?'
    for (var key in this.object) {
      query += key + "=" + encodeURIComponent(this.object[key]) + "&";
    }
    return query.slice(0, -1)
  }
}

AjSax.Url = function(url, args) {
  this.url = url;
  this.args = args;

  this.toString = function() {
    return url + new AjSax.Query(this.args);
  }
}

AjSax.perform = function(url, method, options, onSuccess, onFailure) {
  new AjSax.Request(new AjSax.Url(url, options['args']), 'POST', options)
           .perform(options['data'], onSuccess, onFailure);
}

AjSax.post = function(url, opts, success, failure) {
  AjSax.perform(url, 'POST', opts, success, failure);
}

AjSax.put = function(url, opts, success, failure) {
  AjSax.perform(url, 'POST', opts, success, failure);
}

AjSax.get = function(url, opts, success, failure) {
  AjSax.perform(url, 'GET', opts, success, failure);
}

AjSax.delete = function(url, opts, success, failure) {
  AjSax.perform(url, 'DELETE', opts, success, failure);
}
