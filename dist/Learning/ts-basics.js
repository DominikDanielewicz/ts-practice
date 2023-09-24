"use strict";
function add(n1, n2) {
    return n1 + n2;
}
const number1 = 5;
const number2 = 2.8;
const result = add(number1, number2);
console.log(result);
const substract = (n1, n2, showResults, phrase) => {
    if (showResults) {
        console.log(`${phrase}${n1 - n2}`);
    }
    return n1 - n2;
};
substract(2, 1, true, "Result is: ");
let variable;
variable = 8;
const variable1 = 10;
const variable2 = 10;
const person = {
    name: "Gorge",
    age: 30,
};
const person1 = {
    name: "Gorge",
    age: 30,
};
console.log(person1.name);
const product = {
    id: "abc1",
    price: 12.99,
    tags: ["great-offer", "hot-and-new"],
    details: {
        title: "Red Carpet",
        description: "A great carpet - almost brand-new!",
    },
};
const person2 = {
    name: "Gorge",
    age: 30,
    hobbies: ["Sports", "Cooking"],
};
let favoriteActivities;
favoriteActivities = ["Sports", "Cooking"];
console.log(person2.name);
for (const hobby of person2.hobbies) {
    console.log(hobby.toUpperCase());
}
const person3 = {
    name: "Gorge",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: [2, "author"],
};
person3.role.push("admin");
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
const person4 = {
    name: "Gorge",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: Role.ADMIN,
};
if (person4.role === Role.AUTHOR) {
    console.log("Is author");
}
else {
    console.log(person4.role);
}
let books;
books = ["Casino Royale", "Good Omens", 9];
const logYourAge = (age) => {
    console.log(`Hej mam ${age} lat!`);
};
logYourAge(28);
logYourAge("dwadzieścia osiem");
let testing;
testing = "test";
testing = 21;
testing = true;
function combine(input1, input2) {
    return result;
}
function combine1(input1, input2) {
    let combineResult;
    if (typeof input1 === "number" && typeof input2 === "number") {
        combineResult = input1 + input2;
    }
    else {
        combineResult = input1.toString() + input2.toString();
    }
    return combineResult;
}
function combineConvert(input1, input2, resultConversion) {
    let combineResult;
    if ((typeof input1 === "number" && typeof input2 === "number") ||
        resultConversion === "as-number") {
        combineResult = Number(input1) + Number(input2);
    }
    else {
        combineResult = input1.toString() + input2.toString();
    }
    return combineResult;
}
console.log(combineConvert(30, 26, "as-number"));
console.log(combineConvert(30, 26, "as-text"));
console.log(combineConvert("30", "26", "as-text"));
function combine2(input1, input2) {
    let combineResult;
    if (typeof input1 === "number" && typeof input2 === "number") {
        combineResult = input1 + input2;
    }
    else {
        combineResult = input1.toString() + input2.toString();
    }
    return combineResult;
}
const u1 = { name: "Max", age: 30 };
function greet1(user) {
    console.log("Hi, I am " + user.name);
}
function isOlder(user, checkAge) {
    return checkAge > user.age;
}
function greet(user) {
    console.log("Hi, I am " + user.name);
}
function isOlder1(user, checkAge) {
    return checkAge > user.age;
}
function add3(n1, n2) {
    return n1 + n2;
}
function add4(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log("Result: " + num);
}
printResult(add3(2, 3));
function printResult2(num) {
    console.log("Result: " + num);
    return;
}
let combineValues;
combineValues = add3;
combineValues = printResult;
console.log(combineValues(5, 12));
let combineValues1;
combineValues1 = add3;
console.log(combineValues1(5, 12));
function addAndHandle(n1, n2, cb) {
    const result = n1 + n2;
    cb(result);
}
addAndHandle(2, 3, printResult);
addAndHandle(2, 3, (result) => {
    console.log(result);
    return result;
});
let userInput;
let userName;
if (typeof userInput === "string") {
    userName = userInput;
}
userInput = 5;
userInput = "Max";
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
const input1Element = document.querySelector("#input1");
const input2Element = document.querySelector("#input2");
const addbuttonElement = document.querySelector("#addButton");
addbuttonElement.addEventListener("click", () => {
    const sum = add(Number(input1Element.value), Number(input2Element.value));
    console.log(sum);
});
let test;
test = "test";
test = 21;
test = true;
const buyButtonElement = document.querySelector("#buyButton");
const calculatePrice = (originalPrice, hasDiscount = false) => {
    return hasDiscount ? originalPrice * 0.8 : originalPrice;
};
buyButtonElement.addEventListener("click", () => {
    const originalPrice = 50;
    const hasDiscount = Boolean(new URLSearchParams(window.location.search).get("discount"));
    console.log(calculatePrice(originalPrice, hasDiscount));
});
const nameElement = document.querySelector("#name");
const addTaskButton = document.querySelector("#addTaskButton");
const tasksList = document.querySelector(".tasks");
const tasks = ["Wyrzucić śmieci", "Pójśc na siłkę", "Nakarmić koty"];
const render = () => {
    tasksList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskElement = document.createElement("li");
        taskElement.innerText = task;
        tasksList.appendChild(taskElement);
    });
};
const addTask = (task) => {
    tasks.push(task);
};
addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    const task = nameElement.value;
    console.log(task);
    addTask(task);
    render();
});
render();
