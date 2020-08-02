const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const analyticRouter = require('./routes/analytic');
const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/category');
const orderRouter = require('./routes/order');
const positionRouter = require('./routes/position');

const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('MongoDb is connected'))
    .catch(error => console.log(error));

app.use(passport.initialize({}));
require('./middleware/passport')(passport);

app.use(express.json());
app.use(require('morgan')('dev'));
app.use(require('cors')());

app.use('/api/analytics', analyticRouter);
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/order', orderRouter);
app.use('/api/position', positionRouter);

module.exports = app;
