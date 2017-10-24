import { Mongo } from 'meteor/mongo';

export const Sketches = new Mongo.Collection('sketches');

Sketches.before.insert(function (userId, doc) {

	if(Meteor.isServer) {
		//Format the document
		doc.createdAt = Date.now();
		doc.updatedAt = Date.now();
	}
});

if(Meteor.isServer) {

	Meteor.publish('lastSketches', function(canvasId){
		return Sketches.find({canvasId: canvasId}, {sort: {createdAt: -1}, limit: 1});
	});
    
}

