'use strict';

(function () {
  var map = document.querySelector('.map');
  var userForm = document.querySelector('.ad-form');

  window.activatePage = function () {
    map.classList.remove('map--faded');
    userForm.classList.remove('ad-form--disabled');
    window.util.removeDisableForm();
    window.roomsInputChangeHandler();
    window.setAddressValue();
  };
})();
