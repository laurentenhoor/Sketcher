import angular from 'angular';
import angularMeteor from 'angular-meteor';

import * as LC from'../../../node_modules/literallycanvas/lib/js/literallycanvas-core';

import './literallycanvas.scss';
import './sketchCanvas.scss';

import template from './sketchCanvas.html';

import { Sketches } from '../../api/sketches.js';


class SketchCanvasController {
	
	constructor($rootScope) {
		
		$rootScope.tools = LC.tools;
		
		$rootScope.canvas = LC.init(document.getElementsByClassName('sketch-canvas')[0],
				{imageURLPrefix: '/literallycanvas_img'}
		);
		
		
		 $rootScope.canvas.on('drawingChange', function() {
			 
			 console.log(Sketches)
			 console.log('drawing changed')
		     Sketches.insert({
		    	 	canvasId : $rootScope.canvasId,
		    	 	canvasData: JSON.stringify($rootScope.canvas.getSnapshot())
		     });
			
		 });
		
	}
	
}

export default angular.module('sketcher.sketchCanvas', [
  angularMeteor,
])
.component('sketchCanvas', {
	templateUrl : template,
	controller: ['$rootScope', SketchCanvasController],
});