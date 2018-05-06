'use strict';

(function () {
  var map = document.querySelector('.map');
  var userForm = document.querySelector('.ad-form');
  var mainMapPin = document.querySelector('.map__pin--main');

  var addDisableForm = function () {
    var fieldsetDisable = userForm.querySelectorAll('fieldset');
    fieldsetDisable.forEach(function (it) {
      it.setAttribute('disabled', 'disabled');
    });
  };
  addDisableForm();

  var removeDisableForm = function () {
    var fieldsetEnable = userForm.querySelectorAll('fieldset');
    fieldsetEnable.forEach(function (it) {
      it.removeAttribute('disabled');
    });
  };

  var removePins = function () {
    var buttons = window.mapListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    buttons.forEach(function (it) {
      window.mapListElement.removeChild(it);
    });
  };

  var resetPage = function () {
    map.classList.add('map--faded');
    userForm.classList.add('ad-form--disabled');
    addDisableForm();
    removePins();
    window.card.closeCard();
    mainMapPin.addEventListener('mouseup', window.mainPinMouseUpHandler);
  };

  var selectInvalidInput = function (input) {
    input.classList.add('invalid-value-input');
  };

  var resetInvalidSelectedInput = function (input) {
    input.classList.remove('invalid-value-input');
  };

  var resetAllInvalidSelected = function () {
    var invalidInputs = document.querySelectorAll('.invalid-value-input');
    invalidInputs.forEach(function (it) {
      resetInvalidSelectedInput(it);
    });
  };

  window.util = {
    removeDisableForm: removeDisableForm,
    resetPage: resetPage,
    selectInvalidInput: selectInvalidInput,
    resetInvalidSelectedInput: resetInvalidSelectedInput,
    resetAllInvalidSelected: resetAllInvalidSelected
  };
})();
