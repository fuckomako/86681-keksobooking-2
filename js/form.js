'use strict';

(function () {
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
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = false;
      if (values.indexOf(elements[i].value) > -1) {
        elements[i].disabled = true;
      }
    }
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

    for (var i = 0; i < selectElements.length; i++) {
      var selectedOptionElement = selectElements[i].selectedOptions[0];
      window.util.resetInvalidSelectedInput(selectElements[i]);

      if (selectedOptionElement.disabled) {
        isValid = false;
        window.util.selectInvalidInput(selectElements[i]);
      }
    }

    return isValid;
  };

  for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener('invalid', function (evt) {
      window.util.selectInvalidInput(evt.target);
    });
  }

  userForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(userForm), function () {
      for (var k = 0; k < inputElements.length; k++) {
        window.util.resetInvalidSelectedInput(inputElements[k]);
        checkDisabledOptions();
      }
      mainMapPin.addEventListener('mouseup', window.mainPinMouseUpHandler);
      successMessage.classList.remove('hidden');
      window.util.resetPage();
      userForm.reset();
    });
    evt.preventDefault();
    document.addEventListener('keydown', successMessageRemove);
  });
  var successMessageRemove = function () {
    if (successMessage) {
      successMessage.classList.add('hidden');
    }
  };
  document.removeEventListener('keydown', successMessageRemove);
})();
