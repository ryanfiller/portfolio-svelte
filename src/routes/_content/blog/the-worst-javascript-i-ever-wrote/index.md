---
title: The Worst JavaScript I Ever Wrote
banner:
  src: '/images/dry-spaghetti-noodles.jpeg'
  alt: 'dry spaghetti noodles'
  attribution: 'Virginia Marinova, unsplash.com'
options:
  published: true
meta:
  date: 2024-11-22
  excerpt: Revisiting some code I wrote for a job interview in 2018.
  categories:
    - code
  tags:
    - javascript
    - career development
---

My journey to writing code is a funny thing. I went to school for graphic design, did that for a few years and never felt like I was very good at it, and eventually learned code on the job until someone let me become a full time developer. When that actually happened is a little fuzzy, GitHub has me joining and making my first commit in [May 2016](https://github.com/ryanfiller?tab=overview&from=2016-11-01&to=2016-11-30), LinkedIn has me officially switching job titles in [July 2017](https://www.linkedin.com/in/ryanfiller/details/experience/). Either way, I've been doing this professionally for quite a while now and the thing is... I still don't feel like I'm good at it.

Partially to make myself feel better, and partially so anyone else currently struggling can look at this example, I thought it would be fun (and a little encouraging to myself) to look at what I think is the worst code I ever wrote that _technically_ still worked.

In spring 2018 after having been at my current company for a little over three years I started to look for jobs, and I made it far enough to get a technical interview with a coding test. There were three problems, two of which I was pretty comfortable solving, and one of which I just did my best with what I knew at the time. 

## The Code Test

The code exercise had these parameters:

```
2. Longest Increasing Sequence.

/**
 * @description Finds the longest increasing sequence from a given array of integers. A sequence in
 * an array is increasing when each non-last value is followed by a value that is greater than the
 * previous value. If there are multiple contenders of the same length, returns the first occurring
 * sequence. If no increasing sequence of length 2 or greater is found, returns an empty array.
 * Does not mutate array parameter.
 *
 * @param {number[]} seq  An array of integers
 * @returns {number[]} The longest increasing sequence of `seq`
 *
 * @example
 *  longestIncrSequence([1]);
 *  // returns []
 * @example
 *  longestIncrSequence([3, 4, 1, 2]);
 *  // return [3, 4]
 * @example
 *  longestIncrSequence([3, 0, 2, 2, 5, -43, -1, 0, 11, 9, 10]);
 *  // returns [-43, -1, 0, 11]
 *
 */
```

I know how to do this, in English, just not quite in code.
 1. accept a sequence of numbers, loop through them one by one
 2. if the current number was bigger than the previous number add it to a list, otherwise start over with an new list
 3. count the length of all the lists, return whichever was longest

After two full after work nights of trying, I sent this email at 11:51 pm —

> Here's what I came up with for the exercises. 1 and 3 were pretty straightforward, but 2 kind of got me. I managed to figure something out but I know it's not the ideal solution.

```javascript
function longestIncrSequence(seq) {
  let list = []; 

  seq.map((value, i) => {
    if (list.length === 0) {
      list.push(value);
    } else {
      if (value > seq[i-1]) {
        list.push(value);
      } else {
        list.push('break');
        list.push(value);
      }
    }
  });

  var string = list.toString();

  var sequences = string.split(',break,');

  var sequencesArray = [];

  sequences.map((i) => {
    sequencesArray.push(i.split(','));
  });

  var longest = '';

  sequencesArray.map((value, i) => {
if (longest === '') {
  longest = value; 
  } else if (value.length > sequencesArray[i-1].length) {
  longest = value;
  }
  });

  var answer = longest.length >= 2 ? longest : [];

  return answer;
};
```

The person interviewing me and reviewing this code test was very nice, but I did not get this job.

## What I Was Trying To Do...

Alright, so lets break down what it seems like I was thinking at the time and also what feedback I can give to past me.

```javascript
function longestIncrSequence(seq) {
  let list = []; 
}
```

First of all, I can tell how long ago this was because I was using abbreviations like `incr` and `seq` instead of full, more clear words like `incrementing` and `sequence` that I would choose now. I also don't use semicolons anymore, but that one doesn't matter as much.

We've got a function that accepts a single argument of the given sequence and then sets up a `list`. It looks like I went with `let` here, probably because I know I'd be changing this value as time we on, but since all I ever do is `.push` to this array rather than reassign it I should have used a `const`.

```javascript {5-16}
function longestIncrSequence(seq) {
  let list = []; 

  seq.map((value, i) => {
    if (list.length === 0) {
      list.push(value);
    } else {
      if (value > seq[i-1]) {
        list.push(value);
      } else {
        list.push('break');
        list.push(value);
      }
    }
  });
}
```

Here we have na array `.map` method that doesn't return anything and a cool, nested pair of `if...else` statements. The first `if` condition checks if have have anything in our `list`, and if we don't we add the first value. If we already have a `list` going we move into the next conditional, which checks if our current value is greater than the one preceding it. If it is we add it to our list, if it isn't we... push a string of the word `"break"` and _then_ the value, which signifies that we've now broken our incrementing sequence in the argument array.

Ignoring that nowadays I almost always use a full `index` instead of just `i`, the firs thing I would tell myself is that this doesn't need to a be a `.map` function if we're not going to do anything with the new array the method returns. I don't even think this new array has any values in it since I never returned from my function. Secondly, I guess it's technically correct to make sure the array isn't empty before trying to reference its value at `[i-1]`, but there's no harm in not doing that if it means avoiding an `if...else` inside an `if...else`. `value > seq[i-1]` where `seq[i-1]` equates to `undefined` still returns `false` and the rest of the logic of the function still executes the same.

```javascript {18-26}
function longestIncrSequence(seq) {
  let list = []; 

  seq.map((value, i) => {
    if (list.length === 0) {
      list.push(value);
    } else {
      if (value > seq[i-1]) {
        list.push(value);
      } else {
        list.push('break');
        list.push(value);
      }
    }
  });

  var string = list.toString();

  var sequences = string.split(',break,');

  var sequencesArray = [];

  sequences.map((i) => {
    sequencesArray.push(i.split(','));
  });
}
```

Now _this_ is where this starts to get really neat. So far I have a `list` array that contains every sequence of numbers from the original array where the values are increasing delineated by a string of the word `"break"`. I knew I needed to split this one long array into as many smaller ones and count the longest of them, but I couldn't even tell you what I didn't know that I didn't know that made me `.toString()` the entire array and then explode it anywhere it contained the `"break"` word. Just for reference, here's what this code is actually doing if we pass in one of the test arrays.

```javascript
// function longestIncrSequence([3, 0, 2, 2, 5, -43, -1, 0, 11, 9, 10])

var string = list.toString();
// string = "3,break,0,2,break,2,5,break,-43,-1,0,11,break,9,10"

var sequences = string.split(',break,');
// sequences = ["3", "0,2", "2,5", "-43,-1,0,11", "9,10"]

var sequencesArray = [];

sequences.map((i) => {
    sequencesArray.push(i.split(','));
});

// sequencesArray = [[ "3" ], [ "0", "2" ], [ "2", "5" ], [ "-43", "-1", "0", "11" ], [ "9", "10" ]]
```

That code is pretty bad, I'm randomly using `var` now, still using `.map` and not returning anything, and doing some really unnecessary type coercion used to construct a two dimensional array.

```javascript {37-40}
function longestIncrSequence(seq) {
  let list = []; 

  seq.map((value, i) => {
    if (list.length === 0) {
      list.push(value);
    } else {
      if (value > seq[i-1]) {
        list.push(value);
      } else {
        list.push('break');
        list.push(value);
      }
    }
  });

  var string = list.toString();

  var sequences = string.split(',break,');

  var sequencesArray = [];

  sequences.map((i) => {
   sequencesArray.push(i.split(','));
  });

  var longest = '';

  sequencesArray.map((value, i) => {
    if (longest === '') {
      longest = value; 
    } else if (value.length > sequencesArray[i-1].length) {
      longest = value;
    }
  });

  var answer = longest.length >= 2 ? longest : [];

  return answer;
};
```

And then the final part just checks to see if our longest array is 2 or more items, returns the array if it is and returns and empty one if it isn't. I actually don't have a lot of criticism for myself here other than I should have used `const`, or just returned the value rather than assigning it to a variable at all, and that some people might rather see an `if...else` than a ternary.

And just for the record, this does actually return all of the expected answers from the outline.

## How I Would Write This Now

Obviously there's room for improvement, and I know I'm poking a bit of fun at my younger self here, but I did want to take a break and say I'm proud of me for not only putting myself out there and getting this far in the interview process in the first place but also for finding _a_ solution to the problem and submitting it back even though I clearly knew I didn't know what I was doing. 

There's probably lots of ways to solve this problem, but I'm going to do my best to stick to the same thought process I had back then and also not use any newer `Array` methods that didn't exist in 2018.

So first things first...

```javascript {1-9}
function longestIncrementingSequence(sequence) {
  if (!Array.isArray(sequence)) {
    throw new Error(`\`sequence\` must be of type \`Array\`, received ${typeof sequence} instead`)
  }

  let longestFound = []

  return longestFound
}
```

I don't think I was on the wrong track here, we're going to return a array so we need to define one. I know I said before that this probably should have been defined with a `const` rather than a `let` but I'll explain that in a second. The specs didn't mention this either, but if I were trying to impress a potential new job now I would throw in some error handling for free.

```javascript {7-17}
function longestIncrementingSequence(sequence) {
  if (!Array.isArray(sequence)) {
    throw new Error(`\`sequence\` must be of type \`Array\`, received ${typeof sequence} instead`)
  }

  let longestFound = []
  let lastIncreasingSequence = []
  
  sequence.forEach((number, index) => {
    if (typeof number !== 'number') {
      throw new Error(`all \`sequence\` values must be of type 'number', received ${typeof number} at index ${index}`)
    }

    if (index === 0) {
      lastIncreasingSequence.push(number)
    }
  })

  return longestFound
}
```

The first big difference is that rather than trying to keep track of everything in one long array, lets set up a second to track our currently incrementing sequence. I still need to use a loop to go through ever one of the original numbers, but since I only need to perform an operation on them and not return a new, transformed array I'll use a `.forEach` instead of a `.map`. Rather than nest an `if` statement inside of another one, if we know we're on the first values of our `sequence` argument we'll just add it. And again, a little bit of error handling just to be nice.

```javascript {14}
function longestIncrementingSequence(sequence) {
  if (!Array.isArray(sequence)) {
    throw new Error(`\`sequence\` must be of type \`Array\`, received ${typeof sequence} instead`)
  }

  let longestFound = []
  let lastIncreasingSequence = []
  
  sequence.forEach((number, index) => {
    if (typeof number !== 'number') {
      throw new Error(`all \`sequence\` values must be of type 'number', received ${typeof number} at index ${index}`)
    }

    if (index === 0 || number > sequence[index - 1]) {
      lastIncreasingSequence.push(number)
    }
  })

  return longestFound
}
```

This is pretty much the same logic as before, "if the current number is larger than the previous one, add it to the array." I do just want to point out that rather than `sequence[index - 1]`, this could take advantage of the new [`Array.at()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at) and called `current.at(-1)` to get the last item, but this wasn't added to browsers until 2022.

