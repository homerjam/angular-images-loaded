angular.module('ExampleCtrl', [])
  .controller('ExampleCtrl', ['$scope',
    function ($scope) {
      var vm = this;

      var i = 0;
      var images = ['example/test.jpg', 'example/test2.jpg'];

      vm.image = images[i];

      vm.clickImage = function () {
        i++;
        if (i > 1) {
          i = 0;
        }

        vm.image = images[i];
      };

      $scope.$on('imagesLoaded:started', function(event, element){
        console.log('started', element);
      });

      vm.imageLoadedEvents = {
        always: function (instance) {
          // Do stuff
        },
        done: function (instance) {
          angular.element(instance.elements[0]).addClass('loaded');
          console.log('loaded');
        },
        fail: function (instance) {
          // Do stuff
        }
      };
    }
  ]);

angular.module('ExampleApp', ['hj.imagesLoaded', 'ExampleCtrl']);
