-- seed data for the department table
INSERT INTO department (name)
VALUES ("Sales"),
("Transportation"),
("Production"),
("Marketing");

-- seed data for the role table
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 110000, 1),
("Salesperson", 85000, 1),
("VP of Transportation", 230000, 2),
("Transportation Manager", 85000, 2),
("Plant Manager", 155000, 3),
("Market Analyst", 90000, 4),
("VP of Marketing", 150000, 4);

-- seed data for the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Shaw", 1, 3),
("Shawn", "Smith", 2, 1),
("Richard", "Walker", 3, null),
("Craig", "Runner", 4, 3),
("Hal", "Greene", 5, null),
("Shane", "Tompson", 7, null),
("Don", "Peterson", 6, 6),
("Kim", "Black", 2, 2),
("Sam", "Anderson", 3, 4);