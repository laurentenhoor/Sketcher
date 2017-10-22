import { Mongo } from 'meteor/mongo';
 
export const Sketches = new Mongo.Collection('sketches');

if(Meteor.isServer) {
    Meteor.publish('sketches', function(){
        return Posts.find({});
    });
}