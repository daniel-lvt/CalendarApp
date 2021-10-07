const express = require('express');
const cors = require('cors');
const rfs = require('rotating-file-stream');
const path = require('path');
const morgan = require('morgan');
const { dbConnection } = require('../database/config');
const { ipAddres } = require('../utils/dataIp');
const { dateNow } = require('../utils/time');

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

        this.app.set('trust proxy', true);

        const accessLogStream = rfs.createStream('access.log', {
            interval: '1d',
            path: path.join(__dirname, '../log')
        });


        morgan.token('user', (req) => {
            const info = req?.name + '-'+req?.rol+'-' + req?.uid;
            return info;
        })
        morgan.token('ip', () => (ipAddres()));
        morgan.token('time', () => (dateNow()))

        this.app.use(morgan('User [:user],Date [:time],Method[:method],Url[:url],Status[:status],Time[:response-time ms],Ip[:ip]', { stream: accessLogStream }));

        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/auth', require('../routes/auth'));
        this.app.use('/api/events', require('../routes/events'));
        this.app.use('/api/users', require('../routes/user'));
        this.app.use('/api/config', require('../routes/config'));
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
