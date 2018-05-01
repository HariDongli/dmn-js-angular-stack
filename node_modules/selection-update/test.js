'use strict';

var calculateUpdate = require('./index'),
    range = require('./index').range;

var expect = require('chai').expect;


var expectUpdate = function(desc, oldString, newString) {
  createTest(it, desc, oldString, newString);
};

expectUpdate.only = function(desc, oldString, newString) {
  createTest(it.only, desc, oldString, newString);
};


describe('selection-update', function() {

  describe('should handle select ALL', function() {

    expectUpdate('content removed from middle', '|AABBC|', 'AA|C');

    expectUpdate('content added in middle', '|AABBC|', 'AAVV|BBC');

  });


  describe('should handle same string update', function() {

    expectUpdate('keep mid selection', 'AABB|CCC', 'AABB|CCC');

    expectUpdate('keep start selection', '|AABBCCC', '|AABBCCC');

    expectUpdate('keep end selection', 'AABBCCC|', 'AABBCCC|');

  });


  describe('should handle empty string', function() {

    expectUpdate('content added', '|', 'AAA|');

  });

  describe('should modify cursor adding content', function() {

    expectUpdate('after cursor', 'AA|BBC', 'AABBCVV|');

    expectUpdate('directly after cursor', 'AA|BBC', 'AAVV|BBC');

    expectUpdate('before cursor', 'AA|BBC', 'VV|AABBC');

    expectUpdate('directly before cursor', 'AA|BBC', 'AAVV|BBC');

    expectUpdate('same string add', 'AA|', 'AAAA|');

    expectUpdate('same string add in middle', 'AAAT|F', 'AAATTT|F');

    expectUpdate('same string add in middle (2)', 'AAAT|TF', 'AAATTT|TF');

  });


  describe('should modify cursor removing content', function() {

    expectUpdate('after cursor', 'AA|BBVVC', 'AABB|C');

    expectUpdate('directly after cursor', 'AABB|VVC', 'AA|VVC');

    expectUpdate('before cursor', 'AAVVBB|C', 'AA|BBC');

    expectUpdate('directly before cursor', 'AABB|VVC', 'AA|VVC');

    expectUpdate('same string remove', 'AAAA|', 'AA|');

    expectUpdate('same string remove from middle', 'AAATTT|F', 'AAAT|F');

    expectUpdate('same string remove from middle (2)', 'AAATTT|TF', 'AAAT|TF');
  });


  describe('should handle replace', function() {

    expectUpdate('longer text', 'AA|BB', 'XXFFOOLL|');

    expectUpdate('shorter text', 'XXFFOO|LL', 'XX|AABB');

    expectUpdate('same length text, end selection', 'FOO|', 'BAR|');

  });

});


function createTest(it, desc, oldString, newString) {

  it('(' + oldString + ') => (' + newString + ') - ' + desc, function() {

    var oldStart, oldEnd;

    oldStart = oldString.indexOf('|');

    if (oldStart === -1) {
      throw new Error('no start cursor (|) in old string');
    }

    oldEnd = oldString.indexOf('|', oldStart + 1);

    if (oldEnd === -1) {
      oldEnd = oldStart;
    } else {
      oldEnd = oldEnd - 1;
    }

    oldString = oldString.replace(/\|/g, '');

    var newStart, newEnd;

    newStart = newString.indexOf('|');

    if (newStart === -1) {
      throw new Error('no start cursor (|) in new string');
    }

    newEnd = newString.indexOf('|', newStart + 1);

    if (newEnd === -1) {
      newEnd = newStart;
    } else {
      newEnd = newEnd - 1;
    }

    newString = newString.replace(/\|/g, '');

    // when
    var oldSelection = range(oldStart, oldEnd);
    var newSelection = calculateUpdate(oldSelection, oldString, newString);

    // then
    expect(newSelection).to.eql(range(newStart, newEnd));

  });
}