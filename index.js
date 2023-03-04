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
    const sql = 'SELECT * FROM department'
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    });
};

// View All Roles function
function viewAllRoles(){
    const sql = 'SELECT * FROM role'
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    });
};

// View All Employees function
function viewAllEmployees(){
    const sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, " " ,manager.last_name) AS Manager FROM employee INNER JOIN role on role.id = role_id INNER JOIN department on department.id = role.department_id left join employee manager on employee.manager_id = manager.id;'
    db.query(sql, (err, results) => {
        if (err) throw err;
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
        if (err) throw err;
        console.log(`successfully added department ${data.name}`)
        console.table(data);
        start();
    })
 
  });
};

// Add a Role function
function addARole(){
    db.query('SELECT role.title AS title, role.salary AS salary, role.department_id AS department FROM role',
    function (err, results) {
    inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: "Please enter a title for the new role",
    },
    {
        type: 'input',
        name: 'salary',
        message: "Please enter a salary for the new role",
    },
    {
        type: 'input',
        name: 'department',
        message: "Please enter the department ID number for the new role",
    },
  ])
  .then((data) => {
    const sql = 'INSERT INTO role SET ?'
    const newRole = {title: data.title, salary: data.salary, department_id: data.department}
    db.query(sql, newRole, (err) => {
        if (err) throw err;
        console.log(`successfully added role ${data.title}`)
        console.table(data);
        start();
    })
 
  });
});
};


// Add an Employee function
function addAnEmployee(){
    db.query('SELECT employee.first_name AS firstName, employee.last_name AS lastName, employee.role_id AS role, employee.manager_id AS manager FROM employee',
    function (err, results) {
    inquirer
  .prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "Please enter employee first name",
    },
    {
        type: 'input',
        name: 'lastName',
        message: "Please enter employee last name",
    },
    {
        type: 'input',
        name: 'role',
        message: "Please enter employee role ID number",
    },
    {
        type: 'input',
        name: 'manager',
        message: "Please enter employees managers ID number",
    },
  ])
  .then((data) => {
    const sql = 'INSERT INTO employee SET ?'
    const newEmployee = {first_name: data.firstName, last_name: data.lastName, role_id: data.role, manager_id: data.manager}
    db.query(sql, newEmployee, (err) => {
        if (err) throw err;
        console.log(`successfully added employee ${data.firstName} ${data.lastName}`)
        console.table(data);
        start();
    })
  });
});
};

// Update Employee Role function
function updateEmployeeRole()
{
    db.query('SELECT * FROM employee',
    function (err, results) {
    if (err) throw err;
    inquirer
  .prompt([
    {
        type: 'input',
        name: 'employee',
        message: "Please enter the employee ID number for the employee who's role you would like to update",
    },
    {
        type: 'input',
        name: 'role',
        message: "Please enter role ID number for the updated role",
    },
  ])
  .then((data) => {
    const sql = 'UPDATE employee SET ? WHERE id = '+data.employee
    const updateEmployeeRole = {role_id: data.role}
    db.query(sql, updateEmployeeRole, (err) => {
        if (err) throw err;
        console.log(`successfully added employee ${data.firstName} ${data.lastName}`)
        console.table(data);
        start();
    })
  });
});
};

// Quit application function
function quit(){
    db.end()
};

start();