function ajaxReq(url, options) {
  'use strict';

  // code goes here
  // a function that returns a new object of the keys in the secondObj in the firstObj if they don't exist in the firstObj.
  function extend(firstObj, secondObj) {
      var newObj = secondObj;
      for (var prop in firstObj) {
          if (firstObj.hasOwnProperty(prop)) {
              newObj[prop] = firstObj[prop];
          }
      }
      return newObj;
  }

  var defaults = {
      method: "GET",
      context: this,
      data: {},
      failure: function () {},
      success: function () {},
      complete: function () {}
  };

  options = extend(options, defaults);

  var httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
              options.success.call(options.context, JSON.parse(httpRequest.responseText), httpRequest.status, httpRequest);
          } else if (httpRequest.status === 404) {
              options.failure.call(options.context, httpRequest, httpRequest.status, httpRequest.responseText);
          }
          options.complete.call(options.context, httpRequest, httpRequest.status);
      }
  };

  httpRequest.open(options.method, url, true);
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.send(options.data);

}