import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRoute from 'angular-route';

import angularMaterial from 'angular-material';
import angularMaterialStyle from '../node_modules/angular-material/angular-material.css';


import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { Cookies } from 'meteor/ostrio:cookies';

import sketchCanvas from '../imports/components/sketchCanvas/sketchCanvas';
import sketchMenu from '../imports/components/sketchMenu/sketchMenu';

import { Sketches } from '../imports/api/sketches.js';

import shortid from 'shortid';


class MainController {
	
	constructor($rootScope, $scope, $routeParams, $location, $reactive) {
	
		var $ctrl = this;
		$reactive($ctrl).attach($scope);		
		
		$ctrl.showLoader = true;
		
		const cookies = new Cookies();
		
		$rootScope.creatorSession = Random.id();
		
		$scope.$on('$routeChangeSuccess', function() {

			console.log('from url: '+$routeParams.canvasId);
			console.log('from localStorage: '+localStorage.getItem('canvasId'));
			console.log('from cookies: '+cookies.get('canvasId'));
			
			var canvasId = $routeParams.canvasId || localStorage.getItem('canvasId') || cookies.get('canvasId');
			
			if (!$routeParams.canvasId && (localStorage.getItem('canvasId') || cookies.get('canvasId'))) {
				$location.url('/'+canvasId);
				return;
			} else {
//				canvasId = shortid.generate();
			}
			
			console.log('found id from url, localStorage or cookie: ' + canvasId)
			
			
			Meteor.call('canvasExists', canvasId, function(err, canvasExists) {
			
				if (canvasExists) {
					
					console.log('we found an existing canvas in the backend')
					
				} else {
					
					console.log('canvasId does not exist in database')
					
					canvasId = localStorage.getItem('canvasId') || cookies.get('canvasId') || shortid.generate();
					
					$location.url('/'+canvasId);
//					return;
					
				}
				
				localStorage.setItem('canvasId', canvasId);
				cookies.set('canvasId', canvasId);
				
				$rootScope.canvasId = canvasId;
				console.log('active canvas: '+canvasId);
				
				
				loadCanvas();
				
			});

		});
		
		
		function loadCanvas() {
			
			Meteor.call('getLatestSketch', $rootScope.canvasId, function(err, latestSketch) {	
				
				console.log('getLatestSketch with id: ' + $rootScope.canvasId);
				
				console.log(latestSketch)
				if (latestSketch){
					console.log('update drawing')

					 $rootScope.canvas.loadSnapshot(JSON.parse(latestSketch.canvasData));
					 $ctrl.showLoader = false;
				
				}
				
			});
		}
		
		
		
	}
	
	
	
}


angular.module('sketcher', [

	angularMeteor,
	angularRoute,
	angularMaterial,

	sketchCanvas.name,
	sketchMenu.name,

	])
	.controller('MainController', ['$rootScope', '$scope', '$routeParams', '$location', '$reactive', MainController])
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
