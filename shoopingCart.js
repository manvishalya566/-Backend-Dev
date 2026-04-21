const express = require('express');
const session = require('express-session');
const app = express();
app.use(express.json());

app.use(session({
    secret: 'cart-secret',
    resave: false,
    saveUninitialized: true
}));

const initCart = (req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
};

app.use(initCart);

app.post('/cart/add', (req, res) => {
    const { productId, name, price, quantity } = req.body;
    const itemIndex = req.session.cart.findIndex(i => i.productId === productId);

    if (itemIndex > -1) {
        req.session.cart[itemIndex].quantity += quantity;
    } else {
        req.session.cart.push({ productId, name, price, quantity });
    }
    res.json(req.session.cart);
});

app.put('/cart/update/:productId', (req, res) => {
    const item = req.session.cart.find(i => i.productId === req.params.productId);
    if (item) item.quantity = req.body.quantity;
    res.json(req.session.cart);
});

app.delete('/cart/remove/:productId', (req, res) => {
    req.session.cart = req.session.cart.filter(i => i.productId !== req.params.productId);
    res.json(req.session.cart);
});

app.get('/cart', (req, res) => {
    const total = req.session.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    res.json({ items: req.session.cart, totalPrice: total });
});

app.listen(3000);