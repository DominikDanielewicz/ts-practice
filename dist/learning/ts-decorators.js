"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
