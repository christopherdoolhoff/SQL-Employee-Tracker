const inquirer = require("inquirer");
const db = require("./config/connection");

// start application
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update Employee Role",
        "Quit",
      ],
    })
    .then((data) => {
      switch (data.action) {
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add a Department":
          addADepartment();
          break;
        // case "Add a Role":
        //   addARole();
        //   break;
        // case "Add an Employee":
        //   addAnEmployee();
        //   break;
        // case "Update Employee Role":
        //   updateEmployeeRole();
        //   break;
        // case "Quit":
        //   quit();
        //   break;
        default:
          console.log("Invalid response");
          start();
          break;
      }
    });
}

// View All Departments function
function viewAllDepartments(){
    const sql = 'SELECT * FROM department'
    db.query(sql, (err, results) => {
        console.table(results);
        start();
    });
};

// View All Roles function
function viewAllRoles(){
    db.query('SELECT * FROM role', function (err, results){
        console.table(results);
        start();
    });
};

// View All Employees function
function viewAllEmployees(){
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS Job_Title, department.name AS Department, role.salary AS Salary, employee.manager_id', function (err, results){
        console.table(results);
        start();
    });
};

// Add a Department function
function addADepartment(){
    inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: "Please enter a name for new department",
    },
  ])
  .then((data) => {
    db.query('INSERT INTO department (name) VALUES (?)', {name: data.name}, function (err, results){
        console.table(results);
        start();
    })
 
  });
};

// // Add a Role function
// function addARole();

// // Add an Employee function
// function addAnEmployee();

// // Update Employee Role function
// function updateEmployeeRole();

// // Quit application function
// function quit();

start();