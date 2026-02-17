const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const students = [
    { id: 1, name: "Srinidhi", age: 20, course: "CSE" },
    { id: 2, name: "Rahul", age: 21, course: "ECE" },
    { id: 3, name: "Anjali", age: 19, course: "IT" }
];

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Student Information Management System" });
});

app.get('/students', (req, res) => {
    res.json(students);
});

app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({ message: "Student not found. Invalid ID." });
    }

    res.json(student);
});

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});
