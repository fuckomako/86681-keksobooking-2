'use strict';

(function () {
  var LEFT_POSITION = 25;
  var TOP_POSITION = 70;

  window.renderMapPin = function (offer, isVisible) {
    var mapElement = document.querySelector('.map');
    var mapTemplateElement = document.querySelector('template').content;
    var mapPinElement = mapTemplateElement.querySelector('.map__pin').cloneNode(true);
    var mapPinImageElement = mapPinElement.querySelector('img');

    mapPinElement.style.left = (offer.location.x - LEFT_POSITION) + 'px';
    mapPinElement.style.top = (offer.location.y - TOP_POSITION) + 'px';
    mapPinElement.style.display = isVisible ? 'block' : 'none';
    mapPinImageElement.src = offer.author.avatar;
    mapPinImageElement.alt = offer.offer.title;
    mapPinElement.addEventListener('click', function () {
      if (mapElement.querySelector('.map__card')) {
        window.card.close();
      }
      window.card.show(offer);
    });
    offer.mapPinElement = mapPinElement;
    return mapPinElement;
  };

})();
