"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const config = require('./config');
console.log(config);
// Create MongoDB connection URI
const mongoURI = `mongodb+srv://${config.username}:${config.password}@${config.host}/?retryWrites=true&w=majority&appName=${config.clusterName}`;
// Connect to MongoDB using Mongoose
const dbConnection = {
    authenticate: () => {
        return mongoose
            .connect(mongoURI, {
            useNewUrlParser: config.useNewUrlParser,
            useUnifiedTopology: config.useUnifiedTopology,
        })
            .then(() => {
            console.log('Connection to MongoDB has been established successfully');
        })
            .catch((err) => {
            console.error('Unable to connect to MongoDB:', err);
            throw err;
        });
    },
};
exports.default = dbConnection;
//# sourceMappingURL=db.js.map