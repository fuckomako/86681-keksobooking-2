'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'house', 'bungalo', 'palace'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var NUMBER_OF_PINS = 8;
var ESC_BUTTON = 27;
var MAIN_PIN_WIDTH = 32;
var MAIN_PIN_HEIGHT = 84;
var LIMIT_TOP_Y = 150;
var LIMIT_BOTTOM_Y = 500;
var LIMIT_LEFT_X = 0;
var LIMIT_RIGHT_X = 1200;

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


var mapListElement = map.querySelector('.map__pins');
var template = document.querySelector('template').content;

var renderMapPin = function (offer) {
  var mapPin = template.querySelector('.map__pin').cloneNode(true);
  var mapPinImage = mapPin.querySelector('img');

  mapPin.style.left = offer.location.x - (mapPinImage.width / 2) + 'px';
  mapPin.style.top = offer.location.y - mapPinImage.height + 'px';
  mapPinImage.src = offer.author.avatar;
  mapPinImage.alt = offer.offer.title;
  mapPin.addEventListener('click', function () {
    if (map.querySelector('.map__card')) {
      closeCard();
    }
    showCard(offer);
  });

  return mapPin;
};

var renderPhotos = function (count) {
  var photo = document.createElement('img');
  photo.src = count;
  photo.width = 30;
  photo.height = 30;
  photo.classList.add('popup__photo');
  return photo;
};

var renderFeatures = function (count) {
  var feature = document.createElement('li');
  feature.classList.add('popup__feature');
  feature.classList.add('popup__feature--' + count);
  return feature;
};

var getArrayCollection = function (array, renderFunction) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderFunction(array[i]));
  }
  return fragment;
};

var removeChilds = function (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

var getCorrectName = function (number, arrWords) {
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

var closeCard = function () {
  var mapCard = document.querySelector('.map__card');
  var closePopup = mapCard.querySelector('.popup__close');
  if (mapCard) {
    mapCard.remove();
  }
  var activePin = mapCard.querySelector('.map__pin--active');
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
  closePopup.removeEventListener('click', closeCard);
  document.removeEventListener('keydown', cardCloseEscHandler);

  // удаляем обработчик с документа (поверь, надо) :)) Чтобы его удалить, надо его сначала создать :)))
};

var cardCloseEscHandler = function (evt) {
  if (evt.keyCode === ESC_BUTTON) {
    closeCard();
  }
};

var showCard = function (offer) {

  var mapCard = template.querySelector('.map__card').cloneNode(true);
  map.insertBefore(mapCard, document.querySelector('.map__filters-container'));
  var featuresBlock = mapCard.querySelector('.popup__features');
  var photosBlock = mapCard.querySelector('.popup__photos');

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

  var roomsNamesArray = ['комната', 'комнаты', 'комнат'];
  var guestsNamesArray = ['гость', 'гостя', 'гостей'];
  var currentRoomsName = getCorrectName(offer.offer.rooms, roomsNamesArray);
  var currentGuestsName = getCorrectName(offer.offer.guests, guestsNamesArray);
  mapCard.querySelector('.popup__title').textContent = offer.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = offer.offer.address;
  mapCard.querySelector('.popup__text--price').innerHTML = offer.offer.price + ' &#x20bd;/ночь';
  mapCard.querySelector('.popup__type').textContent = getValueTypeOffer();
  mapCard.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' ' + currentRoomsName + ' для ' + offer.offer.guests + ' ' + currentGuestsName;
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  mapCard.querySelector('.popup__description').textContent = offer.offer.description;
  mapCard.querySelector('.popup__avatar').src = offer.author.avatar;
  removeChilds(featuresBlock);
  featuresBlock.appendChild(getArrayCollection(offer.offer.features, renderFeatures));
  removeChilds(photosBlock);
  photosBlock.appendChild(getArrayCollection(offer.offer.photos, renderPhotos));

  var closePopup = mapCard.querySelector('.popup__close');
  closePopup.addEventListener('click', function () {
    closeCard();
  });
  document.addEventListener('keydown', cardCloseEscHandler);

  return mapCard;
};

// Не пойму почему когда задаю параметр offers программа не работает!
var renderInit = function () {

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderMapPin(offers[i]));
  }

  mapListElement.appendChild(fragment);
};


