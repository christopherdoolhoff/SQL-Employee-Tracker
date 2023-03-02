const inquirer = require("inquirer");
const connection = require("./config/connection");

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
      switch (data) {
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
        case "Add a Role":
          addARole();
          break;
        case "Add an Employee":
          addAnEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Quit":
          quit();
          break;
        default:
          console.log("Invalid response");
          start();
          break;
      }
    });
}

// View All Departments function
function viewAllDepartments(){
    connection.query('SELECT * FROM department', function (err, res){});
};

// View All Roles function
function viewAllRoles(){
    connection.query('SELECT * FROM role');
};

// View All Employees function
function viewAllEmployees(){
    connection.query('SELECT * FROM employee');
};

// Add a Department function
function addADepartment();

// Add a Role function
function addARole();

// Add an Employee function
function addAnEmployee();

// Update Employee Role function
function updateEmployeeRole();

// Quit application function
function quit();
