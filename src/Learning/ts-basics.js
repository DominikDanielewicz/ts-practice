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
-function
-undefined
-null



Added by TypeScript:
-Tuples (fixed length array, fixed type)
-Enum - enum {NEW, OLD} - Automatically enumerated global constant identifiers
-Any - when possible avoid it - in most of situtions it behaves like ordinary JavaScript code - any type for everything
-union - more then one type
-literar - allows to choose the specific values which we want to use. Often used with union type
-type alias: allows you to create a new name for a type and create your own reusable alias.
-void - Represents the absence of a type. It's typically used for functions that don't return anything. don't have a return statement
-unknown - is meant to describe the type of variables that we might not know when we're writing an application. It's like the any type in that any value is assignable to it. However, you can't perform any operations on values of type unknown without first asserting or narrowing them to a more specific type. It's a more type-safe counterpart to the any type.
-never -  represents a value that never occurs. It is a powerful tool for ensuring type safety in certain scenarios. It's particularly valuable for exhaustive type checking and making sure certain code paths are not taken.


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
//Void return type. You don't need to specify it and leave it to TS inference. That function doesn't have return statement. It returns nothing (It does because it returns undefined). It doesn't force you to return anything if you don't want to return something
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
//-------------------------------
//27. Functions as Types
var combineValues;
combineValues = add3;
combineValues = printResult; //It won't be an error but it will return undefined. This function is not taking that arguments
// combineValues = 5; //Error because it's not function
console.log(combineValues(5, 12));
var combineValues1;
combineValues1 = add3;
// combineValues1 = printResult; //Error because printResult function don't match the function type of combineValues1
console.log(combineValues1(5, 12));
//-------------------------------
//28. Function Types & Callbacks
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
addAndHandle(2, 3, printResult);
addAndHandle(2, 3, function (result) {
    console.log(result);
    return result; //By specifying void returned result we are saying that we are ignoring all any result might be returning.
});
//-------------------------------
//29. The "unknown" Type
var userInput;
var userName;
if (typeof userInput === "string") {
    userName = userInput;
}
userInput = userName;
userInput = 5;
userInput = "Max";
//-------------------------------
//30. The "never" Type
//This function doesn't return anything, even undefined because it throws an error. Another example is a function with infinit loop that returns nothing.
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
// const errorMessage = generateError("An error occured!", 500);
//Practice
var input1Element = document.querySelector("#input1");
var input2Element = document.querySelector("#input2");
var addbuttonElement = document.querySelector("#addButton");
addbuttonElement.addEventListener("click", function () {
    var sum = add(Number(input1Element.value), Number(input2Element.value));
    console.log(sum);
});
var test;
test = "test";
test = 21;
test = true;
//Boolean practice
var buyButtonElement = document.querySelector("#buyButton");
var calculatePrice = function (originalPrice, hasDiscount) {
    if (hasDiscount === void 0) { hasDiscount = false; }
    return hasDiscount ? originalPrice * 0.8 : originalPrice;
};
buyButtonElement.addEventListener("click", function () {
    var originalPrice = 50;
    var hasDiscount = Boolean(new URLSearchParams(window.location.search).get("discount"));
    console.log(calculatePrice(originalPrice, hasDiscount));
});
// Array
// <li>
//   <label for="task-1">Wyrzucić śmieci</label>
//   <input type="checkbox" id="task-1" name="" />
// </li>;
var nameElement = document.querySelector("#name");
var addTaskButton = document.querySelector("#addTaskButton");
var tasksList = document.querySelector(".tasks");
var tasks = ["Wyrzucić śmieci", "Pójśc na siłkę", "Nakarmić koty"];
var render = function () {
    tasksList.innerHTML = "";
    tasks.forEach(function (task, index) {
        var taskElement = document.createElement("li");
        taskElement.innerText = task;
        tasksList.appendChild(taskElement);
    });
};
var addTask = function (task) {
    tasks.push(task);
};
addTaskButton.addEventListener("click", function (e) {
    e.preventDefault();
    var task = nameElement.value;
    console.log(task);
    addTask(task);
    render();
});
render();
