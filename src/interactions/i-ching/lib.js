'use strict';

import data from './data.js';
import { forOwn, filter, map, range, forEach, isArray, isInteger, clone, find, isEqual } from 'lodash';
import SeedRandom from 'seedrandom';

class Trigram {
  constructor(number) {
    assertValidTrigramNumber(number);
    forOwn(data.trigrams[number - 1], (value, key) => {
      this[key] = value;
    });
  }

  hexagrams(position) {
    if (position && !position == 'top' && !position == 'bottom') {
      throw new RangeError('position must be "top", "bottom", or undefined');
    }

    return filter(hexagrams, (h) => {
      return (h.topTrigram.number == this.number && (!position || position == 'top'))
          || (h.bottomTrigram.number == this.number && (!position || position == 'bottom'));
    });
  }
}

class Change {
  constructor(from, to) {
    if (!(from instanceof Hexagram)) {
      assertValidHexagramNumber(from);
      from = hexagram(from);
    }
    this.from = from;

    if (!(to instanceof Hexagram)) {
      assertValidHexagramNumber(to);
      to = hexagram(to);
    }
    this.to = to;

    let changeValue = parseInt(from.binary,2) ^ parseInt(to.binary,2); //xor
    this.binary = toBinaryString(changeValue);
    this.changingLines = map(this.binary, (char) => {
      return parseInt(char);
    }).reverse();
  }
}

class Hexagram {
  constructor(number) {
    assertValidHexagramNumber(number);
    forOwn(data.hexagrams[number - 1], (value, key) => {
      if (key == 'topTrigram') {
        this.topTrigram = trigram(value);
      }
      else if (key == 'bottomTrigram') {
        this.bottomTrigram = trigram(value);
      }
      else if (key == 'lines') {
        this[key] = value;
      }
      else {
        this[key] = value;
      }
    });
  }

  changeTo(number) {
    assertValidHexagramNumber(number);
    if (this.number == number) {
      return null;
    }
    let h2 = hexagram(number);
    return new Change(this, h2);
  }

  changeLines(lines) {
    if (!isArray(lines) || lines.length != 6) {
      throw new RangeError('lines argument must be an array of 6 zeros and ones representing chaning lines');
    }

    // find the binary of the other hexagram
    let otherBinary = '';
    // reverse the lines to process the most significant bit first
    // so that otherBinary string concatenation has MSB at the beginning of the string
    let changingLines = lines.reverse();
    let thisLines = clone(this.lines).reverse();
    forEach(thisLines, (l,i) => {
      if (!isInteger(l) || l < 0 || l > 1) {
        throw new RangeError('lines argument must be an array of 6 zeros and ones representing chaning lines');
      }
      otherBinary += (l ^ changingLines[i]).toString(); // xor
    });

    if (otherBinary == this.binary) {
      // no change
      return null;
    }

    let otherHexagram = find(hexagrams, (h) => {
      return h.binary == otherBinary;
    });

    return new Change(this.number, otherHexagram.number);
  }

  get changes() {
    if (!this._changes) {
      this._changes = _(range(1,65))
      .map((h2) => {
        return new Change(this, h2);
      }).remove((c, i, a) => {
        return (c.binary != '000000'); //remove hexagram change to itself
      }).value();
    }
    return this._changes;
  }
}

