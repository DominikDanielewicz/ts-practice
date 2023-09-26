abstract class Department {
  // private readonly id: string;
  // public name: string;
  // Employees are private so only accessible from the inside of class only. So only methods from the class can wotk with it.
  // private employees: string[];
  static fiscalYear = 2023; //static methods and properties are detached from instances

  constructor(
    protected readonly id: string, //readonly so it shoudn't change after initialization
    public name: string,
    protected employees: string[] //protected so it's accesible in this class and in any class that extends this class
  ) {
    // this.name = name;
    // this.employees = employees;
  }

  static createEmployee(name: string) {
    console.log(this.fiscalYear); //We are inside static method so we have access to static propeties
    return { name };
  }

  // describe(this: Department) {
  //   console.log(`Department name: (${this.id}): ${this.name}`);
  //   // console.log(this.fiscalYear); //This is not static method so we don't have access to static propeties
  //   console.log(Department.fiscalYear);
  // }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    // this.id = "d2"; //error because readonly - I can't assign a new value
    this.employees.push(employee);

    // console.log(this.fiscalYear); //This is not static method so we don't have access to static propeties
    console.log(Department.fiscalYear);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// const accounting = new Department("1", "Accounting", ["John", "Ania"]); //Cannot create an instance of an abstract class
// console.log(accounting);

const employee1 = Department.createEmployee("Max");

//Inheritence
class ITDepartment extends Department {
  // public admins: string[];
  constructor(id: string, public admins: string[]) {
    super(id, "IT", ["John", "Ania"]);
    // this.admins = admins;
  }

  describe() {
    console.log("IT Department - ID:" + this.id);
  }
}

const accountingIT = new ITDepartment("1", ["admin1"]);
console.log(accountingIT);

class AccDepartment extends Department {
  private lastReport: string;
  private static instance: AccDepartment;
  //getter is property where you execute the function when you retreive a value

  get mostRecentReport() {
    //getter has to return something
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value");
    }
    this.addReport(value);
  }
  //Singleton pattern - ensuring that you have exactly only one instance of the certain class
  //Private constructors ensures that we can't call new on this
  private constructor(id: string, private reports: string[]) {
    super(id, "ACC", ["John", "Ania"]);
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccDepartment("1", ["report1", "report2"]);
    return this.instance;
  }

  //We can override a method from inheritted class
  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  describe() {
    console.log("Accounting Department - ID: " + this.id);
  }

  addReport(report: string) {
    this.reports.push(report);
    this.lastReport = this.reports[this.reports.length - 1];
  }

  getReport() {
    console.log(`Reports: ${this.reports}`);
  }
}

const accountingAcc = AccDepartment.getInstance();
const accountingAcc2 = AccDepartment.getInstance(); //Second instance is the same as previous, it's the same object.
accountingAcc.addReport("report3");
console.log(accountingAcc);

// const accountingAcc = new AccDepartment("1", ["report1", "report2"]);
// accountingAcc.addEmployee("Dom");
// console.log(accountingAcc);
// console.log(accountingAcc.mostRecentReport);
// accountingAcc.mostRecentReport = "report3";
// accountingAcc.getReport();
// console.log(accountingAcc.mostRecentReport);
// accounting.addEmployee("Max");
// accounting.addEmployee("Manu");

// accounting.employees[2] = "Anna"; //Error because employees property is private

// accounting.printEmployeeInformation();
// accounting.describe();

// const accountingCopy = {
//   name: "Accounting Second",
//   employees: ["Stefan"],
//   describe: accounting.describe,
//   addEmployee: accounting.addEmployee,
//   printEmployeeInformation: accounting.printEmployeeInformation,
// };
// accountingCopy.describe();
