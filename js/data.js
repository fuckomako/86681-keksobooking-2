'use strict';

(function () {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPE = ['flat', 'house', 'bungalo', 'palace'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getRandomValue = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var getRandomItemNoRepeat = function (arr) {
    var randomElement = getRandomValue(0, arr.length - 1);
    var randomElementItem = arr[randomElement];
    arr.splice(randomElement, 1);
    return randomElementItem;
  };

  var getFeatures = function () {
    var randomLength = getRandomValue(0, FEATURES.length);
    return FEATURES.slice(0, randomLength);
  };

  var getPhotos = function () {
    return PHOTOS.slice(0, PHOTOS.length);
  };

  var getRandomElementOfArray = function (arr) {
    return arr[getRandomValue(0, arr.length)];
  };

  window.generateOffer = function (indexOffer) {
    var coordinatesLocation = {
      'x': getRandomValue(300, 900),
      'y': getRandomValue(100, 500)
    };
    return {
      'author': {
        'avatar': 'img/avatars/user0' + (indexOffer + 1) + '.png'
      },

      'offer': {
        'title': getRandomItemNoRepeat(TITLES),
        'address': coordinatesLocation.x + ', ' + coordinatesLocation.y,
        'price': getRandomValue(1000, 1000000),
        'type': getRandomElementOfArray(TYPE),
        'rooms': getRandomValue(1, 5),
        'guests': getRandomValue(1, 10),
        'checkin': getRandomElementOfArray(TIMES),
        'checkout': getRandomElementOfArray(TIMES),
        'features': getFeatures(),
        'description': '',
        'photos': getPhotos()
      },
      'location': coordinatesLocation
    };
  };
})();
