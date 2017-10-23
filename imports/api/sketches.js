import { Mongo } from 'meteor/mongo';

export const Sketches = new Mongo.Collection('sketches');

if(Meteor.isServer) {

	Meteor.publish('lastSketches', function(canvasId){
			return Sketches.find({canvasId: canvasId}, {sort: {createdAt: -1}, limit: 1});
	    });
    
}

