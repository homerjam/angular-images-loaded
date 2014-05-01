angular.module('angular-images-loaded', []).directive('imagesLoaded', ['$timeout',
    function($timeout) {
        'use strict';
        return {
            restrict: 'AC',
            link: function(scope, element, attrs) {
                var events = scope.$eval(attrs.imagesLoaded);

                $timeout(function() {
                    var imgLoad = imagesLoaded(element[0], function() {
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
