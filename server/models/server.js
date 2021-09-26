const express = require('express');
const cors = require('cors');
const rfs = require('rotating-file-stream');
const path = require('path');
const morgan = require('morgan');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.connectDB();
        this.middlewares();
        this.routes();

    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        const accessLogStream = rfs.createStream('access.log', {
            interval: '1d',
            path: path.join(__dirname, '../log')
        });

        this.app.use(morgan('combined', { stream: accessLogStream }));

        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/auth', require('../routes/auth'));
        this.app.use('/api/events',require('../routes/events'))
    }

    listen() {
        this.app.listen(this.port, _ => {
            console.log(`server running in port ${this.port}`)
        })
    }
}

module.exports = {
    Server
}
