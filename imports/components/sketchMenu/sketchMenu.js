import angular from 'angular';
import angularMeteor from 'angular-meteor';


import template from './sketchMenu.html';
import style from './sketchMenu.scss';


class SketcherMenuController {
	
	constructor($rootScope, $mdToast, $timeout) {
		
		$ctrl = this;
		
		
		$ctrl.setPen = function() {
			resetTools();
			$ctrl.isPen = true;
			
			$rootScope.canvas.setTool(new $rootScope.tools.Pencil($rootScope.canvas));
			$rootScope.canvas.setColor('primary', 'hsla(0, 0%, 0%, 0.8)');
			$rootScope.canvas.tool.strokeWidth = 2;
			
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
			$rootScope.canvas.tool.strokeWidth = 50;
			
		}
		
		function resetTools() {
			$ctrl.isEraser = false;
			$ctrl.isPen = false;
			$ctrl.isMarker = false;
		}
		
		
		$ctrl.shareSketch = function() {
			
			console.log('shareSketch()')
			console.log($rootScope.canvas)
			
			try {
				
				var image = $rootScope.canvas.getImage().toDataURL('png');
				
				var link = document.createElement('a');
				link.download = 'instantwhiteboard.png';
		        link.href = image;
		        link.click();
		
			} catch(error) {
				console.log(error);
			}
			
		}
		
		$ctrl.clearSketch = function() {
			
			$rootScope.canvas.clear();
			
			$rootScope.canvas.trigger('drawEnd', {});

			$timeout(10, function() {
			});
			return;

		}
		
		$ctrl.setPen();
		
	}
	
	
}

export default angular.module('sketcher.sketchMenu', [
  angularMeteor,
])
.component('sketchMenu', {
	templateUrl : template,
	controller: ['$rootScope', '$mdToast', '$timeout', SketcherMenuController ],
});