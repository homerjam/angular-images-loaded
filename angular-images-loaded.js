angular.module('angular-images-loaded', []).directive('imagesLoaded', ['$timeout',
    function($timeout) {
        'use strict';
        return {
            restrict: 'AC',
            link: function(scope, element, attrs) {
                var events = scope.$eval(attrs.imagesLoaded);

                $timeout(function() {
                    scope.$emit('imagesLoaded:started', {
                        scope: scope,
                        element: element
                    });

                    var imgLoad = imagesLoaded(element[0], function() {
                        scope.$emit('imagesLoaded:loaded', {
                            scope: scope,
                            element: element
                        });

                        element.removeClass('images-loaded images-loaded: ' + attrs.imagesLoaded + ';');
                    });

                    if (typeof(events) !== undefined) {
                        angular.forEach(events, function(fn, eventName) {
                            imgLoad.on(eventName, fn);
                        });
                    }
                });
            }
        };
    }
]);
