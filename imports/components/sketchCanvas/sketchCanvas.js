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
		
		$ctrl.showLoader = true;
		
		$ctrl.helpers({
			sketches() {       
				
				if (Meteor.subscribe('lastSketches', $rootScope.canvasId).ready()) {
					
					console.log('sketches helper');
					
					var amountOfPosts = Sketches.find({}).count()
					
					var newestSketch = Sketches.findOne({canvasId: $rootScope.canvasId},
							{sort: {createdAt: -1}, limit: 1}); 
//						frameId: {$ne : thisFrameId}}, 
					
					console.log(newestSketch)
					if (newestSketch){
						console.log('update drawing')
						updateDrawing(newestSketch);	
						previousFrameId = newestSketch.frameId;
						
					}
					return amountOfPosts;
					
				};
						
				
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
		     
		     
		     setOpenGraphHeaders();
		    
			  
			 console.log('insert Sketch, frameId: ' + thisFrameId);
			
		 });
		 
		 
		 function updateDrawing(sketch) {
			 
			 console.log('frameIdFromDb: ' + sketch.frameId)
			 console.log('previousFrameId: ' +previousFrameId)
			 console.log('thisFrameId: ' +thisFrameId)
			 
			 $ctrl.showLoader = false;
			 
			 if(sketch.frameId != thisFrameId && sketch.frameId != previousFrameId ) {
				 $rootScope.canvas.loadSnapshot(JSON.parse(sketch.canvasData));
				 return;
			 } else {
				 return;
			 }
			 
			 
			 
		 }
		
	}
}

export default angular.module('sketcher.sketchCanvas', [
  angularMeteor,
])
.component('sketchCanvas', {
	templateUrl : template,
	controller: ['$rootScope', '$scope', '$reactive', SketchCanvasController],
});