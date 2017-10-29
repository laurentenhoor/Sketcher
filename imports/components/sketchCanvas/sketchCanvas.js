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
])
.component('sketchCanvas', {
	templateUrl : template,
	controller: ['$rootScope', '$scope', '$reactive', SketchCanvasController],
});