'use strict';

(function () {
  var ESC_BUTTON = 27;
  var TYPE_FLAT = 'flat';
  var TYPE_BUNGALO = 'bungalo';
  var TYPE_PALACE = 'palace';

  var mapElement = document.querySelector('.map');
  var templateElement = document.querySelector('template').content;

  var renderPhotos = function (count) {
    var photoElement = document.createElement('img');
    photoElement.src = count;
    photoElement.width = 30;
    photoElement.height = 30;
    photoElement.classList.add('popup__photo');
    return photoElement;
  };

  var renderFeatures = function (count) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature--' + count);
    return featureElement;
  };

  var getCollectionOfArray = function (array, renderFunction) {
    var fragmentElement = document.createDocumentFragment();
    array.forEach(function (it) {
      fragmentElement.appendChild(renderFunction(it));
    });
    return fragmentElement;
  };

  var removeChilds = function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  window.card = {
    close: function () {
      var mapCardElement = document.querySelector('.map__card');
      if (mapCardElement) {
        mapCardElement.remove();
      }
      var activePinElement = mapCardElement.querySelector('.map__pin--active');
      if (activePinElement) {
        activePinElement.classList.remove('map__pin--active');
      }
      document.removeEventListener('keydown', cardCloseEscHandler);
    },

    mapListElement: mapElement.querySelector('.map__pins'),

    show: function (offer) {
      var mapCardElement = templateElement.querySelector('.map__card').cloneNode(true);
      mapElement.insertBefore(mapCardElement, document.querySelector('.map__filters-container'));
      var featuresElement = mapCardElement.querySelector('.popup__features');
      var photosElement = mapCardElement.querySelector('.popup__photos');

      var getValueTypeOffer = function () {
        if (offer.offer.type === TYPE_FLAT) {
          return 'Квартира';
        }

        if (offer.offer.type === TYPE_BUNGALO) {
          return 'Бунгало';
        }

        if (offer.offer.type === TYPE_PALACE) {
          return 'Дворец';
        }

        return 'Дом';
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

      var rooms = ['комната', 'комнаты', 'комнат'];
      var guests = ['гость', 'гостя', 'гостей'];
      var currentRoomsName = getCorrectName(offer.offer.rooms, rooms);
      var currentGuestsName = getCorrectName(offer.offer.guests, guests);
      mapCardElement.querySelector('.popup__title').textContent = offer.offer.title;
      mapCardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
      mapCardElement.querySelector('.popup__text--price').innerHTML = offer.offer.price + ' ₽/ночь';
      mapCardElement.querySelector('.popup__type').textContent = getValueTypeOffer();
      mapCardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' ' + currentRoomsName + ' для ' + offer.offer.guests + ' ' + currentGuestsName;
      mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
      mapCardElement.querySelector('.popup__description').textContent = offer.offer.description;
      mapCardElement.querySelector('.popup__avatar').src = offer.author.avatar;
      removeChilds(featuresElement);
      featuresElement.appendChild(getCollectionOfArray(offer.offer.features, renderFeatures));
      removeChilds(photosElement);
      photosElement.appendChild(getCollectionOfArray(offer.offer.photos, renderPhotos));

      var closePopupElement = document.querySelector('.popup__close');
      closePopupElement.addEventListener('click', function () {
        window.card.close();
      });
      document.addEventListener('keydown', cardCloseEscHandler);

      return mapCardElement;
    }
  };

  var cardCloseEscHandler = function (evt) {
    if (evt.keyCode === ESC_BUTTON) {
      window.card.close();
    }
  };
})();
