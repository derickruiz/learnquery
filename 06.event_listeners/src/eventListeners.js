var eventListener = (function() {
  'use strict';
  //code goes here

  var holder = {};

  function guid() {
      function s4() {
          return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  function on(element, event, method) {
      // assign a unique id to the element
      var guid;

      if ( ! element["__UNIQUE__ID__"]) {
          guid = guid();
          element["__UNIQUE__ID__"] = guid;
      } else {
          guid = element["__UNIQUE__ID__"];
      }

      console.log("This element's unique identifier");
      console.log(element["__UNIQUE__ID__"]);

      if ( ! holder[guid]) {
          holder[guid] = {};
          holder[guid][method.toString()] = method;
      }

      element.addEventListener(event, function () {
          Object.keys(holder[guid]).forEach(function (func) {
              console.log("What's func?", func);
          });
      });
  }

  function off(element, event, method) {
      element.removeEventListener(event, method);
  }

  return {
      on: on,
      off: off
  };
})();