SELECT employee_tracker_db, employee
FROM employee_tracker_db.employee
WHERE employee_tracker_db.employee.id = employee_tracker_db.employee.manager_id;