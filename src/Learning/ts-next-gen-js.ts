const userName1 = "Max";

let age = 30;
age = 29;
//let and const has block scope

//this is why I should not use var
var car = "bmw";
var car = "audi";

//it has global scope or function scope

//Arrow functions
const addNumbers = (a: number, b: number) => {
  return a + b;
};

const addNumbersShort = (a: number, b: number) => a + b;

const showNumber = (a: number) => console.log(a);

//Default Function Parameters
const addNumbersWithDefault = (a: number = 2, b: number = 1) => {
  return a + b;
};
//Default function parameters must be last

//The Spread Operator (...)
const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies);

const cat = {
  color: "black",
  age: 10,
};

const copiedHuman = { ...cat };

//Rest parameter
const addMoreNumbers = (...numbers: number[]) => {
  return numbers.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
};

addMoreNumbers(2, 3, 4, 5, 6, 7, 8, 9);

//Array & Object Destructuring
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
const { color } = cat;
