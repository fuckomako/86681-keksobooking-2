'use strict';
(function () {
  var MAIN_PIN_DEFAULT_X = 570;
  var MAIN_PIN_DEFAULT_Y = 375;

  var map = document.querySelector('.map');
  var userForm = document.querySelector('.ad-form');
  var mainMapPin = document.querySelector('.map__pin--main');

  var addDisableForm = function () {
    var fieldsetDisable = userForm.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsetDisable.length; i++) {
      fieldsetDisable[i].setAttribute('disabled', 'disabled');
    }
  };
  addDisableForm();

  var removeDisableForm = function () {
    var fieldsetEnable = userForm.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsetEnable.length; i++) {
      fieldsetEnable[i].removeAttribute('disabled');
    }
  };

  var mainPinMouseUpHandler = function (evt) {
    activatePage(evt);
    window.backend.load(loadHanler, errorHandler);
  };

  mainMapPin.addEventListener('mouseup', mainPinMouseUpHandler);

  var activatePage = function () {
    map.classList.remove('map--faded');
    userForm.classList.remove('ad-form--disabled');
    removeDisableForm();
    window.roomsInputChangeHandler();
    window.setAddressValue();
  };

  var deletePins = function () {
    var buttons = window.mapListElement.querySelectorAll('button');
    for (var i = 1; i < buttons.length; i++) {
      window.mapListElement.removeChild(buttons[i]);
    }
  };

  var resetPage = function () {
    map.classList.add('map--faded');
    userForm.classList.add('ad-form--disabled');
    addDisableForm();
    deletePins();
  };

  var buttonResetClickHandler = function () {
    resetPage();
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
    var fragment = document.createDocumentFragment();
    var buttonElement = document.querySelector('.map__pins');

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.renderMapPin(pins[i]));
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
