'use strict';
(function () {
  var MAIN_PIN_DEFAULT_X = 570;
  var MAIN_PIN_DEFAULT_Y = 375;

  var map = document.querySelector('.map');
  var userForm = document.querySelector('.ad-form');
  var mainMapPin = document.querySelector('.map__pin--main');

  window.mainPinMouseUpHandler = function (evt) {
    activatePage(evt);
    var buttonElement = document.querySelectorAll('.map__pins');
    if (buttonElement.length < 2) {
      window.backend.load(loadHanler, errorHandler);
    }
    mainMapPin.removeEventListener('mouseup', window.mainPinMouseUpHandler);
  };

  mainMapPin.addEventListener('mouseup', window.mainPinMouseUpHandler);

  var activatePage = function () {
    map.classList.remove('map--faded');
    userForm.classList.remove('ad-form--disabled');
    window.util.removeDisableForm();
    window.roomsInputChangeHandler();
    window.setAddressValue();
  };

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

  var errorHandler = function (errorMessage) {
    var divElement = document.createElement('div');
    divElement.style = 'z-index: 100; margin: 0 auto; color: #fff; text-align: center; background-color: red;';
    divElement.style.position = 'absolute';
    divElement.style.left = 0;
    divElement.style.right = 0;
    divElement.style.fontSize = '30px';
    divElement.classList.add('error');
    divElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', divElement);
  };

})();
