'use strict';
(function () {
  var MAIN_PIN_DEFAULT_X = 570;
  var MAIN_PIN_DEFAULT_Y = 375;

  var userForm = document.querySelector('.ad-form');
  var mainMapPin = document.querySelector('.map__pin--main');

  window.mainPinMouseUpHandler = function (evt) {
    window.activatePage(evt);
    var buttonElement = document.querySelectorAll('.map__pins');
    if (buttonElement.length < 2) {
      window.backend.load(loadHanler, window.errorHandler);
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

  var loadHanler = function (pins) {
    window.pins = pins;
    var fragment = document.createDocumentFragment();
    var buttonElement = document.querySelector('.map__pins');

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.renderMapPin(pins[i], i < 5));
    }
    buttonElement.appendChild(fragment);
  };

})();
