;(function () {
  angular.module('hj.imagesLoaded', [])
    .directive('imagesLoaded', ['$timeout',
      function ($timeout) {
        'use strict'
        return {
          restrict: 'AC',
          link: function (scope, element, attrs) {
            var events = scope.$eval(attrs.imagesLoaded) || scope.$eval(attrs.imagesLoadedEvents)
            var className = attrs.imagesLoadedClass || 'images-loaded'
            var classUsed = element.hasClass(className)

            scope.$imagesLoaded = false

            var init = function () {
              scope.$emit('imagesLoaded:started', {
                scope: scope,
                element: element,
              })

              if (classUsed) {
                element.addClass(className)
              }

              var imgLoad = imagesLoaded(element[0], function () {
                scope.$emit('imagesLoaded:loaded', {
                  scope: scope,
                  element: element,
                })

                element.removeClass(className + ' images-loaded: ' + attrs.imagesLoaded + ';')

                $timeout(function () {
                  scope.$imagesLoaded = true
                })
              })

              if (typeof events !== 'undefined') {
                angular.forEach(events, function (fn, eventName) {
                  imgLoad.on(eventName, fn)
                })
              }
            }

            if (attrs.imagesLoadedWatch) {
              scope.$watch(attrs.imagesLoadedWatch, function () {
                $timeout(init)
              })
            } else {
              $timeout(init)
            }

          }
        }
      }
    ])

  angular.module('angular-images-loaded', ['hj.imagesLoaded'])
})()
