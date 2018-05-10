'use strict';

(function () {

  var photosBlockElement = document.querySelector('.ad-form__photo');
  var draggedItem;

  var dragOverHandler = function (evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';

    var target = evt.target;
    if (target && target !== draggedItem && target.tagName.toLowerCase() === 'img') {
      photosBlockElement.insertBefore(draggedItem, photosBlockElement.children[0] !== target && target.nextSibling || target);
    }
  };

  var dragEndHandler = function (evt) {
    evt.preventDefault();
    draggedItem.classList.remove('ghost');
    photosBlockElement.removeEventListener('dragover', dragOverHandler, false);
    photosBlockElement.removeEventListener('dragend', dragEndHandler, false);
  };

  photosBlockElement.addEventListener('dragstart', function (evt) {
    draggedItem = evt.target;
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('text/plain', draggedItem.alt);

    photosBlockElement.addEventListener('dragover', dragOverHandler, false);
    photosBlockElement.addEventListener('dragend', dragEndHandler, false);

    setTimeout(function () {
      draggedItem.classList.add('ghost');
    }, 0);
  }, false);

})();
