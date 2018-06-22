var Request = function(options) {
  this.options = options;
  this.xhr = new XMLHttpRequest();

  this.isPerforming = function() { return this.xhr.readyState != 4; }
  this.isSuccess = function() { return this.xhr.status == 200; }

  this.handleResponse = function() {
    if (this.isPerforming()) { return; }
    var data = JSON.parse(this.xhr.responseText);
    if (this.isSuccess()) { return this.performCallback('onSuccess', data); }
    return this.performCallback('onFailure', data);
  }

  this.perform = function(data) {
    var that = this;
    this.xhr.open(options['method'], options['URL'], true);
    this.xhr.onreadystatechange = function() { that.handleResponse(); }
    this.xhr.send(JSON.stringify(data));
  }

  this.performCallback = function(name, data) {
    if (!options[name]) { return; }
    options[name](data);
  }
}
