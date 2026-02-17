const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let students = [
    { id: 1, name: "Srinidhi", department: "CSE" },
    { id: 2, name: "Rahul", department: "ECE" }
];

app.get('/students', (req, res) => {
    res.status(200).json(students);
});

app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
});

app.post('/students', (req, res) => {
    const { name, department } = req.body;

    if (!name || !department) {
        return res.status(400).json({
            message: "Name and department are required"
        });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        department
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, department } = req.body;

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    if (!name || !department) {
        return res.status(400).json({
            message: "Name and department are required"
        });
    }

    student.name = name;
    student.department = department;

    res.status(200).json(student);
});

app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(index, 1);
    res.status(200).json({ message: "Student deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
