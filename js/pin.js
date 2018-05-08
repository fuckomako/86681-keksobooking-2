'use strict';

(function () {
  window.renderMapPin = function (offer, isVisible) {
    var mapElement = document.querySelector('.map');
    var mapTemplateElement = document.querySelector('template').content;
    var mapPinElement = mapTemplateElement.querySelector('.map__pin').cloneNode(true);
    var mapPinImageElement = mapPinElement.querySelector('img');

    mapPinElement.style.left = (offer.location.x - 25) + 'px';
    mapPinElement.style.top = (offer.location.y - 70) + 'px';
    mapPinElement.style.display = isVisible ? 'block' : 'none';
    mapPinImageElement.src = offer.author.avatar;
    mapPinImageElement.alt = offer.offer.title;
    mapPinElement.addEventListener('click', function () {
      if (mapElement.querySelector('.map__card')) {
        window.closeCard();
      }
      window.showCard(offer);
    });
    offer.mapPinElement = mapPinElement;
    return mapPinElement;
  };

})();
