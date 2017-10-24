import angular from 'angular';
import angularMeteor from 'angular-meteor';

import angularMaterial from 'angular-material';
import angularMaterialStyle from '../../../node_modules/angular-material/angular-material.css';


import template from './sketchMenu.html';
import style from './sketchMenu.scss';


class SketcherMenuController {
	
	constructor($rootScope, $mdToast, $timeout) {
		
		this.isEraser = false;
		
		
		this.toggleTool = function() {
			
			this.isEraser = !this.isEraser;
			
			if (this.isEraser) {
				$rootScope.canvas.setTool(new $rootScope.tools.Eraser($rootScope.canvas));
				$rootScope.canvas.tool.strokeWidth = 30;
			} else {
				$rootScope.canvas.setTool(new $rootScope.tools.Pencil($rootScope.canvas));
				$rootScope.canvas.tool.strokeWidth = 5;
			}
				
		}
		
		this.clickMenu = function(event) {
			console.log(event);
//			event.target.
		}
		
		this.shareSketch = function() {
			
			console.log('shareSketch()')
			console.log($rootScope.canvas)
			
			try {
				
				
				
				var image = $rootScope.canvas.getImage().toDataURL('png');
//				var url = image.replace(/^data:image\/png;/, 'data:application/octet-stream;filename=whiteboard.png,');
				
				var link = document.createElement('a');
				link.download = 'instantwhiteboard.png';
		        link.href = image;
		        link.click();
		        document.body.removeChild(link);
//		        
//				window.open(image, '_self');
				
				
//				console.log(image)
//				console.log(url)
//				window.open(image);
				
				
			} catch(error) {
				console.log(error);
			}
			
		}
		
		this.clearSketch = function() {
			
			$rootScope.canvas.clear();
			
			$rootScope.canvas.trigger('drawEnd', {});

			$timeout(10, function() {
			});
			return;
			
			
		}
		
	}
	
	
}

export default angular.module('sketcher.sketchMenu', [
  angularMeteor,
  angularMaterial,
])
.component('sketchMenu', {
	templateUrl : template,
	controller: ['$rootScope', '$mdToast', '$timeout', SketcherMenuController ],
});