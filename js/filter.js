'use strict';

(function () {
  var MAX_PRICE = 10000;
  var MIN_PRICE = 50000;
  var MAX_PINS = 5;
  var PRICE_LOW = 'low';
  var PRICE_MIDDLE = 'middle';
  var PRICE_HIGH = 'high';

  var formFiltersElement = document.querySelector('.map__filters');
  var housingPriceElement = document.querySelector('#housing-price');
  var housingTypeElement = document.querySelector('#housing-type');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var housingFeaturesElement = formFiltersElement.querySelectorAll('input[name=features]');

  var acceptFilterHandler = function () {
    window.debounce(function () {
      var filteredItemsElements = window.map.pins.filter(function (pin) {
        return filterPrice(pin) && filterRooms(pin) && filterGuests(pin) && filterType(pin) && filterFeatures(pin);
      }).slice(0, MAX_PINS);
      window.map.pins.forEach(function (it) {
        it.mapPinElement.style.display = filteredItemsElements.indexOf(it) >= 0 ? 'block' : 'none';
      });
      var popupElement = document.querySelector('.popup');
      if (popupElement) {
        popupElement.style.display = 'none';
      }
    });
  };

  var filterPrice = function (pin) {
    switch (housingPriceElement.value) {
      case PRICE_LOW:
        return pin.offer.price < MAX_PRICE;
      case PRICE_MIDDLE:
        return pin.offer.price >= MAX_PRICE && pin.offer.price < MIN_PRICE;
      case PRICE_HIGH:
        return pin.offer.price >= MIN_PRICE;
      default:
        return true;
    }
  };

  var filterType = function (pin) {
    return housingTypeElement.value === 'any' || pin.offer.type === housingTypeElement.value;
  };

  var filterRooms = function (pin) {
    return housingRoomsElement.value === 'any' || pin.offer.rooms === Math.floor(housingRoomsElement.value);
  };

  var filterGuests = function (pin) {
    return housingGuestsElement.value === 'any' || pin.offer.guests === Math.floor(housingGuestsElement.value);
  };

  var filterFeatures = function (pin) {
    var mapFeaturesElements = formFiltersElement.querySelectorAll('input:checked');

    return Array.prototype.every.call(mapFeaturesElements, function (it) {
      return pin.offer.features.indexOf(it.value) !== -1;
    });
  };

  housingPriceElement.addEventListener('change', acceptFilterHandler);
  housingTypeElement.addEventListener('change', acceptFilterHandler);
  housingRoomsElement.addEventListener('change', acceptFilterHandler);
  housingGuestsElement.addEventListener('change', acceptFilterHandler);

  housingFeaturesElement.forEach(function (it) {
    it.addEventListener('change', acceptFilterHandler);
  });

}());
