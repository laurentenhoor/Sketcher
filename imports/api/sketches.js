import { Mongo } from 'meteor/mongo';
 
export const Sketches = new Mongo.Collection('sketches');

if(Meteor.isServer) {
    Meteor.publish('sketches', function(){
        return Sketches.find({});
    });
    
}

if (Meteor.isClient) {
	Meteor.subscribe('sketches', function() {
		return Sketches.find({});
	});
}

