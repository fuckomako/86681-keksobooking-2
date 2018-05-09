'use strict';
(function () {
  var MAIN_PIN_DEFAULT_X = 570;
  var MAIN_PIN_DEFAULT_Y = 375;
  var PINS_LIMIT = 5;
  var PINS_CONDITIONS = 2;
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';

  var userFormElement = document.querySelector('.ad-form');
  var mainMapPinElement = document.querySelector('.map__pin--main');

  window.map = {
    mainPinMouseUpHandler: function () {
      window.activatePage();
      var buttons = document.querySelectorAll('.map__pins');
      if (buttons.length < PINS_CONDITIONS) {
        window.backend.getData(DATA_URL, 'GET', null, loadHandler, window.error.errorHandler);
      }
      mainMapPinElement.removeEventListener('mousedown', window.map.mainPinMouseUpHandler);
    }
  };

  mainMapPinElement.addEventListener('mousedown', window.map.mainPinMouseUpHandler);

  var buttonResetClickHandler = function () {
    window.util.resetPage();
  };

  userFormElement.addEventListener('reset', buttonResetClickHandler);

  var setDefaultValueForm = function () {
    mainMapPinElement.style.left = MAIN_PIN_DEFAULT_X + 'px';
    mainMapPinElement.style.top = MAIN_PIN_DEFAULT_Y + 'px';
  };

  var disablePageHandler = function () {
    setDefaultValueForm();
  };

  userFormElement.addEventListener('click', disablePageHandler);

  var loadHandler = function (pins) {
    window.pins = pins;
    var copyPinsElement = pins.slice();
    var fragmentElement = document.createDocumentFragment();
    var buttons = document.querySelector('.map__pins');

    copyPinsElement.forEach(function (it, pin) {
      fragmentElement.appendChild(window.renderMapPin(it, pin < PINS_LIMIT));
    });

    buttons.appendChild(fragmentElement);
  };

})();
