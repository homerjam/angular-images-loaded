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
        },
        bindToController: true,
        controllerAs: 'vm',
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
          var vm = this;

          var events = vm.imagesLoaded || vm.imagesLoadedEvents;
          var options = vm.imagesLoadedOptions || {};
          var className = vm.imagesLoadedClass || 'images-loaded';
          var classUsed = $element.hasClass(className);

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

            if (typeof events !== 'undefined') {
              angular.forEach(events, function (fn, eventName) {
                imgLoad.on(eventName, fn);
              });
            }
          };

          if (vm.imagesLoadedWatch) {
            $scope.$watch('vm.imagesLoadedWatch', function () {
              init();
            });
          } else {
            init();
          }
        }]
      };
    }
  );

  angular.module('angular-images-loaded', ['hj.imagesLoaded']);
})();
