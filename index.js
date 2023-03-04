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
    const sql = 'SELECT * FROM role'
    db.query(sql, (err, results) => {
        console.table(results);
        start();
    });
};

// View All Employees function
function viewAllEmployees(){
    const sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, " " ,manager.last_name) AS Manager FROM employee INNER JOIN role on role.id = role_id INNER JOIN department on department.id = role.department_id left join employee manager on employee.manager_id = manager.id;'
    db.query(sql, (err, results) => {
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
    const sql = 'INSERT INTO department SET ?'
    const newDepartment = {name: data.name}
    db.query(sql, newDepartment, (err, results) => {
        console.log(`successfully added department ${data.name}`)
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