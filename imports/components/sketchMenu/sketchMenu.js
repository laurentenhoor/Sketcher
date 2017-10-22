import angular from 'angular';
import angularMeteor from 'angular-meteor';

import angularMaterial from 'angular-material';
import angularMaterialStyle from '../../../node_modules/angular-material/angular-material.css';


import template from './sketchMenu.html';
import style from './sketchMenu.scss';


class SketcherMenuController {
	
	constructor($rootScope) {
		
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
		
		this.shareSketch = function() {
			
			alert('Coming soon!');
			
		}
		
	}
	
	
}

export default angular.module('sketcher.sketchMenu', [
  angularMeteor,
  angularMaterial,
])
.component('sketchMenu', {
	templateUrl : template,
	controller: ['$rootScope', SketcherMenuController ],
});