/*
Sekcja 2: TypeScript Basics & Basic Types


---------------
11. Using Types

Core Types:
-number
-string
-boolean
-object
-Array



Added by TypeScript:
-Tuples (fixed length array, fixed type)
-Enum - enum {NEW, OLD} - Automatically enumerated global constant identifiers
-Any - when possible avoid it - in most of situtions it behaves like ordinary JavaScript code - any type for everything
-union - more then one type
-literar - allows to choose the specific values which we want to use. Often used with union type
-type alias: allows you to create a new name for a type and create your own reusable alias.
-void - Represents the absence of a type. It's typically used for functions that don't return anything. don't have a return statement
-undefined
*/
function add(n1, n2) {
    return n1 + n2;
}
var number1 = 5;
var number2 = 2.8;
var result = add(number1, number2);
console.log(result);
//TypeScript system only helps during development before compilation
// JavaScript uses "dynamic types" resolved at runtime, TypeScript uses "static types" set during development
//----------------------------------------
//12. TypeScript Types vs JavaScript Types
//Possible non TypeScript option to validate the inputs
function multiply(n1, n2) {
    if (typeof n1 !== "number" || typeof n2 !== "number") {
        throw new Error("Incorrect input!");
    }
    return n1 * n2;
}
console.log(multiply(8, 8));
//--------------------------------------------
//14. Working with Numbers, Strings & Booleans
var substract = function (n1, n2, showResults, phrase) {
    if (showResults) {
        console.log("".concat(phrase).concat(n1 - n2));
    }
    return n1 - n2;
};
substract(2, 1, true, "Result is: ");
//------------------------------------
//15. Type Assignment & Type Inference
var variable;
variable = 8;
var variable1 = 10; //Bad practice because of type inference
var variable2 = 10; //Good practice
//----------------
//16. Object Types
//It is possible to do something like this but...
var person = {
    name: "Gorge",
    age: 30,
};
//...it's better to let TypeScript infere types on his own
var person1 = {
    name: "Gorge",
    age: 30,
};
console.log(person1.name);
//--------------------------
//17. Nested Objects & Types
//Of course object types can also be created for nested objects.
//JavaScript object:
var product = {
    id: "abc1",
    price: 12.99,
    tags: ["great-offer", "hot-and-new"],
    details: {
        title: "Red Carpet",
        description: "A great carpet - almost brand-new!",
    },
};
//This would be the type of such an object:
// {
//   id: string;
//   price: number;
//   tags: string[];
//   details: {
//     title: string;
//     description: string;
//   }
// }
//So you have an object type in an object type so to say.
//----------------
//18. Arrays Types
var person2 = {
    name: "Gorge",
    age: 30,
    hobbies: ["Sports", "Cooking"],
};
var favoriteActivities;
//favoriteActivities = ["Sports", 1]; //error
//favoriteActivities = "Sports"; //error
favoriteActivities = ["Sports", "Cooking"]; //good
console.log(person2.name);
for (var _i = 0, _a = person2.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
    //console.log(hobby.map()); //error TypeScript give you better hints what method you can use on the variable because of type inference
}
//----------------
//19. Working with Tuples
var person3 = {
    name: "Gorge",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: [2, "author"],
};
person3.role.push("admin"); //Typescript can't protect us from pushing a new value to the tuple (the aaray with fixed length)
person3.role.push[1] = 10;
//----------------------
//20. Working with Enums
//Ideal when we need identifiers that are human readable and have some maped value behind the scenes
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
var person4 = {
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
//----------------------
//21. The "any" Type
var books;
books = ["Casino Royale", "Good Omens", 9];
//----------------------
//22. Union Types
var logYourAge = function (age) {
    console.log("Hej mam ".concat(age, " lat!"));
};
logYourAge(28);
logYourAge("dwadzieścia osiem");
var testing;
testing = "test";
testing = 21;
testing = true;
//Error example
function combine(input1, input2) {
    //const result = input1 + input2; //error because JavaScript sees only union type and it doesn't know what types we are adding or concatenate;
    return result;
}
//Correct example
function combine1(input1, input2) {
    var combineResult;
    if (typeof input1 === "number" && typeof input2 === "number") {
        combineResult = input1 + input2;
    }
    else {
        combineResult = input1.toString() + input2.toString();
    }
    return combineResult;
}
//-----------------
//23. Literal Types
function combineConvert(input1, input2, 
//   resultConversion: string
resultConversion) {
    var combineResult;
    if ((typeof input1 === "number" && typeof input2 === "number") ||
        resultConversion === "as-number") {
        combineResult = Number(input1) + Number(input2);
    }
    else {
        combineResult = input1.toString() + input2.toString();
    }
    return combineResult;
    //   if (resultConversion === "as-number") {
    //     return Number(result);
    //   } else {
    //     return result.toString();
    //   }
}
console.log(combineConvert(30, 26, "as-number"));
console.log(combineConvert(30, 26, "as-text"));
console.log(combineConvert("30", "26", "as-text"));
function combine2(input1, input2) {
    var combineResult;
    if (typeof input1 === "number" && typeof input2 === "number") {
        combineResult = input1 + input2;
    }
    else {
        combineResult = input1.toString() + input2.toString();
    }
    return combineResult;
}
var u1 = { name: "Max", age: 30 }; // this works!
//This allows you to avoid unnecessary repetition and manage types centrally.
//For example, you can simplify this code:
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
//-------------------------------
//26. Function Return Types & "void"
//Because of function takes two numbers, TypeScript is able to infere that the function result will be a number
function add3(n1, n2) {
    return n1 + n2;
}
//We can explisitly asign a return type. When we don't need to do it, it's better to leave it for TypeScript to infere the type
function add4(n1, n2) {
    return n1 + n2;
}
//Void return type. You don't need to specify it and leave it to TS inference. That function doesn't have return. It returns nothing (It does because it returns undefined),
function printResult(num) {
    console.log("Result: " + num);
}
printResult(add3(2, 3));
// Error example
// function printResult1(num: number): undefined {
//   console.log("Result: " + num);
// }
// Correct example
function printResult2(num) {
    console.log("Result: " + num);
    return;
}
// let age: number = 29;
// age = 30;
// let ageAsString: string = "twenty two";
// ageAsString = "ten";
// ageAsString = `${age}`;
// console.log(ageAsString);
// //Functions
// const add1 = (v1: number, v2: number) => {
//   return v1 + v2;
// };
// console.log(add(24, 50));
// //Practice
// const input1Element: HTMLInputElement = document.querySelector("#input1");
// const input2Element: HTMLInputElement = document.querySelector("#input2");
// const addbuttonElement: HTMLButtonElement =
//   document.querySelector("#addButton");
// addbuttonElement.addEventListener("click", () => {
//   const sum = add(Number(input1Element.value), Number(input2Element.value));
//   console.log(sum);
// });
// //Type inference
// let age1 = 29;
// const divide = (v1: number, v2: number) => v1 / v2;
// divide(2, 2);
// //Literal type
// const age2 = 29;
// //union types
// const logAge = (age: number | string) => {
//   console.log(`Hej mam ${age} lat!`);
// };
// logAge(28);
// logAge("dwadzieścia osiem");
// let test: string | number | boolean;
// test = "test";
// test = 21;
// test = true;
// //Boolean practice
// const buyButtonElement: HTMLButtonElement =
//   document.querySelector("#buyButton");
// const calculatePrice = (
//   originalPrice: number,
//   hasDiscount: boolean = false
// ) => {
//   return hasDiscount ? originalPrice * 0.8 : originalPrice;
// };
// buyButtonElement.addEventListener("click", () => {
//   const originalPrice: number = 50;
//   const hasDiscount: boolean = Boolean(
//     new URLSearchParams(window.location.search).get("discount")
//   );
//   console.log(calculatePrice(originalPrice, hasDiscount));
// });
// // Array
// // <li>
// //   <label for="task-1">Wyrzucić śmieci</label>
// //   <input type="checkbox" id="task-1" name="" />
// // </li>;
// const nameElement: HTMLInputElement = document.querySelector("#name");
// const addTaskButton: HTMLButtonElement =
//   document.querySelector("#addTaskButton");
// const tasksList: HTMLUListElement = document.querySelector(".tasks");
// const tasks: string[] = ["Wyrzucić śmieci", "Pójśc na siłkę", "Nakarmić koty"];
// const render = () => {
//   tasks.forEach((task, index) => {
//     const taskElement: HTMLElement = document.createElement("li");
//     taskElement.innerText = task;
//     tasksList.appendChild(taskElement);
//   });
// };
// const addTask = (task: string) => {};
// render();
