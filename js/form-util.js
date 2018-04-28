'use strict';

(function () {
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
    for (var i = 0; i < invalidInputs.length; i++) {
      resetInvalidSelectedInput(invalidInputs[i]);
    }
  };

  window.util = {
    removeDisableForm: removeDisableForm,
    resetPage: resetPage,
    selectInvalidInput: selectInvalidInput,
    resetInvalidSelectedInput: resetInvalidSelectedInput,
    resetAllInvalidSelected: resetAllInvalidSelected
  };
})();
