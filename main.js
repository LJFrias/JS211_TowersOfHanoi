'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // .pop() the last piece in the startStack .push() to the end of the endStack
  let piece = stacks[startStack].pop() //might be stacks[startStack].pop()

  stacks[endStack].push(piece)

}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // I can move a startStack value to an empty endStack value= true
    // is endStack is empty, stacks.endStack.length == 0
  // startStack value to an endStack value with a higher number= true
  // startStack value to an endStack value with a lower number = false
    // slice(-1) to grab the last element of an array
  // select a startStack that's empty = flase
    // if startStack is empty, stacks.startStack.length == 0
  // enter something besides a,b,c = false
    // if !a or !b or !c
  // this function should return true or flase

if (((startStack === "a")||(startStack === "b")||(startStack === "c")) && ((endStack === "a")||(endStack === "b")||(endStack === "c"))){

  if (stacks[startStack].length > 0) {

    if ((stacks[endStack].length == 0) || (stacks[startStack].slice(-1) < stacks[endStack].slice(-1))){
    return true
    }

    else {
      return false
    }

  }

else {
  return false
}

}

}


// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // if b array or c array = [4,3,2,1] you win
  // assume isLegal caught all wrong moves, and the array is in the correct order
  //so that means the game is over when b or c has 4 elements
    // (stacks["b"].length = 4) || (stacks["c"].length = 4)
  if ((stacks['b'].length == 4) || (stacks['c'].length == 4)) {
    console.log("You win!")
    return true
  } 

  else {
    return false
  }

}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // take in the two args
  // check if isLegal
    //if true, movePiece
    //if false, display error message
  // call checkForWin
    //if true, display win message
    //if false, keep playing
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack)
    checkForWin()
  }

  else {
    console.log("Illegal move, Try again")
  }
  
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
