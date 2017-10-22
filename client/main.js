import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRoute from 'angular-route';

import { Random } from 'meteor/random'

import sketchCanvas from '../imports/components/sketchCanvas/sketchCanvas';
import sketchMenu from '../imports/components/sketchMenu/sketchMenu';

import { Sketches } from '../imports/api/sketches.js';


class MainController {

	constructor($rootScope, $scope, $routeParams, $location)  {

		$scope.$on('$routeChangeSuccess', function() {

			console.log($routeParams.canvasId);
			console.log(localStorage.getItem('canvasId'));
			
			var canvasId = $routeParams.canvasId;
			if (!canvasId) {
				canvasId = localStorage.getItem('canvasId');
				$location.url('/'+canvasId);
			}			
			console.log('found id from url or localStorage: '+canvasId)
			
			Meteor.call('canvasExists', canvasId, function(err, canvasExists) {
			
				if (canvasExists) {
					console.log('we found an existing canvas in the backend')	
				} else {
					canvasId = Random.id();
					console.log('canvasId created: '+ canvasId);
					
				}	

				localStorage.setItem('canvasId', canvasId);
				$rootScope.canvasId = canvasId
				
			}) 

		});

	}
}


angular.module('sketcher', [

	angularMeteor,
	angularRoute,

	sketchCanvas.name,
	sketchMenu.name,

	])

	.config(function($routeProvider, $locationProvider) {

		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');

		$routeProvider
		.when('/:canvasId', {
			controller : 'MainController'
		})
		.when('/', {
			controller : 'MainController'
		});	

	})

	.controller('MainController', ['$rootScope', '$scope','$routeParams', '$location', MainController]);

