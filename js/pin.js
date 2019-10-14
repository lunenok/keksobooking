'use strict';

(function () {
  var similarPin = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderAd = function (ad) {
    var pinElement = similarPin.cloneNode(true);

    pinElement.setAttribute('style', 'left:' + ad.location.x + 'px' + '; top:' + ad.location.y + 'px');
    pinElement.setAttribute('alt', ad.offer.title);
    pinElement.querySelector('img').setAttribute('src', ad.author.avatar);

    return pinElement;
  };

  var renderAds = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0, ads = window.createAds(8); i < ads.length; i++) {
      fragment.appendChild(renderAd(ads[i]));
    }
    return fragment;
  };

  window.map.appendChild(renderAds());
})();
