import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRoute from 'angular-route';

import sketchCanvas from '../imports/components/sketchCanvas/sketchCanvas';
import sketchMenu from '../imports/components/sketchMenu/sketchMenu';

angular.module('sketcher', [

	angularMeteor,
	angularRoute,

	sketchCanvas.name,
	sketchMenu.name,

	]);