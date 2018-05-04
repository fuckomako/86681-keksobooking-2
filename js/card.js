'use strict';

(function () {
  var ESC_BUTTON = 27;
  var map = document.querySelector('.map');
  window.mapListElement = map.querySelector('.map__pins');
  var template = document.querySelector('template').content;

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
    mapCard.querySelector('.popup__text--price').textContent = offer.offer.price + ' &#x20bd;/ночь';
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

  window.card = {
    closeCard: closeCard,
    showCard: showCard
  };
})();
