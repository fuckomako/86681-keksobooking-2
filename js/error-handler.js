'use strict';
(function () {
  window.errorHandler = function (errorMessage) {
    var divElement = document.createElement('div');
    divElement.style = 'z-index: 100; margin: 0 auto; color: #fff; text-align: center; background-color: red;';
    divElement.style.position = 'absolute';
    divElement.style.left = 0;
    divElement.style.right = 0;
    divElement.style.fontSize = '30px';
    divElement.classList.add('error');
    divElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', divElement);
  };
})();
