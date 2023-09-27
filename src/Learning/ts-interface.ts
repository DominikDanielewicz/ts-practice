//-------------------
//72. A First Interface

//Interface - describes the structure of the object. We can use it to describe how the object should look like. It's a pure Typescript feature and it's only available during developement and compilation.

//We can't add a default values to the parameters
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

//We can use Person as a type to check if the object has a proper structure
let user1: Person;

user1 = {
  name: "Adam",
  age: 43,
  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  },
};

user1.greet("Hello");

//Interface is similar to object custom type
type Person1 = {
  name: string;
  age: number;

  greet(phrase: string): void;
};

//We can use interface to share it among multiple classes to ensure that every class has proper structure
interface Greetable {
  name: string;
  readonly surname: string; //You can use readonly - this property must only be set once. It can't be change after initialization
  greet(phrase: string): void;
}

//You can have more parameters in the class that implements an interface. You can also extends this class
class Persons implements Greetable {
  name: string;
  age: number;
  surname: string;
  constructor(name: string, surname: string, age: number) {
    this.name = name;
    this.surname = surname;
    this.age = age;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}

let user2: Greetable;
// let user2: Person;

user2 = new Persons("Max", "Lo", 23);
user2.greet("Hi");
// user2.surname = "Olo"; //Error because name is readonly property

//Why to use interfaces
//For example if we want to force existance of greet method in more than one class, and each class has then it's own implementation

//-------------------
//Odtwarzaj
//76. Extending Interfaces

//With this split of interfaces you can implement diffrent interface in each class. Some can implement Name2 and some Greetable2

interface Named2 {
  readonly name: string;
}

interface Surname {
  surname: string;
}

//You can inherit from multiple interfaces
interface Greetable2 extends Named2, Surname {
  greet(phrase: string): void;
}

class SecondPerson implements Greetable2 {
  name: string;
  surname: string;
  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }

  greet(phrase: string): void {
    console.log(phrase);
  }
}

//-------------------
//77. Interfaces as Function Types

//Interfaces can also be used to define the structure of a function so basicly as a replacement of function type

//How it looks with a type
type AddFn = (a: number, b: number) => number;
let addTwoNumbers: AddFn;

addTwoNumbers = (n1: number, n2: number) => {
  return n1 + n2;
};

//How it looks with interface
//Iterface is used to define the structure of the object, but functions are just objects
interface AddFnInt {
  (a: number, b: number): number;
}

let addTwoNumbersInt: AddFnInt;

addTwoNumbersInt = (n1: number, n2: number) => {
  return n1 + n2;
};

//-------------------
//78. Optional Parameters & Properties

interface Animals {
  readonly species: string;
  height: number;
  legs?: number; //It tells typescript that this property might exist

  showInfo?(info: string): void;
}

class Animal implements Animals {
  species: string;
  height: number;
  legs?: number;

  constructor(species: string, height: number, legs?: number) {
    this.species = species;
    this.height = height;
    if (legs) {
      this.legs = legs;
    }
  }
}

const dog = new Animal("dog", 1);
