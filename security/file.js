const session = require('express-session');
const MongoStore = require('connect-mongo');
app.use(
    session({
        secret: '4567',
        store: MongoStore.create({
            mongoURL: 'mongodb://localhost:27017/auth',
        }),
        cookie: {
            httpOnly: true,
            secure: false,
        },

    }),

);

