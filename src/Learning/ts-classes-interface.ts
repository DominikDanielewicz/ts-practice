class Department {
  //   name: string;
  // Employees are private so only accessible from the inside of class only. So only methods from the class can wotk with it.
  //   private employees: string[];

  constructor(
    private id: string,
    public name: string,
    private employees: string[]
  ) {
    // this.name = name;
    // this.employees = employees;
  }

  describe(this: Department) {
    console.log(`Department name: (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("1", "Accounting", ["John", "Ania"]);
console.log(accounting);

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

// accounting.employees[2] = "Anna"; //Error because employees property is private

accounting.printEmployeeInformation();
accounting.describe();

// const accountingCopy = {
//   name: "Accounting Second",
//   employees: ["Stefan"],
//   describe: accounting.describe,
//   addEmployee: accounting.addEmployee,
//   printEmployeeInformation: accounting.printEmployeeInformation,
// };
// accountingCopy.describe();
