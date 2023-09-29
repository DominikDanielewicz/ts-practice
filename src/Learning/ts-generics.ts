//------------------------------------------
//94. Built-in Generics & What are Generics?

//Generic type is a type which is kind of connected with some other type and is really flexible regarding which exact type that other type is
const names: Array<string> = ["Max", "Manuel"]; //string[]

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done");
  }, 2000);
});

//Because Promise know the generic type <string>. Generic types helps to get additional type information if you got more complex class or function that does something with the data that is coming in and to get better Typescript support when working with that generic type
promise.then((data) => {
  data.split(" ");
});

//------------------------------------------
//95. Creating a Generic Function

function merge(objA: object, objB: object) {
  return Object.assign(objA, objB);
}

// const mergeObj = merge({ name: "Max" }, { age: 30 });
// mergeObj.age; //Typescript doesn't know what is in that object

//So we can do this but it's cumbersome
const mergeObj = merge({ name: "Max" }, { age: 30 }) as {
  name: string;
  age: number;
};
//Typescript doesn't know what is in that object
mergeObj.age;

//With generic types we are telling typescript that these 2 parameters will be often of diffrent types and therefore TypeScript is able to understand that we are not just working with some random object type but we will get diffrent type data here and this function will return an intersection of that data
function merge2<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergeObj2 = merge2({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log(mergeObj2.age);

//------------------------------------------
//96. Working with Constraints
//Due to the stricter type checking in more recent versions of TypeScript often we need to use constraints with our Generic Types to make sure that TypeScript will check if we are providing proper arguments to a function.
function merge3<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// const mergeObj3 = merge2({ name: "Max", hobbies: ["Sports"] }, 30); //error, 30 is not an object
// console.log(mergeObj3.age);

//------------------------------------------
//97. Another Generic Function
interface Lengthy {
  length: number;
}

//To provide information for TypeScript that element has lenght parameter we can create interface or type and create a constraint
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}
// console.log(countAndDescribe(10)); because number don't have a length parameter it won't work
console.log(countAndDescribe("Hi there"));
console.log(countAndDescribe(["Sport", "Cooking"]));

//------------------------------------------
//98. The "keyof" Constraint

//Here it's not guaranted that name key exists in that object
const extractAndConvert = (obj: object, key: string) => {
  // return obj[key];
};

//We need to guarantee that the key parameter will the key of our T type
const extractAndConvert1 = <T extends object, U extends keyof T>(
  obj: T,
  key: U
) => {
  return obj[key];
};

//So now we need to make sure that the object has now a key name to work properly. In other situations it will be
extractAndConvert1({ name: "Max" }, "name");

//------------------------------------------
//99. Generic Classes

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
// textStorage.addItem(10); //error because we set generic type to string
textStorage.addItem("Manu");
textStorage.removeItem("Manu");
textStorage.getItems();

//It's usefull to buld such generic class if we want to store more types
const numberStorage = new DataStorage<number>();
const mixStorage = new DataStorage<number | string>();

//Problem with objects. We would need more specialized DataStorage class to work with objects. Now it's working with primitives values
// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: "Max" });
// objStorage.addItem({ name: "Manu" });
// objStorage.removeItem({ name: "Max" });

//Generic gives us flexibility with type safety

//--------------------------
//101. Generic Utility Types

//This is first example
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  completeUntil: Date
): CourseGoal {
  return { title, description, completeUntil };
}

//Partial
//Sometimes we want to do it in more steps
function createCourseGoal1(
  title: string,
  description: string,
  completeUntil: Date
): CourseGoal {
  //When we want for example to add a new elements to object seperately because you want to do some more validation, then partial type is useful
  //Partial tells TypeScript this object in the end will be a CouseGoal. And temporarly make all properties in your interface optional
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = completeUntil;

  return courseGoal as CourseGoal;
}

//Readonly

const allNames: Readonly<string[]> = ["Max", "Anna"];
//We got errors on modifying array because it's Readonly. It's gives extra strictness during compilation
// allNames.push("Manu");
// allNames.pop();

//---------------------------------
//102. Generic Types vs Union Types

//Union types are great when you want to have function i wywołać ją z określonymi typami
//Generic types are great when you want to lock in the certain type