class Reading {
  constructor(question) {
    var rng = new SeedRandom(question, {entropy:true});

    let hexagramLines = [];
    let changingLines = [];
    for (let l = 1; l <= 6; l++) {
      let line = generateLine();
      switch(line) {
        // if the sum is 9, the so-called old yang - this becomes a positive line that moves.
        case 9:
          hexagramLines.push(1);
          changingLines.push(1);
          break;

        // if the sum is 8, the so-called young yin - this becomes a negative line that is at rest.
        case 8:
          hexagramLines.push(0);
          changingLines.push(0);
          break;

        // if the sum is 7, the so-called young yang - this becomes a positive line that is at rest.
        case 7:
          hexagramLines.push(1);
          changingLines.push(0);
          break;

        // if the sum is 6, the so-called old yin - this becomes a negative line that moves.
        case 6:
          hexagramLines.push(0);
          changingLines.push(1);
          break;

        default:
          // should never go here
          throw 'unknown line: ' + line;
      }
    };

    this.hexagram = find(hexagrams, (h) => {
      return isEqual(h.lines, hexagramLines);
    });
    if (!this.hexagram) {
      // this should never happen since all possible combination of lines are
      // represented in the array of 64 hexagrams
      throw 'no reading could be obtained'
    }

    // will be null if changingLines == [0,0,0,0,0,0]
    this.change = this.hexagram.changeLines(changingLines);

    // generates a single line of the hexagram by performing
    // three operations of the yarrow stalks as described in Wilhelm.
    function generateLine() {
      let numStalks = 49;

      // perform 3 operations with the yarrow sticks and sum the results.
      let lineSum = 0;
      for (let c = 1; c <= 3; c++) {
        let composite = generateComposite(numStalks);
        numStalks -= composite.stalksUsed;
        lineSum += composite.number;
      };

      return lineSum;
    }

    // performs a single operation of the yarrow stalks as described in Wilhlm
    // using the random number generator seeded from the question. The method
    // returns a "composite" object containing the result.
    function generateComposite(numStalks) {

      // minimum left size is 4, minimum right size is 5
      let leftPileSize = Math.ceil(rng() * (numStalks - 9) + 4);
      let rightPileSize = numStalks - leftPileSize;

      // take one stalk from right pile and put it between the
      // ring and little fingers of the left hand.
      rightPileSize -= 1;
      let stalksUsed = 1;

      // take bundles of 4 from the left pile until 4 or fewer remain.
      // place between the middle and ring fingers of the left hand.
      let r = getRemainder(leftPileSize);
      leftPileSize -= r;
      stalksUsed += r;

      // take bundles of 4 from the right pile until 4 or fewer remain.
      // place between the middle and ring fingers of the left hand.
      r = getRemainder(rightPileSize);
      rightPileSize -= r;
      stalksUsed += r;

      let composite = {
        stalksUsed: stalksUsed
      };

      switch(stalksUsed) {
        // if at first count 9 stalks are left over, they count as 2.
        // the 8 counts as 2
        case 9:
        case 8:
          composite.number = 2;
          break;

        // if 5 are left, they count as 3
        // the 4 counts as 3
        case 5:
        case 4:
          composite.number = 3;
          break;

        default:
          // this is not supposed to happen according to Wilhelm
          throw 'unknown number = ' + number;
      }

      return composite;

      function getRemainder(pileSize) {
        let r = pileSize % 4;
        if (r == 0) {
          r = 4;
        }

        return r;
      }
    }
  }
}

function assertValidTrigramNumber(number) {
  if (!isInteger(number) || number < 1 || number > 8) {
    throw new RangeError('number must be an integer between 1 and 8');
  }
}

function assertValidHexagramNumber(number) {
  if (!isInteger(number) || number < 1 || number > 64) {
    throw new RangeError('number must be an integer between 1 and 64');
  }
}

function toBinaryString(i) {
  return pad((i >>> 0).toString(2), 6);
}

function pad(num, size) {
  var s = num.toString();
  while (s.length < size) s = '0' + s;
  return s;
}

const trigram = (number) => {
  assertValidTrigramNumber(number);
  return trigrams[number - 1];
};

const hexagram = (number) => {
  assertValidHexagramNumber(number);
  return hexagrams[number - 1];
};

const trigrams = map(range(1,9), (n) => {
  return new Trigram(n);
});

const hexagrams = map(range(1,65), (n) => {
  return new Hexagram(n);
});

export const ask = (question) => {
  return new Reading(question);
};
