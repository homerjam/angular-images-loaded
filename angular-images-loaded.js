(function () {
  'use strict';
  angular.module('hj.imagesLoaded', [])
    .config(['$compileProvider', function($compileProvider) {
      if ($compileProvider.preAssignBindingsEnabled) {
        $compileProvider.preAssignBindingsEnabled(true); // https://github.com/angular/angular.js/blob/master/CHANGELOG.md#breaking-changes
      }
    }])
    .directive('imagesLoaded', function () {
      return {
        restrict: 'AC',
        scope: {
          imagesLoaded: '=?',
          imagesLoadedOptions: '=?',
          imagesLoadedEvents: '=?',
          imagesLoadedClass: '=?',
          imagesLoadedWatch: '=?',
          imagesLoadedAlways: '&?',
          imagesLoadedDone: '&?',
          imagesLoadedFail: '&?',
          imagesLoadedSelector: '@?'
        },
        bindToController: true,
        controllerAs: 'vm',
        controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
          var vm = this;

          var eventNames = ['always', 'done', 'fail', 'progress'];
          var events = vm.imagesLoaded || vm.imagesLoadedEvents;
          var options = vm.imagesLoadedOptions || {};
          var className = vm.imagesLoadedClass || 'images-loaded';
          var classUsed = $element.hasClass(className);
          var selector = vm.imagesLoadedSelector;

          $element.addClass(className);

          var init = function () {
            $scope.$emit('imagesLoaded:started', $element);

            if (classUsed) {
              $element.addClass(className);
            }

            var elements = selector ? $element.find(selector) : $element[0];

            var imgLoad = imagesLoaded(elements, options, function () {
              $scope.$emit('imagesLoaded:loaded', $element);

              $element.removeClass(className);

              $scope.$apply(function () {
                $scope.$parent.$imagesLoaded = true;
              });
            });

            eventNames.forEach(function (eventName) {
              imgLoad.on(eventName, function () {
                var callbackArguments = [this, $element].concat(Array.prototype.slice.call(arguments));
                if (events && typeof events[eventName] === 'function') {
                  events[eventName].apply(this, callbackArguments);
                }

                if (typeof vm['imagesLoaded' + (eventName[0].toUpperCase() + eventName.slice(1))] === 'function') {
                  vm['imagesLoaded' + (eventName[0].toUpperCase() + eventName.slice(1))].apply(this, callbackArguments);
                }
              });
            });
          };

          if (vm.imagesLoadedWatch) {
            $scope.$watch('vm.imagesLoadedWatch', function () {
              init();
            });
          } else {
            $timeout(init);
          }
        }]
      };
    }
  );

  angular.module('angular-images-loaded', ['hj.imagesLoaded']);
})();
