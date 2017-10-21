import angular from 'angular';
import angularMeteor from 'angular-meteor';

import '../../../node_modules/literallycanvas/lib/js/literallycanvas-core';

import template from './sketchCanvas.html';


class SketchCanvasController {
	
	constructor() {
		
		LC.init(document.getElementsByClassName('my-drawing')[0],
				{imageURLPrefix: '/literallycanvas_img'}
		);
		
	}
	
}

export default angular.module('sketcher.sketchCanvas', [
  angularMeteor,
])
.component('sketchCanvas', {
	templateUrl : template,
	controller: [SketchCanvasController],
});