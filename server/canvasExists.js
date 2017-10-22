import { Sketches } from '../imports/api/sketches.js';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
	
	canvasExists(canvasId) {
		
		if (Sketches.find({canvasId: canvasId}).count() > 0) {
			return true;
		}
		return false;
		
	}

});
