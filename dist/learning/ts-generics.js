"use strict";
const names = ["Max", "Manuel"];
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("This is done");
    }, 2000);
});
promise.then((data) => {
    data.split(" ");
});
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergeObj = merge({ name: "Max" }, { age: 30 });
mergeObj.age;
function merge2(objA, objB) {
    return Object.assign(objA, objB);
}
const mergeObj2 = merge2({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log(mergeObj2.age);
function merge3(objA, objB) {
    return Object.assign(objA, objB);
}
function countAndDescribe(element) {
    let descriptionText = "Got no value.";
    if (element.length === 1) {
        descriptionText = "Got 1 element.";
    }
    else if (element.length > 1) {
        descriptionText = "Got " + element.length + " elements.";
    }
    return [element, descriptionText];
}
console.log(countAndDescribe("Hi there"));
console.log(countAndDescribe(["Sport", "Cooking"]));
const extractAndConvert = (obj, key) => {
};
const extractAndConvert1 = (obj, key) => {
    return obj[key];
};
extractAndConvert1({ name: "Max" }, "name");
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Manu");
textStorage.getItems();
const numberStorage = new DataStorage();
const mixStorage = new DataStorage();
function createCourseGoal(title, description, completeUntil) {
    return { title, description, completeUntil };
}
function createCourseGoal1(title, description, completeUntil) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = completeUntil;
    return courseGoal;
}
const allNames = ["Max", "Anna"];
