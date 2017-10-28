import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import { Random } from 'meteor/random'
import { Cookies } from 'meteor/ostrio:cookies';

const cookies = new Cookies();

import shortid from 'shortid';


class LoginSessionService {
	
	constructor($rootScope, $location) {
		return {
	        login: login
	    };
			
	    function login(canvasIdFromUrl, callback) {
	    	
	    	console.log('from url: '+canvasIdFromUrl);
			console.log('from localStorage: '+localStorage.getItem('canvasId'));
			console.log('from cookies: '+cookies.get('canvasId'));
			
			var canvasId = canvasIdFromUrl || localStorage.getItem('canvasId') || cookies.get('canvasId');
			
			if (!canvasIdFromUrl && (localStorage.getItem('canvasId') || cookies.get('canvasId'))) {
				$location.url('/'+canvasId);
				return;
			}
			
			console.log('found id from url, localStorage or cookie: ' + canvasId)
			
			Meteor.call('canvasExists', canvasId, function(err, canvasExists) {
			
				if (canvasExists) {
					
					console.log('we found an existing canvas in the backend')
					
				} else {
					
					console.log('canvasId does not exist in database')
					
					canvasId = localStorage.getItem('canvasId') || cookies.get('canvasId') || shortid.generate();
					
					$location.url('/'+canvasId);
					
					
				}
				
				localStorage.setItem('canvasId', canvasId);
				cookies.set('canvasId', canvasId);
				
				$rootScope.canvasId = canvasId;
				console.log('active canvas: '+canvasId);
				
				if (canvasId == 'undefined' || canvasId == undefined || canvasId == null) {
					canvasId = shortid.generate();
					$location.url('/'+canvasId);
				}
				
				callback(canvasId)
				
			});
	    	
	    }
	    
	    function newCanvas() {
	    	
	    		var canvasId = shortid.generate();
	    		cookies.set('canvasId', canvasId);
	    		$rootScope.canvasId = canvasId;
	    		$location.url('/'+canvasId);
	    	
	    }
	    
	}	
	
	static loginSessionFactory($rootScope, $location){
	    return new LoginSessionService($rootScope, $location);
	}

}

export default angular.module('sketcher.loginSessionService', [
	angularMeteor
	])
	
    .factory('loginSessionService', [
    	'$rootScope', 
    	'$location', 
    	LoginSessionService.loginSessionFactory
    	]);

