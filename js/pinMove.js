'use strict';

(function () {
  var MAIN_PIN_WIDTH = 32;
  var MAIN_PIN_HEIGHT = 84;
  var LIMIT_TOP_Y = 150;
  var LIMIT_BOTTOM_Y = 500;
  var LIMIT_LEFT_X = 0;
  var LIMIT_RIGHT_X = 1200;

  var mainMapPinElement = document.querySelector('.map__pin--main');
  var fieldElement = document.querySelector('#address');

  window.setAddressValue = function () {
    fieldElement.value = getPinLocation(mainMapPinElement.style.left, MAIN_PIN_WIDTH) + ', ' + getPinLocation(mainMapPinElement.style.top, MAIN_PIN_HEIGHT);
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

      mainMapPinElement.style.left = (mainMapPinElement.offsetLeft - shift.x) + 'px';
      mainMapPinElement.style.top = (mainMapPinElement.offsetTop - shift.y) + 'px';

      window.setAddressValue();

      var mainMapPinElementLeftCoord = parseInt(mainMapPinElement.style.left.split('px')[0], 10);
      var mainMapPinElementTopCoord = parseInt(mainMapPinElement.style.top.split('px')[0], 10);

      if (mainMapPinElementTopCoord < LIMIT_TOP_Y - MAIN_PIN_HEIGHT) {
        mainMapPinElement.style.top = LIMIT_TOP_Y - MAIN_PIN_HEIGHT + 'px';
      }

      if (mainMapPinElementTopCoord > LIMIT_BOTTOM_Y - MAIN_PIN_HEIGHT) {
        mainMapPinElement.style.top = LIMIT_BOTTOM_Y - MAIN_PIN_HEIGHT + 'px';
      }

      if (mainMapPinElementLeftCoord < LIMIT_LEFT_X - MAIN_PIN_WIDTH) {
        mainMapPinElement.style.left = LIMIT_LEFT_X - MAIN_PIN_WIDTH + 'px';
      }

      if (mainMapPinElementLeftCoord > LIMIT_RIGHT_X - MAIN_PIN_WIDTH) {
        mainMapPinElement.style.left = LIMIT_RIGHT_X - MAIN_PIN_WIDTH + 'px';
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

  mainMapPinElement.addEventListener('mousedown', pinDragHandler);
})();
