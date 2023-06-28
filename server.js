require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mysql = require('mysql2')
const inquirer = require('inquirer')

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Path: server.js
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_tracker_db',
    port: 3306
})



connection.connect(err => {
    if (err) throw err
    console.log('Connected to database')
}
)

app.post('/api/department', (req, res) => {
    const department = req.body
    connection.query('INSERT INTO department SET ?', department, (err, _result) => {
        if (err) throw err
        res.send('Department added')
    })
}
)

app.get('/api/department', (_req, res) => {
    connection.query('SELECT * FROM department', (err, result) => {
        if (err) throw err
        res.send(result)
    })
}
)

app.post('/api/role', (req, res) => {
    const role = req.body
    connection.query('INSERT INTO role SET ?', role, (err, _result) => {
        if (err) throw err
        res.send('Role added')
    })
}
)

app.get('/api/role', (_req, res) => {
    connection.query('SELECT * FROM role', (err, result) => {
        if (err) throw err
        res.send(result)
    })
}
)

app.post('/api/employee', (req, res) => {
    const employee = req.body
    connection.query('INSERT INTO employee SET ?', employee, (err, _result) => {
        if (err) throw err
        res.send('Employee added')
    })
}
)

app.get('/api/employee', (_req, res) => {
    connection.query('SELECT * FROM employee', (err, result) => {
        if (err) throw err
        res.send(result)
    })
}
)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
}
)

// Path: server.js
const start = () => {  
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all employees', 'View all departments', 'View all roles', 'Add employee', 'Add department', 'Add role', 'Update employee role', 'Exit']
        }
    ]).then(answer => {
        switch (answer.action) {
            case 'View all employees':
                viewAllEmployees()
                break
            case 'View all departments':
                viewAllDepartments()
                break
            case 'View all roles':
                viewAllRoles()
                break
            case 'Add employee':
                addEmployee()
                break
            case 'Add department':
                addDepartment()
                break
            case 'Add role':
                addRole()
                break
            case 'Update employee role':
                updateEmployeeRole()
                break
            case 'Exit':
                connection.end()
                break
        }
    })
}

// Path: server.js
const viewAllEmployees = () => {
    connection.query('SELECT * FROM employee', (err, result) => {
        if (err) throw err
        console.table(result)
        start()
    })
}

// Path: server.js
const viewAllDepartments = () => {
    connection.query('SELECT * FROM department', (err, result) => {
        if (err) throw err
        console.table(result)
        start()
    })
}

// Path: server.js
const viewAllRoles = () => {
    connection.query('SELECT * FROM role', (err, result) => {
        if (err) throw err
        console.table(result)
        start()
    })
}

// Path: server.js
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?"
        },
        {
            type: 'input',
            name: 'role_id',
            message: "What is the employee's role ID?"
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "What is the employee's manager ID?"
        }
    ]).then(answer => {
        connection.query('INSERT INTO employee SET ?', answer, (err, _result) => {
            if (err) throw err
            console.log('Employee added')
            start()
        })
    })
}

// Path: server.js
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the department's name?"
        }
    ]).then(answer => {
        connection.query('INSERT INTO department SET ?', answer, (err, _result) => {
            if (err) throw err
            console.log('Department added')
            start()
        })
    })
}

// Path: server.js
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: "What is the role's title?"
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the role's salary?"
        },
        {
            type: 'input',
            name: 'department_id',
            message: "What is the role's department ID?"
        }
    ]).then(answer => {
        connection.query('INSERT INTO role SET ?', answer, (err, _result) => {
            if (err) throw err
            console.log('Role added')
            start()
        })
    })
}

// Path: server.js
const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: "What is the employee's ID?"
        },
        {
            type: 'input',
            name: 'role_id',
            message: "What is the employee's new role ID?"
        }
    ]).then(answer => {
        connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.role_id, answer.id], (err, _result) => {
            if (err) throw err
            console.log('Employee role updated')
            start()
        })
    })
}


start()





