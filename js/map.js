'use strict';
(function () {
  var MAIN_PIN_WIDTH = 32;
  var MAIN_PIN_HEIGHT = 84;
  var LIMIT_TOP_Y = 150;
  var LIMIT_BOTTOM_Y = 500;
  var LIMIT_LEFT_X = 0;
  var LIMIT_RIGHT_X = 1200;
  var MAIN_PIN_DEFAULT_X = 570;
  var MAIN_PIN_DEFAULT_Y = 375;
  var NUMBER_OF_PINS = 8;

  window.offers = window.addPins(NUMBER_OF_PINS);

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
  };

  mainMapPin.addEventListener('mouseup', mainPinMouseUpHandler);

  var activatePage = function () {
    map.classList.remove('map--faded');
    userForm.classList.remove('ad-form--disabled');
    removeDisableForm();
    window.renderInit();
    window.roomsInputChangeHandler();
    setAddressValue();
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


  var field = document.querySelector('#address');
  var setAddressValue = function () {
    field.value = getPinLocation(mainMapPin.style.left, MAIN_PIN_WIDTH) + ', ' + getPinLocation(mainMapPin.style.top, MAIN_PIN_HEIGHT);
  };

  var getPinLocation = function (pos, gap) {
    return Math.round(parseInt(pos.split('px', 1), 10)) + Math.round(gap);
  };

  var pinDragHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';
      mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + 'px';

      setAddressValue();

      var mainMapPinLeftCoord = parseInt(mainMapPin.style.left.split('px')[0], 10);
      var mainMapPinTopCoord = parseInt(mainMapPin.style.top.split('px')[0], 10);

      if (mainMapPinTopCoord < LIMIT_TOP_Y - MAIN_PIN_HEIGHT) {
        mainMapPin.style.top = LIMIT_TOP_Y - MAIN_PIN_HEIGHT + 'px';
      }

      if (mainMapPinTopCoord > LIMIT_BOTTOM_Y - MAIN_PIN_HEIGHT) {
        mainMapPin.style.top = LIMIT_BOTTOM_Y - MAIN_PIN_HEIGHT + 'px';
      }

      if (mainMapPinLeftCoord < LIMIT_LEFT_X - MAIN_PIN_WIDTH) {
        mainMapPin.style.left = LIMIT_LEFT_X - MAIN_PIN_WIDTH + 'px';
      }

      if (mainMapPinLeftCoord > LIMIT_RIGHT_X - MAIN_PIN_WIDTH) {
        mainMapPin.style.left = LIMIT_RIGHT_X - MAIN_PIN_WIDTH + 'px';
      }

    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  };

  mainMapPin.addEventListener('mouseup', pinDragHandler);
  mainMapPin.addEventListener('mousedown', pinDragHandler);

  var setDefaultValueForm = function () {
    mainMapPin.style.left = MAIN_PIN_DEFAULT_X + 'px';
    mainMapPin.style.top = MAIN_PIN_DEFAULT_Y + 'px';
  };

  var disablePageHandler = function () {
    setDefaultValueForm();
  };

  userForm.addEventListener('click', disablePageHandler);

})();
