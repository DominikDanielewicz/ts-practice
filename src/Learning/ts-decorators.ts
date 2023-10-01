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

//-----------------------------
//107. Building More Useful Decorators

function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    //To tell TypeScript that we are not interested in using this argument use _
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

@WithTemplate("<h1>My Person Object</h1>", "app")
class Person3 {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

//-----------------------------
//108. Adding Multiple Decorators
//You can add more then one decorator to the class
//The decorators (decorator functions) execute from the bottom to the top, so first is WithTemplate last will be Logger. The decorator factories run earlier
@Logger
@LoggerFactory("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person4 {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

//-----------------------------
//109. Diving into Property Decorators

//Which arguments that decorator gets depends on where we want to use it
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!!!");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!!!");
  console.log({ target, name, descriptor });
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!!!");
  console.log({ target, name, descriptor });
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator!!!");
  console.log({ target, name, position });
}

class Product {
  //We can add a decorator to the property. In that case decorator receives 2 arguments. Logger is executed when a class definition is registered by JS
  @Log
  title: string;
  @Log
  private _price: number;

  //You can also add decorator to accessors. Decorator in that case receives 3 arguments
  @Log2
  set price(val: number) {
    if (val > 0) this._price = val;
  }

  get price() {
    return this._price;
  }
  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  //You can also add decorator to methods. Receives 3 arguments
  @Log3
  //You can also add decorator to parameter. Receives 3 arguments. target, name - name of the method in which we used that parameter, position - position of the argument
  getPriceWithTax(@Log4 tax: number) {
    console.log(this._price * (1 + tax));
    return this._price * (1 + tax);
  }
}

//-----------------------------
//111. When Do Decorators Execute?

//Decorators execute when you defined this class. Instanciating the objects doesn't matter. It won't execute again when you call a method or work with a property. Decorators add extra functionality behind the scenes

//-----------------------------
//112. Returning (and changing) a Class in a Class Decorator

//Some decorators, for example class and method decorators are capable of returning something

function WithTemplate1(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    //We can return a constructor function which is based on the original constructor function so to keep the properties (We don't need to do it but we will do in this example)

    //We are replacing a class (the constructor function) to which we add the decorator with a new class (new constructor function) where I still execute the old logic with some new logic. And now the template should actualy only be rendered to the DOM if I really instanciate my object here na dnot as soon as we define the class.
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@WithTemplate1("<h1>My Person Object</h1>", "app")
class Person5 {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const NewestPerson = new Person5();
