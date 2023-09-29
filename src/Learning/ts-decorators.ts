//-----------------------------
//105. A First Class Decorator

//Here we don't use decorators
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const newPerson = new Person();
console.log(newPerson);

//Here we use decorators
//Decorator is just a function that you apply to something (for example a class)
//Decorators execute when class is defined.
function Logger(constructor: Function) {
  console.log("Logging");
  console.log(constructor);
}

@Logger
class AnotherPerson {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const newAnotherPerson = new AnotherPerson();
console.log(newAnotherPerson);

//-----------------------------
//106. Working with Decorator Factories

//There are diffrent way of creting decorators
function LoggerFactory(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@LoggerFactory("LOGGING - PERSON") //Here we call the decorator, we execute the function that will return a decorator function. The advantage of that is that we can pass values which will be used by that inner returned decorator function
class Person2 {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const newPerson2 = new Person2();
console.log(newPerson2);
