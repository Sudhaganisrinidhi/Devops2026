const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
    { id: 1, name: "Laptop", price: 60000, quantity: 10 },
    { id: 2, name: "Mouse", price: 500, quantity: 50 }
];

app.get('/products', (req, res) => {
    res.status(200).json(products);
});

app.post('/products', (req, res) => {
    const { id, name, price, quantity } = req.body;

    if (!id || !name || !price || !quantity) {
        return res.status(400).json({
            message: "All fields (id, name, price, quantity) are required"
        });
    }

    const existingProduct = products.find(p => p.id === id);
    if (existingProduct) {
        return res.status(400).json({
            message: "Product with this ID already exists"
        });
    }

    const newProduct = { id, name, price, quantity };
    products.push(newProduct);

    res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price, quantity } = req.body;

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    if (!name || !price || !quantity) {
        return res.status(400).json({
            message: "All fields (name, price, quantity) are required"
        });
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    res.status(200).json(product);
});

app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    products.splice(index, 1);
    res.status(200).json({ message: "Product deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
