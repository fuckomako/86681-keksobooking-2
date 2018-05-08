'use strict';

(function () {
  var TIME_MESSAGE = 10000;

  var templateElement = document.querySelector('template');
  var errorTemplateElement = templateElement.content.querySelector('.error').cloneNode(true);

  window.error = {
    errorHandler: function (errorTitle, errorText) {

      errorTemplateElement.querySelector('.error__title').textContent = errorTitle;
      errorTemplateElement.querySelector('.error__message').textContent = errorText;

      document.body.insertAdjacentElement('afterbegin', errorTemplateElement);

      var errorPopupElement = document.querySelector('.error');
      var removeErrorPopup = function () {
        errorPopupElement.remove();
      };
      setTimeout(removeErrorPopup, TIME_MESSAGE);
    }
  };
})();
