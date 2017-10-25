import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRoute from 'angular-route';

import angularMaterial from 'angular-material';
import angularMaterialStyle from '../node_modules/angular-material/angular-material.css';

import { Meteor } from 'meteor/meteor';

import sketchCanvas from '../imports/components/sketchCanvas/sketchCanvas';
import sketchMenu from '../imports/components/sketchMenu/sketchMenu';

import loginSessionService from '../imports/services/loginSessionService';

import { Sketches } from '../imports/api/sketches.js';


class MainController {
	
	constructor($rootScope, $routeParams, loginSessionService) {
		
		var $ctrl = this;
		$ctrl.showLoader = true;
		
		console.log(loginSessionService)

		$rootScope.$on('$routeChangeSuccess', function() {
			
			loginSessionService.login($routeParams.canvasId, function(canvasId) {
				
				loadCanvas(canvasId);
				
			});

		});
		
		function loadCanvas(canvasId) {
			
			Meteor.call('getLatestSketch', canvasId, function(err, latestSketch) {	
		
				$ctrl.showLoader = false;
				
				if (latestSketch){
					console.log('update drawing');
					 $rootScope.canvas.loadSnapshot(JSON.parse(latestSketch.canvasData));
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
	
	loginSessionService.name,

	])
	
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
		
	}])
	
	.controller('MainController', [
		'$rootScope', 
		'$routeParams',  
		'loginSessionService', 
		MainController
	])
