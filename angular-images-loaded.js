angular.module('angular-images-loaded', []);

angular.module('angular-images-loaded').constant('imagesLoaded', imagesLoaded);

angular.module('angular-images-loaded').directive('imagesLoaded', ['$timeout', 'imagesLoaded',
    function($timeout, imagesLoaded) {
        'use strict';
        return {
            restrict: 'AC',
            link: function(scope, element, attrs) {
                var events = scope.$eval(attrs.imagesLoaded) || scope.$eval(attrs.imagesLoadedEvents),
                    className = attrs.imagesLoadedClass || 'images-loaded',
                    classUsed = element.hasClass(className);

                var init = function() {
                    $timeout(function() {
                        scope.$imagesLoaded = false;

                        scope.$emit('imagesLoaded:started', {
                            scope: scope,
                            element: element
                        });

                        if (classUsed) {
                            element.addClass(className);
                        }

                        var imgLoad = imagesLoaded(element[0], function() {
                            scope.$imagesLoaded = true;

                            scope.$emit('imagesLoaded:loaded', {
                                scope: scope,
                                element: element
                            });

                            element.removeClass(className + ' images-loaded: ' + attrs.imagesLoaded + ';');

                            if (!scope.$$phase) {
                                scope.$apply();
                            }
                        });

                        if (typeof(events) !== undefined) {
                            angular.forEach(events, function(fn, eventName) {
                                imgLoad.on(eventName, fn);
                            });
                        }
                    });
                };

                if (attrs.imagesLoadedWatch) {
                    scope.$watch(attrs.imagesLoadedWatch, function(n) {
                        init();
                    });

                } else {
                    init();
                }
            }
        };
    }
]);
