'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'house', 'bungalo', 'palace'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var NUMBER_OF_PINS = 8;
var CARD_RENDER_NUMBER = 0;

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

var generateOffer = function (indexOffer) {
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
  mapPin.querySelector('img').alt = offer.offer.title;

  return mapPin;
};

var renderPhotos = function (array, mapTemplate) {
  var photos = mapTemplate.querySelector('.popup__photos');
  var photo = mapTemplate.querySelector('.popup__photos').querySelector('img');
  photo.src = array.offer.photos[0];
  for (var i = 1; i < array.offer.photos.length; i++) {
    photos.appendChild(photo.cloneNode()).src = array.offer.photos[i];
  }
};

var renderFeatures = function (array, mapTemplate) {
  var featureList = mapTemplate.querySelector('.popup__features');
  var featureItem = featureList.querySelectorAll('.popup__feature');
  for (var i = FEATURES.length - 1; i >= 0; i--) {
    if (array.offer.features.some(function (elem) {
      return elem === FEATURES.reverse()[i];
    })) {
      featureList.removeChild(featureItem[i]);
    }
  }
};

var showCard = function (offer) {

  var mapCard = template.querySelector('.map__card').cloneNode(true);
  map.insertBefore(mapCard, document.querySelector('.map__filters-container'));

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

  var getRoomsName = function (number, arrWords) {
    var n = Math.abs(number);
    var counter = 0;
    n %= 100;
    if (n > 4 && n < 20 || n === 0 || n >= 5) {
      counter = 2;
    }
    n %= 10;
    if (n > 1 && n < 5) {
      counter = 1;
    }
    return arrWords[counter];
  };

  var roomsNamesArray = ['комната', 'комнаты', 'комнат'];
  var currentRoomsName = getRoomsName(offer.offer.rooms, roomsNamesArray);
  mapCard.querySelector('.popup__title').textContent = offer.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = offer.offer.address;
  mapCard.querySelector('.popup__text--price').innerHTML = offer.offer.price + ' &#x20bd;/ночь';
  mapCard.querySelector('.popup__type').textContent = getValueTypeOffer();
  mapCard.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' ' + currentRoomsName + ' для ' + offer.offer.guests + ' гостей';
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  mapCard.querySelector('.popup__description').textContent = offer.offer.description;
  mapCard.querySelector('.popup__avatar').src = offer.author.avatar;
  renderFeatures(offer, mapCard);
  renderPhotos(offer, mapCard);

  return mapCard;
};

// var removeChilds = function (parent) {
//   while (parent.firstChild) {
//     parent.removeChild(parent.firstChild);
//   }
// };

// Не пойму почему когда задаю параметр offers программа не работает!
var renderInit = function () {

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderMapPin(offers[i]));
  }

  fragment.appendChild(showCard(offers[CARD_RENDER_NUMBER]));

  mapListElement.appendChild(fragment);
};

renderInit();
