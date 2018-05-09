'use strict';

(function () {
  var TIMEOUT = 10000;
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var SEND_URL = 'https://js.dump.academy/keksobooking';

  window.backend = {};

  var getData = function (url, method, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend.load = function (onLoad, onError) {
    var xhr = getData(DATA_URL, 'GET', null, onLoad, onError);
    return xhr;
  };

  window.backend.save = function (onLoad, onError) {
    var xhr = getData(SEND_URL, 'POST', onLoad, onError);
    return xhr;
  };
})();
