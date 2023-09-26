"use strict";
class Department {
    constructor(id, name, employees) {
        this.id = id;
        this.name = name;
        this.employees = employees;
    }
    static createEmployee(name) {
        console.log(this.fiscalYear);
        return { name };
    }
    addEmployee(employee) {
        this.employees.push(employee);
        console.log(Department.fiscalYear);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = 2023;
const employee1 = Department.createEmployee("Max");
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT", ["John", "Ania"]);
        this.admins = admins;
    }
    describe() {
        console.log("IT Department - ID:" + this.id);
    }
}
const accountingIT = new ITDepartment("1", ["admin1"]);
console.log(accountingIT);
class AccDepartment extends Department {
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No report found.");
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error("Please pass in a valid value");
        }
        this.addReport(value);
    }
    constructor(id, reports) {
        super(id, "ACC", ["John", "Ania"]);
        this.reports = reports;
        this.lastReport = reports[0];
    }
    static getInstance() {
        if (AccDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccDepartment("1", ["report1", "report2"]);
        return this.instance;
    }
    addEmployee(name) {
        if (name === "Max") {
            return;
        }
        this.employees.push(name);
    }
    describe() {
        console.log("Accounting Department - ID: " + this.id);
    }
    addReport(report) {
        this.reports.push(report);
        this.lastReport = this.reports[this.reports.length - 1];
    }
    getReport() {
        console.log(`Reports: ${this.reports}`);
    }
}
const accountingAcc = AccDepartment.getInstance();
const accountingAcc2 = AccDepartment.getInstance();
accountingAcc.addReport("report3");
console.log(accountingAcc);
