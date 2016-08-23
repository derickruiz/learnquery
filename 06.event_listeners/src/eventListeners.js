var eventListener = (function() {
  'use strict';
  //code goes here

  var holder = {};

  function checkIfMethodExists(element, method) {

      var i;

      console.log("typeof holder[element.__DATA__]['methods']");
      console.log(typeof holder[element.__DATA__]["methods"]);

      if (typeof element.__DATA___ !== "undefined" || typeof holder[element.__DATA__]["methods"] !== "undefined") {

          for (i = 0; i < holder[element.__DATA__]["methods"].length; i += 1) {
              if (method === holder[element.__DATA__]["methods"][i]) {
                  return i;
              }
          }
      }

      return false;
  }

  function addEventListenerList(element, eventType, method) {

      function generateGuid() {
          function s4() {
              return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }

      if ( ! element.__DATA__) {
          element.__DATA__ = generateGuid(); // assign a unique id to this element to refer to by later.
          // assign this to the holder which we'll use later on for calling functions twice, removing them all, triggering them, etc.
          holder[element.__DATA__] = {};

          /* console.log("What's the element?", element);
          console.log("What's the element data?", element.__DATA__); */
      }

      if ( ! holder[element.__DATA__]["methods"]) {
          holder[element.__DATA__]["methods"] = [];
      }

      // If the method does exist, then just add a reference and also add an event listener using the reference that already exists.
      var indexOfMethodPossiblyAdded = checkIfMethodExists(element, method);

      if (indexOfMethodPossiblyAdded !== false) {
          holder[element.__DATA__][eventType] = indexOfMethodPossiblyAdded;
          element.addEventListener(eventType, holder[element.__DATA__]["methods"][indexOfMethodPossiblyAdded]);
      } else {
          // Method doesn't exist, will need to add it to the methods array.
          var newMethodIndex = holder[element.__DATA__]["methods"].push(method) - 1;
          holder[element.__DATA__][eventType] = newMethodIndex;
          element.addEventListener(eventType, holder[element.__DATA__]["methods"][newMethodIndex]);
      }

  }

  function addEventListenerTwice(element, eventType, method) {
      element["on" + eventType.toLowerCase()] = method;
  }

  function hasEventListener(element, eventType, method) {

      /* console.log("typeof element.__DATA__");
      console.log(typeof element.__DATA__);
      console.log("typeof holder[element.__DATA__]");
      console.log(typeof holder[element.__DATA__]);
      console.log("typeof holder[element.__DATA__][eventType]");
      console.log(typeof holder[element.__DATA__][eventType]); */

      console.log("holder[element.__DATA__]");
      console.log(holder[element.__DATA__]);

      if (typeof element.__DATA__ !== "undefined" && typeof holder[element.__DATA__] !== "undefined" && holder[element.__DATA__][eventType] >= 0) {
          return true;
      }

      return false;

  }

  function removeSingleEvent(element, eventType, method) {

      var i;

      if ( ! element.__DATA__ || ! holder[element.__DATA__]["methods"]) {
          return;
      }

      var methodToRemove = holder[element.__DATA__][eventType];

      element.removeEventListener(eventType, holder[element.__DATA__]["methods"][methodToRemove]);
      element["on" + eventType.toLowerCase()] = null;

  }

  function removeAllEventsOfType(element, eventType) {

      var i;

      if ( ! element.__DATA__ || ! holder[element.__DATA__] || ! holder[element.__DATA__][eventType]) {
          return;
      }

      for (i = 0; i < holder[element.__DATA__][eventType].length; i += 1) {
          console.log("holder[element.__DATA__][eventType][i]", holder[element.__DATA__][eventType][i]);
          element.removeEventListener(eventType, holder[element.__DATA__][eventType][i]);
      }

      console.log("holder", holder);
      console.log(holder[element.__DATA__][eventType]);
      delete holder[element.__DATA__][eventType];
      console.log(holder[element.__DATA__][eventType]);
      console.log("holder", holder);
  }

  function removeAllEvents(element) {

      var prop;

      if ( ! element.__DATA__ || ! holder[element.__DATA__]) {
          return;
      }

      for (prop in holder[element.__DATA__]) {
          if (holder[element.__DATA__].hasOwnProperty(prop)) {
              removeAllEventsOfType(element, prop);
          }
      }
  }

  function on(element, eventType, method) {

      if ( ! hasEventListener(element, eventType, method)) {
          addEventListenerList(element, eventType, method);
      } else {
          addEventListenerTwice(element, eventType, method);
      }
  }

  function off(element, eventType, method) {

      debugger;
      
     if (typeof element !== "undefined" && typeof eventType !== "undefined" && typeof method !== "undefined") {
         removeSingleEvent(element, eventType, method);
         return;
      } else if (typeof element !== "undefined" && typeof eventType !== "undefined" && typeof method === "undefined") {

          removeAllEventsOfType(element, eventType);
          return;
      } else if (typeof element !== "undefined" && typeof eventType === "undefined" && typeof method === "undefined"){
          removeAllEvents(element);
          return;
      }
  }

  return {
      on: on,
      off: off
  };
})();