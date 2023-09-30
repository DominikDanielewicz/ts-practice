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
  console.log("Property decorator!");
  console.log(target, propertyName);
}

class Product {
  //We can add a decorator to the property. In that case decorator receives two arguments. Logger is executed when a class definition is registered by JS
  @Log
  title: string;
  @Log
  private _price: number;

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

  getPriceWithTax(tax: number) {
    console.log(this._price * (1 + tax));
    return this._price * (1 + tax);
  }
}

//-----------------------------
//110. Accessor & Parameter Decorators

//-----------------------------
//111. When Do Decorators Execute?
