import { Meteor } from 'meteor/meteor';

import { Sketches } from '../imports/api/sketches.js';

Meteor.methods({
	
	canvasExists(canvasId) {
		if (Sketches.find({canvasId: canvasId}).count() > 0) {
			return true;
		}
		return false;
	},
	
	getLatestSketch(canvasId) {
		console.log('Loading canvas with id: ' + canvasId);
		var latestSketch = Sketches.findOne({canvasId: canvasId}, {sort: {createdAt: -1}, limit: 1});
		return latestSketch;
	}

});
