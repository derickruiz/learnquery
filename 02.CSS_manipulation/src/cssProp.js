function cssProp(element, property, value) {
  'use strict';

  //code goes here
  function isObject(obj) {
      return Object.prototype.toString.call(obj) === "[object Object]"; /* ANKI */
  }

  function getCssPropertyValue(element, property) {
      return window.getComputedStyle(element, null).getPropertyValue(property); /* ANKI */
  }

  function setMultipleCssProperties(element, properties) {
      var prop;
      for (prop in properties) {
          if (properties.hasOwnProperty(prop)) {
              element.style[prop] = properties[prop];
          }
      }
  }

  function setSingleCssProperty(element, property, value) {
      element.style[property] = value;
  }

  if ( ! value && ! isObject(property)) {
      return getCssPropertyValue(element, property);
  } else if (isObject(property)) {
      setMultipleCssProperties(element, property);
  } else {
      setSingleCssProperty(element, property, value);
  }
}