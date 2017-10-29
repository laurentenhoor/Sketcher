import angular from 'angular';
import angularMeteor from 'angular-meteor';

//import * as LC from'../../../node_modules/literallycanvas/lib/js/literallycanvas-core';
import * as LC from'../../lib/literallycanvas/literallycanvas-core-customized';

import './literallycanvas.scss';
import './sketchCanvas.scss';

import sizeof from 'object-sizeof';

import template 	from './sketchCanvas.html';

import { Sketches } from '../../api/sketches.js';
import { Random } from 'meteor/random';


import angularHammer from 'angular-hammer';


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
		
		$ctrl.undoSketch = function() {
			// first erase the artifacts due to the double tap,
			$rootScope.canvas.undo();
			$rootScope.canvas.undo();
			// then remove the previous action
			$rootScope.canvas.undo();
		}
		
			
		$rootScope.canvas = LC.init(document.getElementsByClassName('sketch-canvas')[0], {
			imageURLPrefix: '/literallycanvas_img',
			primaryColor: 'hsla(0, 0%, 0%, 0.3)'
			}
		);
		
		
		 $rootScope.canvas.on('drawEnd', function() {
			 
//			 console.log('drawEnd Event')
			 
			 thisFrameId = Random.id();
			 
			 var snapShotObject = {
			    	 	canvasId : $rootScope.canvasId,
			    	 	canvasData: JSON.stringify($rootScope.canvas.getSnapshot()),
			    	 	frameId: thisFrameId
			     }
		     Sketches.insert(snapShotObject);
		     
//			 console.log('insert Sketch, frameId: ' + thisFrameId);
//			 console.log('filesize: ' + Math.ceil(sizeof(snapShotObject)/1000) + 'KB')
			
		 });

		
	}
}

export default angular.module('sketcher.sketchCanvas', [
  angularMeteor,
  angularHammer,
])
.component('sketchCanvas', {
	templateUrl : template,
	controller: ['$rootScope', '$scope', '$reactive', SketchCanvasController],
});