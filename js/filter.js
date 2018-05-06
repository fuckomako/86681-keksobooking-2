'use strict';

(function () {
  var MAX_PRICE = 10000;
  var MIN_PRICE = 50000;

  var formFilters = document.querySelector('.map__filters');
  var housingPrice = document.querySelector('#housing-price');
  var housingType = document.querySelector('#housing-type');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = formFilters.querySelectorAll('input[name=features]');

  var acceptFilter = function () {
    window.debounce(function () {
      var filteredItems = window.pins.filter(function (pin) {
        return filterPrice(pin) && filterRooms(pin) && filterGuests(pin) && filterType(pin) && filterFeatures(pin);
      }).slice(0, 5);
      window.pins.forEach(function (it) {
        it.mapPin.style.display = filteredItems.indexOf(it) >= 0 ? 'block' : 'none';
      });
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.style.display = 'none';
      }
    });
  };

  var filterPrice = function (pin) {
    switch (housingPrice.value) {
      case 'low':
        return pin.offer.price < MAX_PRICE;
      case 'middle':
        return pin.offer.price >= MAX_PRICE && pin.offer.price < MIN_PRICE;
      case 'high':
        return pin.offer.price >= MIN_PRICE;
      default:
        return true;
    }
  };

  var filterType = function (pin) {
    if (housingType.value === 'any') {
      return true;
    } else {
      return pin.offer.type === housingType.value; // Не окргуляем в поле stirng
    }
  };

  var filterRooms = function (pin) {
    if (housingRooms.value === 'any') {
      return true;
    } else {
      return pin.offer.rooms === Math.floor(housingRooms.value);
    }
  };

  var filterGuests = function (pin) {
    if (housingGuests.value === 'any') {
      return true;
    } else {
      return pin.offer.guests === Math.floor(housingGuests.value);
    }
  };

  var filterFeatures = function (pin) {
    var mapFeatures = formFilters.querySelectorAll('input:checked');

    return Array.prototype.every.call(mapFeatures, function (it) {
      return pin.offer.features.indexOf(it.value) !== -1;
    });
  };

  housingPrice.addEventListener('change', acceptFilter);
  housingType.addEventListener('change', acceptFilter);
  housingRooms.addEventListener('change', acceptFilter);
  housingGuests.addEventListener('change', acceptFilter);

  housingFeatures.forEach(function (it) {
    it.addEventListener('change', acceptFilter);
  });

}());
