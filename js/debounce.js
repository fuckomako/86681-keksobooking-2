'use strict';

(function () {
  var DEBOUNCE_PERIOD = 500;
  var lastTimeout;
  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_PERIOD);
  };
})();
