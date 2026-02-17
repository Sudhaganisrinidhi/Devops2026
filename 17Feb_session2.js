const express = require('express');
const app = express();

const PORT = 3000;

/* MUST be before routes */
app.use(express.json());

let books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho", price: 499 },
    { id: 2, title: "Atomic Habits", author: "James Clear", price: 599 }
];

app.get('/books', (req, res) => {
    res.status(200).json(books);
});

app.post('/books', (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Request body is missing" });
    }

    const { title, author, price } = req.body;

    if (!title || !author || !price) {
        return res.status(400).json({
            message: "title, author and price are required"
        });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author,
        price
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const { title, author, price } = req.body;

    if (!title || !author || !price) {
        return res.status(400).json({ message: "All fields required" });
    }

    book.title = title;
    book.author = author;
    book.price = price;

    res.status(200).json(book);
});

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books.splice(index, 1);
    res.status(200).json({ message: "Book deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
