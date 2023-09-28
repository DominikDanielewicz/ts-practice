//Generic type is a type which is kind of connected with some other type and is really flexible regarding which exact type that other type is
const names: Array<string> = ["Max", "Manuel"]; //string[]

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done");
  }, 2000);
});

//Because Promise know the  generic type <string>. Generic types helps to get additional type information if you got more complex class or function that does something with the data that is coming in and to get better Typescript support when working with that generic type
promise.then((data) => {
  data.split(" ");
});
