'use strict';
(function () {
  var MAIN_PIN_DEFAULT_X = 570;
  var MAIN_PIN_DEFAULT_Y = 375;
  var PINS_LIMIT = 5;

  var userForm = document.querySelector('.ad-form');
  var mainMapPin = document.querySelector('.map__pin--main');

  window.mainPinMouseUpHandler = function () {
    window.activatePage();
    var buttons = document.querySelectorAll('.map__pins');
    if (buttons.length < 2) {
      window.backend.load(loadHandler, window.error.errorHandler);
    }
    mainMapPin.removeEventListener('mousedown', window.mainPinMouseUpHandler);
  };

  mainMapPin.addEventListener('mousedown', window.mainPinMouseUpHandler);

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
    var copyPins = pins.slice();
    var fragment = document.createDocumentFragment();
    var buttons = document.querySelector('.map__pins');

    copyPins.forEach(function (it, pin) {
      fragment.appendChild(window.renderMapPin(it, pin < PINS_LIMIT));
    });

    buttons.appendChild(fragment);
  };

})();
