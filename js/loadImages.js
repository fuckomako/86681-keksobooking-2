'use strict';

(function () {
  var MAX_PHOTOS = 8;
  var PHOTOS = ['jpg', 'jpeg', 'png', 'gif'];
  var IMAGE_WIDTH = 70;
  var IMAGE_HEIGHT = 70;
  var photoContainerElement = document.querySelector('.ad-form__photo');

  var avatarUploadElemnt = document.querySelector('.ad-form__field input[type=file]');
  var ImageInputElement = document.querySelector('.ad-form-header__preview img');
  var photoUploadElement = document.querySelector('.ad-form__upload input[type=file]');


  avatarUploadElemnt.addEventListener('change', function () {
    var file = avatarUploadElemnt.files[0];
    var fileNameElement = file.name.toLowerCase();
    var matches = PHOTOS.some(function (item) {
      return fileNameElement.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        ImageInputElement.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  var addImage = function (source) {
    var imageElement = document.createElement('img');
    imageElement.alt = 'Фотография жилья';
    imageElement.src = source;
    imageElement.width = IMAGE_WIDTH;
    imageElement.draggable = true;
    imageElement.height = IMAGE_HEIGHT;
    imageElement.style.margin = '2px';
    photoContainerElement.style.display = 'flex';
    photoContainerElement.style.justifyContent = 'space-around';
    photoContainerElement.style.alignItems = 'center';
    photoContainerElement.style.width = 'auto';
    photoContainerElement.appendChild(imageElement);
  };

  photoUploadElement.addEventListener('change', function () {
    var photos = document.querySelectorAll('.ad-form__photo img').length;
    if (photos !== null && photos < MAX_PHOTOS) {

      var images = photoUploadElement.files[0];
      var fileNameElement = images.name.toLowerCase();

      var matches = PHOTOS.some(function (item) {
        return fileNameElement.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          addImage(reader.result);
        });
        reader.readAsDataURL(images);
      }
    }
  });


})();
