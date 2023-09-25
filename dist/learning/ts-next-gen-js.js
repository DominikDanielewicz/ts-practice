"use strict";
const userName1 = "Max";
let age = 30;
age = 29;
var car = "bmw";
var car = "audi";
const addNumbers = (a, b) => {
    return a + b;
};
const addNumbersShort = (a, b) => a + b;
const showNumber = (a) => console.log(a);
const addNumbersWithDefault = (a = 2, b = 1) => {
    return a + b;
};
const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];
activeHobbies.push(...hobbies);
const cat = {
    color: "black",
    age: 10,
};
const copiedHuman = Object.assign({}, cat);
const addMoreNumbers = (...numbers) => {
    return numbers.reduce((prev, curr) => {
        return prev + curr;
    }, 0);
};
addMoreNumbers(2, 3, 4, 5, 6, 7, 8, 9);
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
const { color } = cat;
