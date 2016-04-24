# angular-images-loaded

Super simple Angular directive to wrap [imagesLoaded](https://github.com/desandro/imagesloaded) plugin.

[Demo](http://homerjam.github.io/angular-images-loaded/)

## Installation

`$ bower install angular-images-loaded`

or

`$ npm i -D angular-images-loaded`

## Usage

Remember to include `imagesloaded.pkgd.js` somewhere.

#### Add module to your app dependencies

	angular.module('yourModule', [..., 'hj.imagesLoaded']);

#### Register events in controller

	app.controller('MyCtrl', function($scope) {
		var ctrl = this;

    $scope.$on('imagesLoaded:loaded', function(event, element){
      console.log('loaded', element);
    });

		ctrl.imgLoadedEvents = {

			always: function(instance) {
				// Do stuff
			},

			done: function(instance) {
				angular.element(instance.elements[0]).addClass('loaded');
			},

			fail: function(instance) {
				// Do stuff
			}

		};

	});

#### Add directive to element

Note: If using class method then class will be removed on load - useful for css transitions etc.

	<div class="images-loaded" images-loaded-events="ctrl.imgLoadedEvents">

		<img src="kitten.jpg">

	</div>

	<div images-loaded="ctrl.imgLoadedEvents"
    images-loaded-watch="vm.image"
    images-loaded-options="{ background: true }">

		<div ng-style="{ backgroundImage: 'url(' + vm.image + ')' }">

	</div>
