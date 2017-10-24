/* eslint-env mocha */
 
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
 
import { Sketches } from './sketches.js';
 
if (Meteor.isServer) {
  describe('Sketches', () => {
    describe('methods', () => {
      
    	const canvasId = Random.id();
      let sketchId;
 
      beforeEach(() => {
        Sketches.remove({});
        sketchId = Sketches.insert({
        		canvasId: canvasId,
        		canvasData: {tool:'test', data:[1,2,3,4]},
        		createdAt: new Date(),
        });
      });
 
      it('can insert a sketch', () => {
    	      // Verify that the method does what we expected
          assert.equal(Sketches.find({canvasId: canvasId}).count(), 1);
      });
      
      
      
      
    });
  });
}