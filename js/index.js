'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var userFormElement = document.querySelector('.ad-form');

  window.activatePage = function () {
    mapElement.classList.remove('map--faded');
    userFormElement.classList.remove('ad-form--disabled');
    window.util.removeDisableForm();
    window.roomsInputChangeHandler();
    window.setAddressValue();
  };
})();
