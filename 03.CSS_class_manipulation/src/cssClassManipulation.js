var cssClass = (function() {
  'use strict';

  // code goes here

  function add(element, classToAdd) {
      var currentClassString = element.getAttribute('class'),
          newClassString = "";

      if ( ! currentClassString) {
          element.setAttribute('class', classToAdd);
      } else {
          element.setAttribute('class', currentClassString + " " + classToAdd);
      }
  }

  function remove(element, classToRemove) {
      var currentClassString = element.getAttribute('class'),
          newClassString = "";
      if ( ! currentClassString || ! currentClassString.includes(classToRemove)) { /* ANKI */
          return;
      } else {
          newClassString = currentClassString.split(classToRemove).join(" ").replace(/ +/g, " "); /* ANKI */
          element.setAttribute('class', newClassString);
      }
  }

  function has(element, classToCheck) {
      var currentClassString = element.getAttribute('class');
      return currentClassString ? currentClassString.includes(classToCheck) : false;
  }

  function toggle(element, classToToggle) {
      var currentClassString = element.getAttribute('class');
      if (has(element, classToToggle)) {
          remove(element, classToToggle);
      } else {
          add(element, classToToggle);
      }
  }

  return {
      add: add,
      remove: remove,
      toggle: toggle,
      has: has
  };
})();