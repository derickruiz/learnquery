var eventListener = (function() {
  'use strict';
  //code goes here

  var holder = {};

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

      if ( ! holder[element.__DATA__][eventType]) {
          holder[element.__DATA__][eventType] = [];
      }

      holder[element.__DATA__][eventType].push(method);

      console.log("holder");
      console.log(holder);

      element.addEventListener(eventType, method);
  }

  function addEventListenerTwice(element, eventType, method) {
      element["on" + eventType.toLowerCase()] = method;
  }

  function hasEventListener(element, eventType, method) {

      /* debugger; */

      var i;

      if ( ! element.__DATA__ || ! holder[element.__DATA__] || ! holder[element.__DATA__][eventType]) {
          return false;
      }

      for (i = 0; i < holder[element.__DATA__][eventType].length; i += 1) {
          if (holder[element.__DATA__][eventType][i] === method) {
              return true;
          }
      }

      return false;
  }

  function removeSingleEvent(element, eventType, method) {

      var i;

      if ( ! element.__DATA__ || ! holder[element.__DATA__][eventType]) {
          return;
      }

      for (i = 0; i < holder[element.__DATA__][eventType].length; i += 1) {
          if (holder[element.__DATA__][eventType][i] === method) {
              console.log("Yep, the method is the same");
              console.log("holder[element.__DATA__][eventType] - before splice", holder[element.__DATA__][eventType]);
              holder[element.__DATA__][eventType].splice(i, 1);
              console.log("holder[element.__DATA__][eventType] - after splice", holder[element.__DATA__][eventType]);
              i -=1;
          }
      }

      element.removeEventListener(eventType, method);
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
      /* debugger; */
      element.addEventListener(eventType, method);

      /* if ( ! hasEventListener(element, eventType, method)) {
          addEventListenerList(element, eventType, method);
      } else {
          addEventListenerTwice(element, eventType, method);
      } */
  }

  function off(element, eventType, method) {

     if (typeof element !== "undefined" && typeof eventType !== "undefined" && typeof method !== "undefined") {
         /* debugger; */
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