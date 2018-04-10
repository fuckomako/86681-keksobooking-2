'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'house', 'bungalo', 'palace'];
var TIMES = ['12:00', '13:00', '14:00'];
var FETURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var NUMBER_OF_PINS = 8;
var CARD_RENDER_NUMBER = 0;

var getRandomSort = function () {
  return Math.ceil(Math.random() - 0.5);
};

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getFeatures = function () {
  var randomLength = getRandomValue(0, FETURES.length);
  return FETURES.slice(0, randomLength);
};

var getPhotos = function () {
  return PHOTOS.slice(0, PHOTOS.length);
};

var getRandomElementOfArray = function (arr) {
  return arr[getRandomValue(0, arr.length)];
};

var generateOffer = function (indexOffer) {
  var coordinatesLocation = {
    'x': getRandomValue(300, 900),
    'y': getRandomValue(100, 500)
  };
  return {
    'author': {
      'avatar': 'img/avatars/user0' + Math.floor(Math.random() * 8 + 1) + '.png'
    },

    'offer': {
      'title': TITLES.sort(getRandomSort)[indexOffer],
      'address': coordinatesLocation.x + ', ' + coordinatesLocation.y,
      'price': getRandomValue(1000, 1000000),
      'type': getRandomElementOfArray(TYPE),
      'rooms': getRandomValue(1, 6),
      'guests': getRandomValue(1, 10),
      'checkin': getRandomElementOfArray(TIMES),
      'checkout': getRandomElementOfArray(TIMES),
      'features': getFeatures(),
      'description': '',
      'photos': getPhotos(PHOTOS)
    },
    'location': coordinatesLocation
  };
};

var addPins = function (numberOfObjects) {
  var offers = [];

  for (var i = 0; i < numberOfObjects; i++) {
    offers.push(generateOffer(i));
  }

  return offers;
};

var offers = addPins(NUMBER_OF_PINS);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapListElement = map.querySelector('.map__pins');
var template = document.querySelector('template').content;

var renderMapPin = function (offer) {
  var mapPin = template.querySelector('.map__pin').cloneNode(true);
  var mapPinImage = mapPin.querySelector('img');

  mapPin.style.left = offer.location.x - (mapPinImage.width / 2) + 'px';
  mapPin.style.top = offer.location.y - mapPinImage.height + 'px';
  mapPin.querySelector('img').src = offer.author.avatar;

  return mapPin;
};

var showCard = function (offer) {

  var mapCard = template.querySelector('.map__card').cloneNode(true);

  var getValueTypeOffer = function () {
    if (offer.offer.type === 'flat') {
      return 'Квартира';
    } else if (offer.offer.type === 'bungalo') {
      return 'Бунгало';
    } else if (offer.offer.type === 'palace') {
      return 'Дворец';
    } else {
      return 'Дом';
    }
  };

  // @TODO ДОПОЛНИЕЛЬНОЕ ЗАДАНИЕ насписать функцию сконения числительных для русского языка.
  // Не вход принимат число, и три слова, а возвращает слово, наприме
  // N, гость, гостя, гостей — где N, целое число
  var getRoomsName = function (roomsCount) {
    var roomsText = roomsCount + ' комнат';
    if (roomsCount === 1) {
      roomsText += 'a';
    } else if ([2, 3, 4].includes(roomsCount)) {
      roomsText += 'ы';
    } else if (roomsCount === 5) {
      roomsText = roomsText;
    }
    return roomsText;
  };

  mapCard.querySelector('.popup__title').textContent = offer.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = offer.offer.address;
  mapCard.querySelector('.popup__text--price').innerHTML = offer.offer.price + ' &#x20bd;/ночь';
  mapCard.querySelector('.popup__type').textContent = getValueTypeOffer();
  mapCard.querySelector('.popup__text--capacity').innerHTML = getRoomsName(offer.offer.rooms) + ' для ' + offer.offer.guests + ' гостей';
  mapCard.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  var featuresList = mapCard.querySelector('.popup__features');
  removeChilds(featuresList);
  mapCard.querySelector('.popup__description').textContent = offer.offer.description;
  for (var i = 0; i < offer.offer.photos.length - 1; i++) {
    mapCard.querySelector('.popup__photos').appendChild(mapCard.querySelector('.popup__photo').cloneNode(true));
  }
  for (i = 0; i < PHOTOS.length; i++) {
    mapCard.querySelector('.popup__photo:nth-child(' + (i + 1) + ')').src = offer.offer.photos[i];
  }
  mapCard.querySelector('.popup__avatar').src = offer.author.avatar;

  var fragmentFeatures = document.createDocumentFragment();

  for (var j = 0; j < offer.offer.features.length; j++) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('feature', 'feature--' + offer.offer.features[j]);
    fragmentFeatures.appendChild(featureElement);
  }

  featuresList.appendChild(fragmentFeatures);

  return mapCard;
};

var removeChilds = function (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

var renderInit = function () {

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderMapPin(offers[i]));
  }

  fragment.appendChild(showCard(offers[CARD_RENDER_NUMBER]));

  mapListElement.appendChild(fragment);
};

renderInit(offers);
