import angular from 'angular';
import angularMeteor from 'angular-meteor';

//import * as LC from'../../../node_modules/literallycanvas/lib/js/literallycanvas-core';
import * as LC from'../../lib/literallycanvas/literallycanvas-core-customized';

import './literallycanvas.scss';
import './sketchCanvas.scss';

import template 	from './sketchCanvas.html';

import { Sketches } from '../../api/sketches.js';
import { Random } from 'meteor/random'


class SketchCanvasController {
	
	constructor($rootScope, $scope, $reactive) {
		
		var $ctrl = this;
		$reactive($ctrl).attach($scope);		 
		
		$rootScope.tools = LC.tools;
		
		var thisFrameId; 
		var previousFrameId;
		
		
		
		$ctrl.helpers({
			sketches() {       
						
			}
		});
		
			
		$rootScope.canvas = LC.init(document.getElementsByClassName('sketch-canvas')[0],
				{imageURLPrefix: '/literallycanvas_img'}
		);
		
		
		 $rootScope.canvas.on('drawEnd', function() {
			 
			 console.log('drawEnd Event')
			 
			 thisFrameId = Random.id();
		     Sketches.insert({
		    	 	canvasId : $rootScope.canvasId,
		    	 	canvasData: JSON.stringify($rootScope.canvas.getSnapshot()),
		    	 	frameId: thisFrameId
		     });
		     
		   
			 console.log('insert Sketch, frameId: ' + thisFrameId);
			
		 });
		 
		 

		
	}
}

export default angular.module('sketcher.sketchCanvas', [
  angularMeteor,
])
.component('sketchCanvas', {
	templateUrl : template,
	controller: ['$rootScope', '$scope', '$reactive', SketchCanvasController],
});