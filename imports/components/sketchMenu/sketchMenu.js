import angular from 'angular';
import angularMeteor from 'angular-meteor';


import template from './sketchMenu.html';
import style from './sketchMenu.scss';

import { Cookies } from 'meteor/ostrio:cookies';
const cookies = new Cookies();
import shortid from 'shortid';


class SketcherMenuController {
	
	constructor($rootScope, $mdToast, $timeout, $location) {
		
		$ctrl = this;
		
		
		$ctrl.setPencil = function() {
			resetTools();
			$ctrl.isPencil = true;
			
			$rootScope.canvas.setTool(new $rootScope.tools.Pencil($rootScope.canvas));
			$rootScope.canvas.setColor('primary', 'hsla(0, 0%, 0%, 0.3)');
			$rootScope.canvas.tool.strokeWidth = 2;
			
		}
		$ctrl.setPencil();
		
		$ctrl.setPen = function() {
			resetTools();
			$ctrl.isPen = true;
			
			$rootScope.canvas.setTool(new $rootScope.tools.Pencil($rootScope.canvas));
			$rootScope.canvas.setColor('primary', 'hsla(0, 0%, 0%, 0.7)');
			$rootScope.canvas.tool.strokeWidth = 3;
			
		}
		
		
		$ctrl.setMarker = function() {
			resetTools();
			$ctrl.isMarker = true;
			
			
			$rootScope.canvas.setTool(new $rootScope.tools.Pencil($rootScope.canvas));
			$rootScope.canvas.setColor('primary', 'hsla(0, 0%, 0%, 0.3)');
			$rootScope.canvas.tool.strokeWidth = 23;

		}
		
		$ctrl.setEraser = function() {
			resetTools();
			$ctrl.isEraser = true;
			$rootScope.canvas.setTool(new $rootScope.tools.Eraser($rootScope.canvas));
			$rootScope.canvas.tool.strokeWidth = 33;
			
		}
		
		function resetTools() {
			$ctrl.isEraser = false;
			$ctrl.isPen = false;
			$ctrl.isMarker = false;
			$ctrl.isPencil = false;
		}
		
		
		$ctrl.shareSketch = function() {
			
			console.log('shareSketch()')
			console.log($rootScope.canvas)
			
			try {
				
				var image = $rootScope.canvas.getImage().toDataURL('png');
				
				var link = document.createElement('a');
				link.download = 'ScreenSketch'+$rootScope.canvasId+'.png';
		        link.href = image;
		        link.click();
		
			} catch(error) {
				console.log(error);
			}
			
		}
		
		$ctrl.clearSketch = function() {
		
			
			$rootScope.canvas.clear();

			
			var canvasId = shortid.generate();
			console.log(canvasId)
			
	    		localStorage.setItem('canvasId', canvasId);
			cookies.set('canvasId', canvasId);
	    		$rootScope.canvasId = canvasId;
	    		$location.url('/'+canvasId);
	    	

			$timeout(10, function() {
			});
			return;

		}
		
		$ctrl.undoSketch = function() {
			
			$rootScope.canvas.undo();
			$rootScope.canvas.trigger('drawEnd', {});
		}
		
		$ctrl.setPencil();
		
	}
	
	
}

export default angular.module('sketcher.sketchMenu', [
  angularMeteor, 
])
.component('sketchMenu', {
	templateUrl : template,
	controller: ['$rootScope', '$mdToast', '$timeout', '$location', SketcherMenuController ],
});