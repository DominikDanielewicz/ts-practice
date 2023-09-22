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

function add(n1: number, n2: number) {
  return n1 + n2;
}

const number1 = 5;
const number2 = 2.8;

const result = add(number1, number2);
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

const substract = (
  n1: number,
  n2: number,
  showResults: boolean,
  phrase: string
) => {
  if (showResults) {
    console.log(`${phrase}${n1 - n2}`);
  }
  return n1 - n2;
};

substract(2, 1, true, "Result is: ");

//------------------------------------
//15. Type Assignment & Type Inference

let variable: number;
variable = 8;

const variable1: number = 10; //Bad practice because of type inference
const variable2 = 10; //Good practice

//----------------
//16. Object Types

//It is possible to do something like this but...
const person: {
  name: string;
  age: number;
} = {
  name: "Gorge",
  age: 30,
};

//...it's better to let TypeScript infere types on his own
const person1 = {
  name: "Gorge",
  age: 30,
};

console.log(person1.name);

//--------------------------
//17. Nested Objects & Types

//Of course object types can also be created for nested objects.
//JavaScript object:

const product = {
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
const person2 = {
  name: "Gorge",
  age: 30,
  hobbies: ["Sports", "Cooking"],
};

let favoriteActivities: string[];
//favoriteActivities = ["Sports", 1]; //error
//favoriteActivities = "Sports"; //error
favoriteActivities = ["Sports", "Cooking"]; //good

console.log(person2.name);

for (const hobby of person2.hobbies) {
  console.log(hobby.toUpperCase());
  //console.log(hobby.map()); //error TypeScript give you better hints what method you can use on the variable because of type inference
}

//----------------
//19. Working with Tuples
const person3: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
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

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person4 = {
  name: "Gorge",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

if (person4.role === Role.AUTHOR) {
  console.log("Is author");
} else {
  console.log(person4.role);
}

//----------------------
//21. The "any" Type

let books: any[];
books = ["Casino Royale", "Good Omens", 9];

//----------------------
//22. Union Types

const logYourAge = (age: number | string) => {
  console.log(`Hej mam ${age} lat!`);
};

logYourAge(28);
logYourAge("dwadzieścia osiem");

let testing: string | number | boolean;
testing = "test";
testing = 21;
testing = true;

//Error example
function combine(input1: number | string, input2: number | string) {
  //const result = input1 + input2; //error because JavaScript sees only union type and it doesn't know what types we are adding or concatenate;
  return result;
}

//Correct example
function combine1(input1: number | string, input2: number | string) {
  let combineResult: number | string;
  if (typeof input1 === "number" && typeof input2 === "number") {
    combineResult = input1 + input2;
  } else {
    combineResult = input1.toString() + input2.toString();
  }
  return combineResult;
}

//-----------------
//23. Literal Types

function combineConvert(
  input1: number | string,
  input2: number | string,
  //   resultConversion: string
  resultConversion: "as-number" | "as-text"
) {
  let combineResult: number | string;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    combineResult = Number(input1) + Number(input2);
  } else {
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

//-----------------
//24. Type Aliases / Custom Types
type Combinable = number | string;
type Conversion = "as-number" | "as-text";

function combine2(input1: Combinable, input2: Combinable) {
  let combineResult: Combinable;
  if (typeof input1 === "number" && typeof input2 === "number") {
    combineResult = input1 + input2;
  } else {
    combineResult = input1.toString() + input2.toString();
  }
  return combineResult;
}

//-------------------------------
//25. Type Aliases & Object Types

//Type aliases can be used to "create" your own types. You're not limited to storing union types though - you can also provide an alias to a (possibly complex) object type.For example:

type User1 = { name: string; age: number };
const u1: User1 = { name: "Max", age: 30 }; // this works!
//This allows you to avoid unnecessary repetition and manage types centrally.

//For example, you can simplify this code:
function greet1(user: { name: string; age: number }) {
  console.log("Hi, I am " + user.name);
}

function isOlder(user: { name: string; age: number }, checkAge: number) {
  return checkAge > user.age;
}

//To:
type User = { name: string; age: number };

function greet(user: User) {
  console.log("Hi, I am " + user.name);
}

function isOlder1(user: User, checkAge: number) {
  return checkAge > user.age;
}

//-------------------------------
//26. Function Return Types & "void"

//Because of function takes two numbers, TypeScript is able to infere that the function result will be a number
function add3(n1: number, n2: number) {
  return n1 + n2;
}

//We can explisitly asign a return type. When we don't need to do it, it's better to leave it for TypeScript to infere the type
function add4(n1: number, n2: number): number {
  return n1 + n2;
}

//Void return type. You don't need to specify it and leave it to TS inference. That function doesn't have return statement. It returns nothing (It does because it returns undefined). It doesn't force you to return anything if you don't want to return something
function printResult(num: number): void {
  console.log("Result: " + num);
}

printResult(add3(2, 3));

// Error example
// function printResult1(num: number): undefined {
//   console.log("Result: " + num);
// }

// Correct example
function printResult2(num: number): undefined {
  console.log("Result: " + num);
  return;
}

//-------------------------------
//27. Functions as Types

let combineValues: Function;

combineValues = add3;
combineValues = printResult; //It won't be an error but it will return undefined. This function is not taking that arguments
// combineValues = 5; //Error because it's not function
console.log(combineValues(5, 12));

let combineValues1: (a: number, b: number) => number;
combineValues1 = add3;
// combineValues1 = printResult; //Error because printResult function don't match the function type of combineValues1
console.log(combineValues1(5, 12));

//-------------------------------
//28. Function Types & Callbacks

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(2, 3, printResult);
addAndHandle(2, 3, (result) => {
  console.log(result);
  return result; //By specifying void returned result we are saying that we are ignoring all any result might be returning.
});

//-------------------------------
//29. The "unknown" Type
let userInput: unknown;
let userName: string;

if (typeof userInput === "string") {
  userName = userInput;
}
userInput = userName;
userInput = 5;
userInput = "Max";

//-------------------------------
//30. The "never" Type

//This function doesn't return anything, even undefined because it throws an error. Another example is a function with infinit loop that returns nothing.
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

// const errorMessage = generateError("An error occured!", 500);

//Practice
const input1Element: HTMLInputElement = document.querySelector("#input1");
const input2Element: HTMLInputElement = document.querySelector("#input2");
const addbuttonElement: HTMLButtonElement =
  document.querySelector("#addButton");

addbuttonElement.addEventListener("click", () => {
  const sum = add(Number(input1Element.value), Number(input2Element.value));
  console.log(sum);
});

let test: string | number | boolean;
test = "test";
test = 21;
test = true;

//Boolean practice
const buyButtonElement: HTMLButtonElement =
  document.querySelector("#buyButton");

const calculatePrice = (
  originalPrice: number,
  hasDiscount: boolean = false
) => {
  return hasDiscount ? originalPrice * 0.8 : originalPrice;
};

buyButtonElement.addEventListener("click", () => {
  const originalPrice: number = 50;
  const hasDiscount: boolean = Boolean(
    new URLSearchParams(window.location.search).get("discount")
  );
  console.log(calculatePrice(originalPrice, hasDiscount));
});

// Array

// <li>
//   <label for="task-1">Wyrzucić śmieci</label>
//   <input type="checkbox" id="task-1" name="" />
// </li>;

const nameElement: HTMLInputElement = document.querySelector("#name");
const addTaskButton: HTMLButtonElement =
  document.querySelector("#addTaskButton");
const tasksList: HTMLElement = document.querySelector(".tasks");

const tasks: string[] = ["Wyrzucić śmieci", "Pójśc na siłkę", "Nakarmić koty"];

const render = () => {
  tasksList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskElement: HTMLElement = document.createElement("li");
    taskElement.innerText = task;
    tasksList.appendChild(taskElement);
  });
};

const addTask = (task: string) => {
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
