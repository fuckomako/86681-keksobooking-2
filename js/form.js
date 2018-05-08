'use strict';

(function () {
  var TIME_CLOSE_POPUP = 4000;

  var roomsType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var mainMapPin = document.querySelector('.map__pin--main');
  var userForm = document.querySelector('.ad-form');
  var inputElements = userForm.querySelectorAll('input');
  var apartamentInputElement = userForm.querySelector('select[name="type"]');
  var priceInputElement = userForm.querySelector('input[name="price"]');
  var checkInInputElement = userForm.querySelector('select[name="timein"]');
  var checkOutInputElement = userForm.querySelector('select[name="timeout"]');
  var roomsInputElement = userForm.querySelector('select[name="rooms"]');
  var successMessage = document.querySelector('.success');

  apartamentInputElement.addEventListener('change', function () {
    var minPrice = roomsType[apartamentInputElement.value];
    priceInputElement.min = minPrice;
    priceInputElement.placeholder = minPrice;
  });

  checkInInputElement.addEventListener('change', function () {
    checkOutInputElement.selectedIndex = checkInInputElement.selectedIndex;
  });
  checkOutInputElement.addEventListener('change', function () {
    checkInInputElement.selectedIndex = checkOutInputElement.selectedIndex;
  });

  var setDisabledValue = function (elements, values) {
    elements.forEach(function (it) {
      it.disabled = false;
      if (values.indexOf(it.value) > -1) {
        it.disabled = true;
      }
    });
  };

  var calculateRoomsAndCapacity = function () {
    var capacityInputSelect = userForm.querySelector('select[name="capacity"]');
    var capacityOptionOptions = capacityInputSelect.querySelectorAll('option');
    var roomsInputValue = roomsInputElement.value;

    switch (roomsInputValue) {
      case '1':
        setDisabledValue(capacityOptionOptions, ['0', '2', '3']);
        capacityOptionOptions[0].selected = true;
        break;
      case '2':
        setDisabledValue(capacityOptionOptions, ['0', '3']);
        capacityOptionOptions[1].selected = true;
        break;
      case '3':
        setDisabledValue(capacityOptionOptions, ['0']);
        capacityOptionOptions[2].selected = true;
        break;
      case '100':
        setDisabledValue(capacityOptionOptions, ['1', '2', '3']);
        capacityOptionOptions[3].selected = true;
        break;
    }
  };

  window.roomsInputChangeHandler = function () {
    calculateRoomsAndCapacity();
  };

  roomsInputElement.addEventListener('change', window.roomsInputChangeHandler);

  var checkDisabledOptions = function () {
    var selectElements = userForm.querySelectorAll('select');
    var isValid = true;

    selectElements.forEach(function (it) {
      var selectedOptionElement = it.selectedOptions[0];
      window.util.resetInvalidSelectedInput(it);
      if (selectedOptionElement.disabled) {
        isValid = false;
        window.util.selectInvalidInput(it);
      }
    });

    return isValid;
  };

  inputElements.forEach(function (it) {
    it.addEventListener('invalid', function (evt) {
      window.util.selectInvalidInput(evt.target);
    });
  });

  var successHandler = function () {
    inputElements.forEach(function (it) {
      window.util.resetInvalidSelectedInput(it);
      checkDisabledOptions();
    });
    mainMapPin.addEventListener('mouseup', window.mainPinMouseUpHandler);
    successMessage.classList.remove('hidden');
    window.util.resetPage();
    setTimeout(function () {
      successMessage.classList.add('hidden');
    }, TIME_CLOSE_POPUP);
  };

  userForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(userForm), successHandler, window.error.errorHandler);
    evt.preventDefault();
  });

})();
