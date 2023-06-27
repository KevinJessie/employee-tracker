INSERT INTO employee_tracker_db.department (name) 
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');
--
INSERT INTO employee_tracker_db.role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4);
--
INSERT INTO employee_tracker_db.employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
       ('Mike', 'Chan', 2, 1),
       ('Ashley', 'Rodriguez', 3, NULL),
       ('Kevin', 'Tupik', 4, 3),
       ('Malia', 'Brown', 5, NULL),
       ('Sarah', 'Lourd', 6, 5),
       ('Tom', 'Allen', 7, 5);
```


