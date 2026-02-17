const express = require('express');
const app = express();
const PORT = 3000;

/* JSON body parsing */
app.use(express.json());

/* Logging middleware */
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

/* In-memory employee data */
let employees = [
    { id: 1, name: "Srinidhi", designation: "Software Engineer", salary: 50000 },
    { id: 2, name: "Rahul", designation: "Tester", salary: 40000 }
];

/* GET all employees */
app.get('/employees', (req, res) => {
    res.status(200).json(employees);
});

/* GET employee by ID */
app.get('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find(e => e.id === id);

    if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
});

/* POST add employee */
app.post('/employees', (req, res) => {
    const { name, designation, salary } = req.body;

    if (!name || !designation || !salary) {
        return res.status(400).json({
            message: "Name, designation and salary are required"
        });
    }

    const newEmployee = {
        id: employees.length + 1,
        name,
        designation,
        salary
    };

    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

/* PUT update employee */
app.put('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, designation, salary } = req.body;

    const employee = employees.find(e => e.id === id);

    if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
    }

    if (!name || !designation || !salary) {
        return res.status(400).json({
            message: "Name, designation and salary are required"
        });
    }

    employee.name = name;
    employee.designation = designation;
    employee.salary = salary;

    res.status(200).json(employee);
});

/* DELETE employee */
app.delete('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = employees.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Employee not found" });
    }

    employees.splice(index, 1);
    res.status(200).json({ message: "Employee deleted successfully" });
});

/* Error-handling middleware */
app.use((err, req, res, next) => {
    res.status(500).json({ message: "Internal Server Error" });
});

/* Server start */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
