'use strict';

(function () {
  window.renderMapPin = function (offer) {
    var map = document.querySelector('.map');
    var template = document.querySelector('template').content;
    var mapPin = template.querySelector('.map__pin').cloneNode(true);
    var mapPinImage = mapPin.querySelector('img');

    mapPin.style.left = (offer.location.x - 25) + 'px';
    mapPin.style.top = (offer.location.y - 70) + 'px';
    mapPinImage.src = offer.author.avatar;
    mapPinImage.alt = offer.offer.title;
    mapPin.addEventListener('click', function () {
      if (map.querySelector('.map__card')) {
        window.card.closeCard();
      }
      window.card.showCard(offer);
    });

    return mapPin;
  };

})();
