'use strict';

(function () {
  var MAX_PHOTOS = 8;
  var PHOTOS = ['jpg', 'jpeg', 'png'];
  var PHOTO_CONTAINER_ELEMENT = document.querySelector('.ad-form__photo');
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
    imageElement.width = 70;
    imageElement.draggable = true;
    imageElement.height = 70;
    imageElement.style.margin = '2px';
    PHOTO_CONTAINER_ELEMENT.style.display = 'flex';
    PHOTO_CONTAINER_ELEMENT.style.justifyContent = 'space-around';
    PHOTO_CONTAINER_ELEMENT.style.alignItems = 'center';
    PHOTO_CONTAINER_ELEMENT.style.width = 'auto';
    PHOTO_CONTAINER_ELEMENT.appendChild(imageElement);
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
