angular.module('ExampleCtrl', []).controller('ExampleCtrl', ['$scope',
    function($scope) {

        $scope.imgLoadedEvents = {

            always: function(instance) {
                // Do stuff
            },

            done: function(instance) {
                angular.element(instance.elements[0]).addClass('loaded');

                console.log('loaded');
            },

            fail: function(instance) {
                // Do stuff
            }

        };

    }
]);

angular.module('ExampleApp', ['angular-images-loaded', 'ExampleCtrl']).config(function() {});
