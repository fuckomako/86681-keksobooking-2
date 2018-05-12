'use strict';

(function () {
  var TIME_CLOSE_POPUP = 4000;
  var ONE_ROOM = '1';
  var TWO_ROOMS = '2';
  var THREE_ROOMS = '3';
  var ONE_HUNDRED_ROOMS = '100';
  var ONE_GUEST_INDEX = '0';
  var ONE_GUEST = '1';
  var TWO_GUESTS = '2';
  var THREE_GUESTS = '3';

  var roomsType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var mainMapPinElement = document.querySelector('.map__pin--main');
  var userFormElement = document.querySelector('.ad-form');
  var inputElements = userFormElement.querySelectorAll('input');
  var apartamentInputElement = userFormElement.querySelector('select[name="type"]');
  var priceInputElement = userFormElement.querySelector('input[name="price"]');
  var checkInInputElement = userFormElement.querySelector('select[name="timein"]');
  var checkOutInputElement = userFormElement.querySelector('select[name="timeout"]');
  var roomsInputElement = userFormElement.querySelector('select[name="rooms"]');
  var successMessageElement = document.querySelector('.success');

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
    var capacitySelectElement = userFormElement.querySelector('select[name="capacity"]');
    var capacityOptionOptions = capacitySelectElement.querySelectorAll('option');
    var roomsInputValue = roomsInputElement.value;

    switch (roomsInputValue) {
      case ONE_ROOM:
        setDisabledValue(capacityOptionOptions, [ONE_GUEST_INDEX, TWO_GUESTS, THREE_GUESTS]);
        capacityOptionOptions[ONE_GUEST_INDEX].selected = true;
        break;
      case TWO_ROOMS:
        setDisabledValue(capacityOptionOptions, [ONE_GUEST_INDEX, THREE_GUESTS]);
        capacityOptionOptions[ONE_GUEST].selected = true;
        break;
      case THREE_ROOMS:
        setDisabledValue(capacityOptionOptions, [ONE_GUEST_INDEX]);
        capacityOptionOptions[TWO_GUESTS].selected = true;
        break;
      case ONE_HUNDRED_ROOMS:
        setDisabledValue(capacityOptionOptions, [ONE_GUEST, TWO_GUESTS, THREE_GUESTS]);
        capacityOptionOptions[THREE_GUESTS].selected = true;
        break;
    }
  };

  window.roomsInputChangeHandler = function () {
    calculateRoomsAndCapacity();
  };

  roomsInputElement.addEventListener('change', window.roomsInputChangeHandler);

  var checkDisabledOptions = function () {
    var selectElements = userFormElement.querySelectorAll('select');
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
    mainMapPinElement.addEventListener('mouseup', window.map.mainPinMouseUpHandler);
    successMessageElement.classList.remove('hidden');
    window.util.resetPage();
    setTimeout(function () {
      successMessageElement.classList.add('hidden');
    }, TIME_CLOSE_POPUP);
  };

  userFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(userFormElement), successHandler, window.error.errorHandler);
    evt.preventDefault();
  });

})();
