import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRoute from 'angular-route';

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { Cookies } from 'meteor/ostrio:cookies';
import { Session } from 'meteor/session';

import sketchCanvas from '../imports/components/sketchCanvas/sketchCanvas';
import sketchMenu from '../imports/components/sketchMenu/sketchMenu';

import { Sketches } from '../imports/api/sketches.js';


angular.module('sketcher', [

	angularMeteor,
	angularRoute,

	sketchCanvas.name,
	sketchMenu.name,

	])

	.controller('MainController', ['$rootScope', '$scope', '$routeParams', '$location',
		function($rootScope, $scope, $routeParams, $location) {
		
		const cookies = new Cookies();
		
		$rootScope.creatorSession = Random.id();
		
		$scope.$on('$routeChangeSuccess', function() {

			console.log('from url: '+$routeParams.canvasId);
			console.log('from localStorage: '+localStorage.getItem('canvasId'));
			console.log('from cookies: '+cookies.get('canvasId'));
			
			var canvasId = $routeParams.canvasId || localStorage.getItem('canvasId') || cookies.get('canvasId');
			
			if (!$routeParams.canvasId) {
				$location.url('/'+canvasId);
				return;
			}
			
			console.log('found id from url, localStorage or cookie: ' + canvasId)
			
			
			Meteor.call('canvasExists', canvasId, function(err, canvasExists) {
			
				if (canvasExists) {
					
					console.log('we found an existing canvas in the backend')
					
				} else {
					
					console.log('canvasId does not exist in database')
					
					canvasId = localStorage.getItem('canvasId') || cookies.get('canvasId') || Random.id();
					Sketches.insert({canvasId: canvasId});
					
					console.log('canvasId created in database: '+ canvasId);
					
					$location.url('/'+canvasId);
					return;
					
				}
				
				localStorage.setItem('canvasId', canvasId);
				cookies.set('canvasId', canvasId);
				Session.set('canvasId', canvasId);
				
				$rootScope.canvasId = canvasId;
				console.log('active canvas: '+canvasId);
				
			});

		});
		
	}])
	
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');

		$routeProvider
		.when('/:canvasId', {
			controller : 'MainController'
		})
		.when('/', {
			controller : 'MainController'
		});	

	}]);