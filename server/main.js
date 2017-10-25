import { Meteor } from 'meteor/meteor';
import { Sketches } from '../imports/api/sketches.js';


Meteor.startup(() => {
  // code to run on server at startup
	
	Sketches.remove({canvasId: 'undefined'});
	Sketches.remove({canvasId: ''});
	Sketches.remove({canvasId: null});

});