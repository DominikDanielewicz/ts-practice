let age: number = 29;
age = 30;

let ageAsString: string = "twenty two";
ageAsString = "ten";
ageAsString = `${age}`;

console.log(ageAsString);

//Functions

const add = (v1: number, v2: number) => {
  return v1 + v2;
};

console.log(add(24, 50));

//Practice
const input1Element: HTMLInputElement = document.querySelector("#input1");
const input2Element: HTMLInputElement = document.querySelector("#input2");
const addbuttonElement: HTMLButtonElement =
  document.querySelector("#addButton");

addbuttonElement.addEventListener("click", () => {
  const sum = add(Number(input1Element.value), Number(input2Element.value));
  console.log(sum);
});

//Type inference
let age1 = 29;

const divide = (v1: number, v2: number) => v1 / v2;
divide(2, 2);

//Literal type
const age2 = 29;

//union types
const logAge = (age: number | string) => {
  console.log(`Hej mam ${age} lat!`);
};

logAge(28);
logAge("dwadzieścia osiem");

let test: string | number | boolean;
test = "test";
test = 21;
test = true;

//Boolean practice
const buyButtonElement: HTMLButtonElement =
  document.querySelector("#buyButton");

const calculatePrice = (
  originalPrice: number,
  hasDiscount: boolean = false
) => {
  return hasDiscount ? originalPrice * 0.8 : originalPrice;
};

buyButtonElement.addEventListener("click", () => {
  const originalPrice: number = 50;
  const hasDiscount: boolean = Boolean(
    new URLSearchParams(window.location.search).get("discount")
  );
  console.log(calculatePrice(originalPrice, hasDiscount));
});

// Array

// <li>
//   <label for="task-1">Wyrzucić śmieci</label>
//   <input type="checkbox" id="task-1" name="" />
// </li>;

const nameElement: HTMLInputElement = document.querySelector("#name");
const addTaskButton: HTMLButtonElement =
  document.querySelector("#addTaskButton");
const tasksList: HTMLUListElement = document.querySelector(".tasks");

const tasks: string[] = ["Wyrzucić śmieci", "Pójśc na siłkę", "Nakarmić koty"];

const render = () => {
  tasks.forEach((task, index) => {
    const taskElement: HTMLElement = document.createElement("li");
    taskElement.innerText = task;
    tasksList.appendChild(taskElement);
  });
};

const addTask = (task: string) => {};

render();
