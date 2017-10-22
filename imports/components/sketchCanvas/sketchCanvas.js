import angular from 'angular';
import angularMeteor from 'angular-meteor';

import * as LC from'../../../node_modules/literallycanvas/lib/js/literallycanvas-core';

import './literallycanvas.scss';
import './sketchCanvas.scss';

import template from './sketchCanvas.html';


class SketchCanvasController {
	
	constructor($rootScope) {
		
		$rootScope.tools = LC.tools;
		
		$rootScope.canvas = LC.init(document.getElementsByClassName('sketch-canvas')[0],
				{imageURLPrefix: '/literallycanvas_img'}
		);
		
	}
	
}

export default angular.module('sketcher.sketchCanvas', [
  angularMeteor,
])
.component('sketchCanvas', {
	templateUrl : template,
	controller: ['$rootScope', SketchCanvasController],
});