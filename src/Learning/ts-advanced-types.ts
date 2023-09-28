//----------------------
//83. Intersection Types

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

//Combination of above types
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combination = string | number;
type Numeric = number | boolean;
type Universal = Combination & Numeric;

//The same we can achieve with interface
interface Admin1 {
  name: string;
  privileges: string[];
}

interface Employee1 {
  name: string;
  startDate: Date;
}

interface ElevatedEmployee1 extends Admin1, Employee1 {}

//-----------------------
//84. More on Type Guards

//Type guard is a term of describing aproach of checking if a certain property or method exists before you try to use it.
function addNumbers1(a: Combination, b: Combination) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges:" + emp.privileges); //We need to use type guard here bcause UnknownEmployee don't know if it's Employee or Admin type
  }
  if ("startDate" in emp) {
    console.log("Start date:" + emp.startDate);
  }
}

printEmployeeInformation(e1);
printEmployeeInformation({ name: "Manu", startDate: new Date() });

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  //   if ("loadCargo" in vehicle) {
  //     vehicle.loadCargo(1000);
  //   }

  //We can use instanceof - it's a normal operator in JS - we can check if some object is based on that class.
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

//------------------------
//85. Discriminated Unions
//It's a pattern that you can use with union types that makes implementing type guards easier.

interface Bird {
  type: "bird"; //One common property in every object that makes up our union and describes our object, and we can use that property in our checks
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal1 = Bird | Horse;

function moveAnimal(animal: Animal1) {
  //We can use that aproach but it might cause that we will have to much checks
  //   if ("flyingSpeed" in animal) {
  //     console.log("Moving with speed: " + animal.flyingSpeed);
  //   }
  //   if ("runningSpeed" in animal) {
  //     console.log("Moving with speed: " + animal.runningSpeed);
  //   }
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("Moving at speed " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 100 });

//-----------------
//86. Type Casting

//Type Casting helps to tell TypeScript that some value is a specific type where TypeScript is not able to detect it on it's own.

//Usuful when we access DOM element

const paragraph = document.querySelector("p"); //TypeScript knows that it will be a HTMLParagraphElement element

//TypeScript don't know what specific element that is Element, HTMLElement
const paragraphById = document.querySelector("#message-output");
const paragraphById1 = document.getElementById("message-output");

//TypeScript here knows only then it's some HTML Element
const nameInputElement = document.querySelector("#input-name");

//So if we try to get element value on this element we get error because Typescript saying that this object is possibly null and that property value does not exist on that HTMLElement
// const nameInputElementValue = nameInputElement.value;

//So we need to tell TypeScript what type is that element
const nameInputElement1 = <HTMLInputElement>(
  document.querySelector("#input-name")
);
// const nameInputElementValue1 = nameInputElement1.value;

//There is also aternative to this angle brakets type casting to not clash with React JSX syntax
const nameInputElement2 = document.querySelector(
  "#input-name"
)! as HTMLInputElement;

const nameInputElementValue2 = nameInputElement2.value;

//If we are not sure if that element will appear in DOM we can do if check
const nameInputElement3 = document.querySelector(
  "#input-name"
)! as HTMLInputElement;

if (nameInputElement3) {
  (nameInputElement3 as HTMLInputElement).value = "Hi there";
}

//-------------------------
//87. Index Properties

interface ErrorContainer {
  // {email: "Not a valid email", username: "Must start with a character!"}
  // We can predefine properties however only with the same type as configured below
  // id: string; //Not a number because we defined that the values will be a string
  //I know only that all properties that were added must have a property name that can be interpreted as a string and a value for that property also must be a string.
  [prop: string]: string;
}

//It gives us felxibility when we don't know what property names we want to use and how many properties we need
const errorBag: ErrorContainer = {
  email: "Not a valid email",
  username: "Must start with a character!",
};

//-------------------------
//88. Function Overloads

//Feature that allows us to define multiple function signatures for the same function. We can have diffrent ways of calling a function with diffrent parameters

//Function overloads we are using by simply writing function above mian function with the same name, without curly braces and with specific types and retun type

//Typescript will merge it and combine a knowledge of this two functions
function addNumbers2(a: number, b: number): number;
function addNumbers2(a: string, b: string): string;
function addNumbers2(a: number, b: string): string;
function addNumbers2(a: string, b: number): string;
function addNumbers2(a: Combination, b: Combination) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const addingResult = addNumbers2("Max", "Dom");

//-------------------------
//89. Optional Chaining

const fetchedUserData = {
  id: "u1",
  name: "Max",
  // job: { title: "CEO", description: "My own company" },
};

// It helps us safly access nested properties and nested objects in our object data
// console.log(fetchedUserData.job?.title);

//-------------------------
//90. Nullish Coalescing

const adminInput = "";

//Only if adminInput is null or undefined it will take DEFAULT
const storedData = adminInput ?? "DEFAULT";
console.log(storedData);
