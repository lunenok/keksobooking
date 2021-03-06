'use strict';

(function () {
  var MAX_PIN_COUNT = 5;
  var DEFAULT_FILTER_VALUE = 'any';
  var PriceIntervals = {
    any: 'any',
    low: {
      min: 0,
      max: 9999
    },
    middle: {
      min: 10000,
      max: 49999
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };
  var roomsCountSelect = document.querySelector('#housing-rooms');
  var guestCountSelect = document.querySelector('#housing-guests');
  var roomTypeSelect = document.querySelector('#housing-type');
  var priceValueSelect = document.querySelector('#housing-price');
  var featuresSelect = document.querySelector('#housing-features');

  var typeFilter = function (item) {
    var selectedType = roomTypeSelect.options[roomTypeSelect.selectedIndex].value;
    return selectedType === DEFAULT_FILTER_VALUE ? true : item.offer.type === selectedType;
  };

  var priceFilter = function (item) {
    var selectedPrice = priceValueSelect.options[priceValueSelect.selectedIndex].value;
    var priceValue = item.offer.price;
    return selectedPrice === PriceIntervals.any
      ? true
      : priceValue >= PriceIntervals[selectedPrice].min &&
        priceValue <= PriceIntervals[selectedPrice].max;
  };

  var roomsFilter = function (item) {
    return roomsCountSelect.value === DEFAULT_FILTER_VALUE ? true : item.offer.rooms === parseInt(roomsCountSelect.value, 10);
  };

  var guestsFilter = function (item) {
    return guestCountSelect.value === DEFAULT_FILTER_VALUE ? true : item.offer.guests === parseInt(guestCountSelect.value, 10);
  };

  var featuresFilter = function (item) {
    var checkedFeatures = [].slice.call(featuresSelect.querySelectorAll('input[type="checkbox"]:checked'));
    var featuresValue = checkedFeatures.map(function (feature) {
      return feature.value;
    });

    return featuresValue.every(function (feature) {
      return item.offer.features.includes(feature);
    });
  };

  var filterData = function (data) {
    return data
      .filter(function (item) {
        return typeFilter(item) && roomsFilter(item) && guestsFilter(item) && priceFilter(item) && featuresFilter(item);
      })
      .slice(0, MAX_PIN_COUNT);
  };

  var setFilterDefault = function () {
    var filtersForm = document.querySelector('.map__filters');
    filtersForm.reset();
  };

  window.filter = {
    filterData: filterData,
    setFilterDefault: setFilterDefault
  };

  var onFilterChange = function () {
    window.pin.pinSuccessHandler();
    window.cards.removeCard();
  };

  roomTypeSelect.addEventListener('change', window.utils.debounce(onFilterChange));
  guestCountSelect.addEventListener('change', window.utils.debounce(onFilterChange));
  roomsCountSelect.addEventListener('change', window.utils.debounce(onFilterChange));
  priceValueSelect.addEventListener('change', window.utils.debounce(onFilterChange));
  featuresSelect.addEventListener('change', window.utils.debounce(onFilterChange));
})();
