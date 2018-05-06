'use strict';
(function () {
  var MAIN_PIN_DEFAULT_X = 570;
  var MAIN_PIN_DEFAULT_Y = 375;
  var PINS_LIMIT = 5;

  var userForm = document.querySelector('.ad-form');
  var mainMapPin = document.querySelector('.map__pin--main');

  window.mainPinMouseUpHandler = function (evt) {
    window.activatePage(evt);
    var buttonElement = document.querySelectorAll('.map__pins');
    if (buttonElement.length < 2) {
      window.backend.load(loadHandler, window.errorHandler);
    }
    mainMapPin.removeEventListener('mouseup', window.mainPinMouseUpHandler);
  };

  mainMapPin.addEventListener('mouseup', window.mainPinMouseUpHandler);

  var buttonResetClickHandler = function () {
    window.util.resetPage();
  };

  userForm.addEventListener('reset', buttonResetClickHandler);

  var setDefaultValueForm = function () {
    mainMapPin.style.left = MAIN_PIN_DEFAULT_X + 'px';
    mainMapPin.style.top = MAIN_PIN_DEFAULT_Y + 'px';
  };

  var disablePageHandler = function () {
    setDefaultValueForm();
  };

  userForm.addEventListener('click', disablePageHandler);

  var loadHandler = function (pins) {
    window.pins = pins;
    var copyPins = pins.slice(0);
    var fragment = document.createDocumentFragment();
    var buttonElement = document.querySelector('.map__pins');

    copyPins.forEach(function (it, pin) {
      fragment.appendChild(window.renderMapPin(it, pin < PINS_LIMIT));
    });

    buttonElement.appendChild(fragment);
  };

})();
