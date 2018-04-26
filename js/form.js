'use strict';

(function () {
  var roomsAndCapatokyoMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var userForm = document.querySelector('.ad-form');
  var apartamentInputElement = userForm.querySelector('select[name="type"]');
  var priceInputElement = userForm.querySelector('input[name="price"]');
  apartamentInputElement.addEventListener('change', function () {
    var minPrice = roomsAndCapatokyoMap[apartamentInputElement.value];
    priceInputElement.min = minPrice;
    priceInputElement.placeholder = minPrice;
  });

  var checkInInputElement = userForm.querySelector('select[name="timein"]');
  var checkOutInputElement = userForm.querySelector('select[name="timeout"]');
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

  var roomsInputElement = userForm.querySelector('select[name="rooms"]');

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

  var successMessage = document.querySelector('.success');
  userForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(userForm), function () {
      successMessage.classList.remove('hidden');
    });
    evt.preventDefault();
  });
  var successMessageRemove = function () {
    if (successMessage) {
      successMessage.classList.add('hidden');
    }
  };
  document.addEventListener('keydown', successMessageRemove);
})();
