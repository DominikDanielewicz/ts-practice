"use strict";
let user1;
user1 = {
    name: "Adam",
    age: 43,
    greet(phrase) {
        console.log(phrase + " " + this.name);
    },
};
user1.greet("Hello");
class Persons {
    constructor(name, surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }
    greet(phrase) {
        console.log(phrase + " " + this.name);
    }
}
let user2;
user2 = new Persons("Max", "Lo", 23);
user2.greet("Hi");
class SecondPerson {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }
    greet(phrase) {
        console.log(phrase);
    }
}
let addTwoNumbers;
addTwoNumbers = (n1, n2) => {
    return n1 + n2;
};
let addTwoNumbersInt;
addTwoNumbersInt = (n1, n2) => {
    return n1 + n2;
};
class Animal {
    constructor(species, height, legs) {
        this.species = species;
        this.height = height;
        if (legs) {
            this.legs = legs;
        }
    }
}
const dog = new Animal("dog", 1);
