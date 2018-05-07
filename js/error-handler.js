'use strict';

(function () {
  var TIME = 15000;

  var template = document.querySelector('template');
  var errorTemplate = template.content.querySelector('.error').cloneNode(true);

  window.error = {
    errorHandler: function (errorTitle, errorText) {

      errorTemplate.querySelector('.error__title').textContent = errorTitle;
      errorTemplate.querySelector('.error__message').textContent = errorText;

      document.body.insertAdjacentElement('afterbegin', errorTemplate);

      var errorPopup = document.querySelector('.error');
      var removeErrorPopup = function () {
        errorPopup.remove();
      };
      setTimeout(removeErrorPopup, TIME);
    }
  };
})();
