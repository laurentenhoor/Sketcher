import angular from 'angular';
import angularMeteor from 'angular-meteor';

import angularMaterial from 'angular-material';
import angularMaterialStyle from '../../../node_modules/angular-material/angular-material.css';

//import '../../../node_modules/literallycanvas/lib/js/literallycanvas-core';

import template from './sketchMenu.html';
import style from './sketchMenu.scss';


class SketcherMenuController {
	
	constructor($scope) {

		this.isEraser = false;
		
		this.toggleTool = function() {
			
			this.isEraser = !this.isEraser;			
			
		}
		
	}
	
}

export default angular.module('sketcher.sketchMenu', [
  angularMeteor,
  angularMaterial,
])
.component('sketchMenu', {
	templateUrl : template,
	controller: ['$scope', SketcherMenuController ],
});