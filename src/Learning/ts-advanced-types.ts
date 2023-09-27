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
    return Number(a) + Number(b);
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
