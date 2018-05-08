'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var userFormElement = document.querySelector('.ad-form');
  var mainMapPinElement = document.querySelector('.map__pin--main');
  var filterFormElement = document.querySelector('.map__filters');

  var addDisableForm = function () {
    var fieldsets = userFormElement.querySelectorAll('fieldset');
    fieldsets.forEach(function (it) {
      it.setAttribute('disabled', 'disabled');
    });
  };
  addDisableForm();

  var removeDisableForm = function () {
    var fieldsets = userFormElement.querySelectorAll('fieldset');
    fieldsets.forEach(function (it) {
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
    var openedCardElement = mapElement.querySelector('.map__card');
    mapElement.classList.add('map--faded');
    userFormElement.classList.add('ad-form--disabled');
    if (openedCardElement) {
      openedCardElement.remove();
    }
    addDisableForm();
    removePins();
    userFormElement.reset();
    filterFormElement.reset();
    mainMapPinElement.addEventListener('mouseup', window.mainPinMouseUpHandler);
  };

  var selectInvalidInput = function (input) {
    input.classList.add('invalid-value-input');
  };

  var resetInvalidSelectedInput = function (input) {
    input.classList.remove('invalid-value-input');
  };

  var resetAllInvalidSelected = function () {
    var inputs = document.querySelectorAll('.invalid-value-input');
    inputs.forEach(function (it) {
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
