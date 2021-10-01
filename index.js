const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.PORT || 3001;

const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/user")
const ticketRoutes = require("./routes/ticket")
const tokensRoutes = require("./routes/tokens")
const errorHandler = require('./utils/errorHandler')


mongoose.connect(process.env.DATABASE);


if (process.env.NODE_ENV !== 'production') {
    const mConnection = mongoose.connection;
    mConnection.on("open", () => {
        console.log("Mongo db is connected!");
    });
    mConnection.on("error", (error) => {

    })
}

app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/v1/user', userRoutes);
app.use('/v1/tickets', ticketRoutes);
app.use('/v1/tokens', tokensRoutes);

app.use('*', (req, res, next) => {
    const error = new Error('Route is not found');
    error.status = 404;

    next(error);
});

app.use((error, req, res, next) => {
    errorHandler(error, res);
});

app.listen(port, () => {
    console.log(`API is ready on http://localhost:${port}`)
})