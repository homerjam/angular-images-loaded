(function () {
  'use strict';
  angular.module('hj.imagesLoaded', [])
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
        },
        bindToController: true,
        controllerAs: 'vm',
        controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
          var vm = this;

          var eventNames = ['always', 'done', 'fail'];
          var events = vm.imagesLoaded || vm.imagesLoadedEvents;
          var options = vm.imagesLoadedOptions || {};
          var className = vm.imagesLoadedClass || 'images-loaded';
          var classUsed = $element.hasClass(className);

          $element.addClass(className);

          var init = function () {
            $scope.$emit('imagesLoaded:started', $element);

            if (classUsed) {
              $element.addClass(className);
            }

            var imgLoad = imagesLoaded($element[0], options, function () {
              $scope.$emit('imagesLoaded:loaded', $element);

              $element.removeClass(className);

              $scope.$apply(function () {
                $scope.$parent.$imagesLoaded = true;
              });
            });

            eventNames.forEach(function (eventName) {
              imgLoad.on(eventName, function () {
                if (events && typeof events[eventName] === 'function') {
                  events[eventName].apply(this, [this, $element]);
                }


                if (typeof vm['imagesLoaded' + (eventName[0].toUpperCase() + eventName.slice(1))] === 'function') {
                  vm['imagesLoaded' + (eventName[0].toUpperCase() + eventName.slice(1))].apply(this, [this, $element]);
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
