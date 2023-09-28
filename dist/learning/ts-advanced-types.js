"use strict";
const e1 = {
    name: "Max",
    privileges: ["create-server"],
    startDate: new Date(),
};
function addNumbers1(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
function printEmployeeInformation(emp) {
    console.log("Name: " + emp.name);
    if ("privileges" in emp) {
        console.log("Privileges:" + emp.privileges);
    }
    if ("startDate" in emp) {
        console.log("Start date:" + emp.startDate);
    }
}
printEmployeeInformation(e1);
printEmployeeInformation({ name: "Manu", startDate: new Date() });
class Car {
    drive() {
        console.log("Driving...");
    }
}
class Truck {
    drive() {
        console.log("Driving truck...");
    }
    loadCargo(amount) {
        console.log("Loading cargo..." + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log("Moving at speed " + speed);
}
moveAnimal({ type: "bird", flyingSpeed: 100 });
const paragraph = document.querySelector("p");
const paragraphById = document.querySelector("#message-output");
const paragraphById1 = document.getElementById("message-output");
const nameInputElement = document.querySelector("#input-name");
const nameInputElement1 = (document.querySelector("#input-name"));
const nameInputElement2 = document.querySelector("#input-name");
const nameInputElementValue2 = nameInputElement2.value;
const nameInputElement3 = document.querySelector("#input-name");
if (nameInputElement3) {
    nameInputElement3.value = "Hi there";
}
const errorBag = {
    email: "Not a valid email",
    username: "Must start with a character!",
};
function addNumbers2(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
const addingResult = addNumbers2("Max", "Dom");
const fetchedUserData = {
    id: "u1",
    name: "Max",
};
const adminInput = "";
const storedData = adminInput !== null && adminInput !== void 0 ? adminInput : "DEFAULT";
console.log(storedData);
