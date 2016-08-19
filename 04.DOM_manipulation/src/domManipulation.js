var dom = (function(){
  // code goes here

  function remove(element) {
      if (document.body.contains(element)) { /* ANKI */
          element.parentNode.removeChild(element); /* ANKI */
      }
  }

  function append(targetElement, element) {
      targetElement.appendChild(element); /* ANKI */
  }

  function prepend(targetElement, element) {
      if (targetElement.hasChildNodes()) { /* ANKI */
          targetElement.insertBefore(element, targetElement.firstChild);
      } else {
          targetElement.addChild(element);
      }
  }

  function after(targetElement, element) {

      if (document.body.contains(targetElement)) {
          if ( ! targetElement.nextSibling) { // It's the last element
              targetElement.parentNode.appendChild(element);
          } else {
              targetElement.parentNode.insertBefore(element, targetElement.nextSibling);
          }
      }
  }

  function before(targetElement, element) {
      targetElement.parentNode.insertBefore(element, targetElement); /* ANKI */
  }

  function val(targetElement) {
      return targetElement.value;
  }

  return {
      remove: remove,
      append: append,
      prepend: prepend,
      after: after,
      before: before,
      val: val
  };
}());