var userForm = document.querySelector('.ad-form');

var addDisableForm = function () {
  var fieldsetDisable = userForm.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsetDisable.length; i++) {
    fieldsetDisable[i].setAttribute('disabled', 'disabled');
  }
};
addDisableForm();

var removeDisableForm = function () {
  var fieldsetEnable = userForm.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsetEnable.length; i++) {
    fieldsetEnable[i].removeAttribute('disabled');
  }
};

var mainMapPin = document.querySelector('.map__pin--main');

var mainPinMouseUpHandler = function (evt) {
  activatePage(evt);
};

mainMapPin.addEventListener('mouseup', mainPinMouseUpHandler);

var activatePage = function () {
  map.classList.remove('map--faded');
  userForm.classList.remove('ad-form--disabled');
  removeDisableForm();
  renderInit();
  roomsInputChangeHandler();
  setAddressValue();
};

var roomsAndCapatokyoMap = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

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

var roomsInputChangeHandler = function () {
  calculateRoomsAndCapacity();
};

roomsInputElement.addEventListener('change', roomsInputChangeHandler);

// Сброс фильтров

var deletePins = function () {
  var buttons = mapListElement.querySelectorAll('button');
  for (var i = 1; i < buttons.length; i++) {
    mapListElement.removeChild(buttons[i]);
  }
};

var resetPage = function () {
  map.classList.add('map--faded');
  userForm.classList.add('ad-form--disabled');
  addDisableForm();
  deletePins();
};

var buttonResetClickHandler = function () {
  resetPage();
};

userForm.addEventListener('reset', buttonResetClickHandler);

// Реализация перетаскивания метки

var field = document.querySelector('#address');
var setAddressValue = function () {
  field.value = getPinLocation(mainMapPin.style.left, MAIN_PIN_WIDTH) + ', ' + getPinLocation(mainMapPin.style.top, MAIN_PIN_HEIGHT);
};

var getPinLocation = function (pos, gap) {
  return Math.round(parseInt(pos.split('px', 1), 10)) + Math.round(gap);
};

var pinDragHandler = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var mouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';
    mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + 'px';

    setAddressValue();

    var mainMapPinLeftCoord = parseInt(mainMapPin.style.left.split('px')[0], 10);
    var mainMapPinTopCoord = parseInt(mainMapPin.style.top.split('px')[0], 10);

    if (mainMapPinTopCoord < LIMIT_TOP_Y - MAIN_PIN_HEIGHT) {
      mainMapPin.style.top = LIMIT_TOP_Y - MAIN_PIN_HEIGHT + 'px';
    }

    if (mainMapPinTopCoord > LIMIT_BOTTOM_Y - MAIN_PIN_HEIGHT) {
      mainMapPin.style.top = LIMIT_BOTTOM_Y - MAIN_PIN_HEIGHT + 'px';
    }

    if (mainMapPinLeftCoord < LIMIT_LEFT_X - MAIN_PIN_WIDTH) {
      mainMapPin.style.left = LIMIT_LEFT_X - MAIN_PIN_WIDTH + 'px';
    }

    if (mainMapPinLeftCoord > LIMIT_RIGHT_X - MAIN_PIN_WIDTH) {
      mainMapPin.style.left = LIMIT_RIGHT_X - MAIN_PIN_WIDTH + 'px';
    }

  };

  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);

};

mainMapPin.addEventListener('mouseup', pinDragHandler);
mainMapPin.addEventListener('mousedown', pinDragHandler);
