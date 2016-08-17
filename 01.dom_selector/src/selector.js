var domSelector = function(selectors) {
  'use strict';

  //code goes here
  var regex = /^[0-9a-zA-Z]\w+$/;
  var firstCharacter = selectors.charAt(0); // ANKI
  var stringWithoutClassifier = selectors.substring(1); // ANKI
  var elements;

  if (firstCharacter === "#") {
      elements = [document.getElementById(stringWithoutClassifier)];
  } else if (firstCharacter === ".") {
      elements = document.getElementsByClassName(stringWithoutClassifier);
  } else {
      if (selectors.match(regex) /* ANKI */ ) {
          elements = document.getElementsByTagName(selectors);
      } else {
          throw new Error();
      }
  }

  if ( ! elements || elements.length === 0) {
      return [];
  } else {
      return [].slice.call(elements);
  }
};

for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
        // Do shit here.
    }
}