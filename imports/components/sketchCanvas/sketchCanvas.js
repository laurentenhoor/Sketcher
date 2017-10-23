import angular from 'angular';
import angularMeteor from 'angular-meteor';

//import * as LC from'../../../node_modules/literallycanvas/lib/js/literallycanvas-core';
import * as LC from'../../lib/literallycanvas/literallycanvas-core-customized';

import './literallycanvas.scss';
import './sketchCanvas.scss';

import template from './sketchCanvas.html';

import { Sketches } from '../../api/sketches.js';


class SketchCanvasController {
	
	constructor($rootScope, $scope, $reactive) {
	
		
		$reactive(this).attach($scope);		 
		
		$rootScope.tools = LC.tools;

		
		this.helpers({
			sketches() {       
				var amountOfPosts = Sketches.find({}).count();
				
				var newestSketch = Sketches.findOne({}, {sort: {createdAt: -1, limit: 1}});
				console.log(newestSketch)
				if (newestSketch){
					updateDrawing(newestSketch.canvasData);	
				}
				return amountOfPosts;
			}
		});
		
		
		$rootScope.canvas = LC.init(document.getElementsByClassName('sketch-canvas')[0],
				{imageURLPrefix: '/literallycanvas_img'}
		);
		
		
		 $rootScope.canvas.on('drawEnd', function() {
			 
			 console.log(Sketches)
			 console.log('drawing changed')
			 
		     Sketches.insert({
		    	 
		    	 	canvasId : $rootScope.canvasId,
		    	 	canvasData: JSON.stringify($rootScope.canvas.getSnapshot()),
		    	 	createdAt: new Date(),
		    	 	
		     });
			
		 });
		 
		 
		 function updateDrawing(canvasData) {
			 
			 $rootScope.canvas.loadSnapshot(JSON.parse(canvasData), function(event){console.log(event)});
			 
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