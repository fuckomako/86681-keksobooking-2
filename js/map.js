'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFERS = ['flat', 'house', 'bungalo', 'palace'];
var TIMES = ['12:00', '13:00', '14:00'];
var OPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var NUMBER_OF_PINS = 8;
var CARD_RENDER_NUMBER = 0;

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomLengthOfArrayStrings = function (sourceArray) {
  var returnArray = sourceArray.slice(0, sourceArray.length);
  var j = 0;
  var temp = 0;
  for (var i = returnArray.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = returnArray[i];
    returnArray[i] = returnArray[j];
    returnArray[j] = temp;
  }
  return returnArray;
};

var getRandomElementOfArray = function (arr) {
  return arr[getRandomValue(0, arr.length)];
};

var createOffer = function (indexOffer) {
  var coordinatesLocation = [getRandomValue(300, 900), getRandomValue(100, 500)];
  return {
    'author': {
      'avatar': 'img/avatars/user0' + (indexOffer + 1) + '.png'
    },

    'offer': {
      'title': TITLES[indexOffer],
      'address': coordinatesLocation[0] + ', ' + coordinatesLocation[1],
      'price': getRandomValue(1000, 1000000),
      'type': getRandomElementOfArray(OFFERS),
      'rooms': getRandomValue(1, 5),
      'guests': getRandomValue(1, 10),
      'checkin': getRandomElementOfArray(TIMES),
      'checkout': getRandomElementOfArray(TIMES),
      'features': getRandomLengthOfArrayStrings(OPTIONS),
      'description': '',
      'photos': []
    },

    'location': {
      'x': coordinatesLocation[0],
      'y': coordinatesLocation[1]
    }
  };
};

var addPins = function (numberOfObjects) {
  var Objects = [];

  for (var i = 0; i < numberOfObjects; i++) {
    Objects.push(createOffer(i));
  }

  return Objects;
};

var listOfRentals = addPins(NUMBER_OF_PINS);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapListElement = map.querySelector('.map__pins');
var template = document.querySelector('template').content;

var renderMapPin = function (element) {
  var mapPin = template.querySelector('.map__pin').cloneNode(true);
  var mapPinImage = mapPin.querySelector('img');

  mapPin.style.left = element.location.x - (mapPinImage.width / 2) + 'px';
  mapPin.style.top = element.location.y - mapPinImage.height + 'px';
  mapPin.querySelector('img').setAttribute('src', element.author.avatar);

  return mapPin;
};

var compareType = function (element) {
  var mapCard = template.querySelector('.map__card').cloneNode(true);

  var getValueTypeOffer = function () {
    if (element.offer.type === 'flat') {
      return 'Квартира';
    } else if (element.offer.type === 'bungalo') {
      return 'Бунгало';
    } else {
      return 'Дом';
    }
  };

  var removeChilds = function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  mapCard.querySelector('.popup__title').textContent = element.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = element.offer.address;
  mapCard.querySelector('.popup__text--price').innerHTML = element.offer.price + ' &#x20bd;/ночь';
  mapCard.querySelector('.popup__type').textContent = getValueTypeOffer();
  mapCard.querySelector('.popup__type').nextElementSibling.textContent = element.offer.rooms + ' для ' + element.offer.guests + ' гостей';
  mapCard.querySelector('.popup__features').previousElementSibling.textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;

  var featuresList = mapCard.querySelector('.popup__features');
  removeChilds(featuresList);

  var fragmentFeatures = document.createDocumentFragment();

  for (var i = 0; i < element.offer.features.length; i++) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('feature', 'feature--' + element.offer.features[i]);
    fragmentFeatures.appendChild(featureElement);
  }

  featuresList.appendChild(fragmentFeatures);

  mapCard.querySelector('.popup__features').nextElementSibling.textContent = element.offer.description;
  mapCard.querySelector('.popup__avatar').setAttribute('src', element.author.avatar);

  return mapCard;
};

var renderInit = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < listOfRentals.length; i++) {
    fragment.appendChild(renderMapPin(listOfRentals[i]));
  }

  fragment.appendChild(compareType(listOfRentals[CARD_RENDER_NUMBER]));

  mapListElement.appendChild(fragment);
}

renderInit();
