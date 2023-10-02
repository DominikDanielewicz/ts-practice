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

//-----------------------------
//113. Other Decorator Return Types

//Decorators that you can return something are the decorators added to methods and accessors. You can return brand new property descriptor. Descriptors exist in JavaScript

//Decorators on properties and parameters can return something but TypeScript will ignore it. Returned values are not supported there.

//-----------------------------
//114. Example: Creating an "Autobind" Decorator

//Decorator that will set this context to the object this method belongs to in the end
function Autobind(_: any, __: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    //The getter method will be triggered by the concrete object to which it belongs, so this inside the getter method will always refer to the object on which we define the getter. It won't be overwritten by for example eventListener
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  //So this decorator function Aurobind returning the new descriptor object and this object will overwrite the old descriptor, TypeScript will replace old descriptor configuration with new configuration.
  return adjustedDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("#clicker")!;
//Without Autobind in the eventListener, this will point to the button
// button.addEventListener("click", p.showMessage.bind(p));

//With Autobind decorator, this will point to the object
button.addEventListener("click", p.showMessage);

//-----------------------------
//115. Validation with Decorators - First Steps

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ["required", "positive"];
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("#form")!;
courseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput: HTMLInputElement = document.querySelector("#title")!;
  const priceInput: HTMLInputElement = document.querySelector("#price")!;

  const title = titleInput.value;
  const price = Number(priceInput.value);

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }

  console.log(createdCourse);
});

//-----------------------------
//118. Wrap Up
//https://www.npmjs.com/package/class-validator
// Allows use of decorator and non-decorator based validation. Internally uses validator.js to perform validation. Class-validator works on both browser and node.js platforms.
