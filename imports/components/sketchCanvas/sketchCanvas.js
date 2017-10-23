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
		
		$reactive(this).attach($scope);		 
		
		$rootScope.tools = LC.tools;
		
		var thisSessionId = Random.id(); 
		
		this.helpers({
			sketches() {       
				
				if (Meteor.subscribe('lastSketches', $rootScope.canvasId).ready()){
					
					console.log('sketches helper');
					
					var amountOfPosts = Sketches.find({}).count()
					
					var newestSketch = Sketches.findOne({canvasId: $rootScope.canvasId, 
						thisSessionId: {$ne : thisSessionId}}, 
						{sort: {createdAt: -1}, limit: 1});
					
					console.log(newestSketch)
					if (newestSketch){
						console.log('update drawing')
						updateDrawing(newestSketch.canvasData);	
					}
					return amountOfPosts;
					
				};
						
				
			}
		});
		
		
		$rootScope.canvas = LC.init(document.getElementsByClassName('sketch-canvas')[0],
				{imageURLPrefix: '/literallycanvas_img'}
		);
		
		
		 $rootScope.canvas.on('drawEnd', function() {
			 
			 console.log('drawing changed')
			 
		     Sketches.insert({
		    	 	canvasId : $rootScope.canvasId,
		    	 	canvasData: JSON.stringify($rootScope.canvas.getSnapshot()),
		    	 	thisSessionId: thisSessionId
		     });
			 
			 
			
		 });
		 
		 
		 function updateDrawing(canvasData) {
			 
			 $rootScope.canvas.loadSnapshot(JSON.parse(canvasData));
			 
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