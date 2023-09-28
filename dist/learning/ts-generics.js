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
