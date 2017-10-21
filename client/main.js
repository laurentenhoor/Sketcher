import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRoute from 'angular-route';
 
import sketchCanvas from '../imports/components/sketchCanvas/sketchCanvas';

angular.module('sketcher', [
  angularMeteor,
  angularRoute,
  sketchCanvas.name
]);