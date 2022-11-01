
//charAT
// const str = "Hello World";
// const str1 = "Hello World";
// str[0]
// console.log(str.charAt(2))

//concat
// console.log(str + ' '+str1)
// console.log(str.concat(' ',str1))

//indexof
// const sentence = "Carbon emission is increasing day by day";

// // get 1st index of 'day'
// console.log(sentence.indexOf("day"));
// console.log(sentence.indexOf("Carbon"));
// // case-sensitive, returns -1
// console.log(sentence.indexOf("rakib"));


//replace
// const str = "Carbon emission day is increasing day by day.";

// // using string to match
// console.log(str.replace("day", "night"));
// // using regular expression to match
// console.log(str.replace(/day/g, "year"));

//slice
// const sentence = "Carbon emission is increasing day by day";
// console.log(sentence.slice(5, 15));
// console.log(sentence.slice(5));
// console.log(sentence.slice(-15, -5));

//split
// const sentence = "Carbon emission is increasing day by day";

// // no pattern -> return whole string in array
// console.log(sentence.split());
// // split at each space
// console.log(sentence.split(''));
// // split at each space
// console.log(sentence.split(' '));
// // split at each 'is'
// console.log((sentence.split('day'))[0]);


// const sentence = "Carbon emission is increasing day by day";

// // start at index 10, cut 6 characters
// console.log(sentence.substr(1, 4));
// // start at index 10, cut all characters
// console.log(sentence.substr(10));

// // negative index
// console.log(sentence.substr(-4, 3));


// const sentence = "CARBON emission IS INCREASING DAY BY DAY";
// console.log(sentence.toLowerCase());
// console.log(sentence.toUpperCase());

var str=2;
console.log(typeof(str))
console.log(typeof(str.toString(1)))