'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var AD_TITLE = 'Предложение №';
  var LOCATION_X_MIN = 100;
  var LOCATION_X_MAX = 1000;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var MIN_PRICE = 5000;
  var MAX_PRICE = 12000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 3;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 3;

  window.getRandomInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  window.getRandomFromArray = function (array) {
    return array[window.getRandomInterval(1, array.length)];
  };

  window.shuffleArray = function (array) {
    var randomArray = [];
    var randomCount = window.getRandomInterval(1, array.length);
    array.sort(function () {
      return 0.5 - Math.random();
    });
    for (var i = 0; i < randomCount; i++) {
      randomArray[i] = array[i];
    }
    return randomArray;
  };

  window.createAds = function (count) {
    var ads = [];
    for (var i = 0; i < count; i++) {
      var xCoordinate = window.getRandomInterval(LOCATION_X_MIN, LOCATION_X_MAX);
      var yCoordinate = window.getRandomInterval(LOCATION_Y_MIN, LOCATION_Y_MAX);
      var adElement = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'location': {
          x: xCoordinate,
          y: yCoordinate
        },
        'offer': {
          'title': AD_TITLE + ' ' + i,
          'address': xCoordinate + ' ' + yCoordinate,
          'price': window.getRandomInterval(MIN_PRICE, MAX_PRICE),
          'type': window.getRandomFromArray(TYPES),
          'rooms': window.getRandomInterval(MIN_ROOMS, MAX_ROOMS),
          'guests': window.getRandomInterval(MIN_GUESTS, MAX_GUESTS),
          'checkins': window.getRandomFromArray(CHECKINS),
          'checkout': window.getRandomFromArray(CHECKOUTS),
          'features': window.shuffleArray(FEATURES),
          'description': 'Тут будет описание',
          'photos': window.shuffleArray(PHOTOS)
        }
      };
      ads.push(adElement);
    }
    return ads;
  };
})();
