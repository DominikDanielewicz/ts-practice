"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
class Person {
    constructor() {
        this.name = "Max";
        console.log("Creating person object...");
    }
}
const newPerson = new Person();
console.log(newPerson);
function Logger(constructor) {
    console.log("Logging");
    console.log(constructor);
}
let AnotherPerson = class AnotherPerson {
    constructor() {
        this.name = "Max";
        console.log("Creating person object...");
    }
};
AnotherPerson = __decorate([
    Logger
], AnotherPerson);
const newAnotherPerson = new AnotherPerson();
console.log(newAnotherPerson);
function LoggerFactory(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
let Person2 = class Person2 {
    constructor() {
        this.name = "Max";
        console.log("Creating person object...");
    }
};
Person2 = __decorate([
    LoggerFactory("LOGGING - PERSON")
], Person2);
const newPerson2 = new Person2();
console.log(newPerson2);
function WithTemplate(template, hookId) {
    return function (constructor) {
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector("h1").textContent = p.name;
        }
    };
}
let Person3 = class Person3 {
    constructor() {
        this.name = "Max";
        console.log("Creating person object...");
    }
};
Person3 = __decorate([
    WithTemplate("<h1>My Person Object</h1>", "app")
], Person3);
let Person4 = class Person4 {
    constructor() {
        this.name = "Max";
        console.log("Creating person object...");
    }
};
Person4 = __decorate([
    Logger,
    LoggerFactory("LOGGING - PERSON"),
    WithTemplate("<h1>My Person Object</h1>", "app")
], Person4);
function Log(target, propertyName) {
    console.log("Property decorator!!!");
    console.log(target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log("Accessor decorator!!!");
    console.log({ target, name, descriptor });
}
function Log3(target, name, descriptor) {
    console.log("Method decorator!!!");
    console.log({ target, name, descriptor });
}
function Log4(target, name, position) {
    console.log("Parameter decorator!!!");
    console.log({ target, name, position });
}
class Product {
    set price(val) {
        if (val > 0)
            this._price = val;
    }
    get price() {
        return this._price;
    }
    constructor(title, price) {
        this.title = title;
        this._price = price;
    }
    getPriceWithTax(tax) {
        console.log(this._price * (1 + tax));
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log
], Product.prototype, "_price", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
function WithTemplate1(template, hookId) {
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").textContent = this.name;
                }
            }
        };
    };
}
let Person5 = class Person5 {
    constructor() {
        this.name = "Max";
        console.log("Creating person object...");
    }
};
Person5 = __decorate([
    WithTemplate1("<h1>My Person Object</h1>", "app")
], Person5);
const NewestPerson = new Person5();