```javascript {16, 19-23}
function longestIncrementingSequence(sequence) {
  if (!Array.isArray(sequence)) {
    throw new Error(`\`sequence\` must be of type \`Array\`, received ${typeof sequence} instead`)
  }

  let longestFound = []
  let lastIncreasingSequence = []
  
  sequence.forEach((number, index) => {
    if (typeof number !== 'number') {
      throw new Error(`all \`sequence\` values must be of type 'number', received ${typeof number} at index ${index}`)
    }

    if (index === 0 || number > sequence[index - 1]) {
      lastIncreasingSequence.push(number)
      return 
    }

    if (lastIncreasingSequence.length > longestFound.length) {
      longestFound = lastIncreasingSequence
    }

    lastIncreasingSequence = [number]
  })

  return longestFound
}
```

This is where the function really starts to go in a better direction than the first iteration. To avoid nesting `if` statements I'm using an early `return` if the number is bigger than the previous. If the number is _not_ larger we'll get past that and into the next check, which is if the sequence we are currently pushing to is larger than the longest array we've found yet. If it isn't we leave things alone, but if it is than our new `longestFound` array becomes our `lastIncreasingSequence` array. And since we're past that `return` that means our current number was smaller than its predecessor so we'll reset the current array to it and start counting up again on the next loop. This is where using `let longestFound` becomes important, because if `lastIncreasingSequence` is bigger I'm actually going to reassign it this time.


```javascript {26-32}
function longestIncrementingSequence(sequence) {
  if (!Array.isArray(sequence)) {
    throw new Error(`\`sequence\` must be of type \`Array\`, received ${typeof sequence} instead`)
  }

  let longestFound = []
  let lastIncreasingSequence = []
  
  sequence.forEach((number, index) => {
    if (typeof number !== 'number') {
      throw new Error(`all \`sequence\` values must be of type 'number', received ${typeof number} at index ${index}`)
    }

    if (index === 0 || number > sequence[index - 1]) {
      lastIncreasingSequence.push(number)
      return 
    }

    if (lastIncreasingSequence.length > longestFound.length) {
      longestFound = lastIncreasingSequence
    }

    lastIncreasingSequence = [number]
  })

  if (lastIncreasingSequence.length >= 2 && lastIncreasingSequence.length > longestFound.length) {
    return lastIncreasingSequence
  } else if (longestFound.length >= 2) {
    return longestFound
  } else {
    return []
  }
}
```

The last logic to work out is just to decide what to return. If the last sequence we tracked has 2 or more items and is longer than the previously found longest, return it. Otherwise if it isn't, return the longest one also if it has 2 or more items. If neither list is longer than 2, return an empty array.

## Something I Still Missed

Upon reworking this code, I found something interesting that I didn't account for either time I tried this, and in fact just got lucky that it happened to work both times.

> If there are multiple contenders of the same length, returns the first occurring sequence.

That means that in the example of `[3, 4, 1, 2]` the requirements are to return `[3, 4]` even though `[1, 2]` is _also_ an increasing sequence that is two numbers long.

Both times I didn't actually check for this, but it works out because of this bit here right at the end — 

```javascript
if (lastIncreasingSequence.length > longestFound.length) {
  return lastIncreasingSequence
} else {
  return longestFound
}
```

This looks to see if the length of the `lastIncreasingSequence` (which would be `[1, 2]`) is greater than the length of the previously `longestFound` (which is `[3, 4]`). They are the same, `2`, and since `2 > 2` is `false` the function gives back `[3, 4]`. If this had been a `>=` operator instead of just as `>` that return would have been wrong, and _both times_ this worked out from luck rather than me intentionally catching this because I honestly just didn't see that line in the spec until I was double checking my work at the end.

## Is the Code Better?

Yeah, I definitely think it is. It should be more readable and it is definitely more correct. I don't know if I would get the job now, but trying to follow up on that agency it looks like they've been acquired by a bigger company anyways. Like I said before, I'm proud of getting the answer the first time even if I went about it in a crazy way, and I'm proud of the growth I've made since then. And for what it's worth, running both functions through [jsben.ch](https://jsben.ch/), it turns out if you don't stringify and explode arrays for no real reason the code is about 15% faster finding the answers...

![jsbench results showing the new code performing at 85.56% the speed of the original code](/images/worst-js-refactor-jsbench.png)
