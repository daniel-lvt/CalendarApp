const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`DB is connect`)
    } catch (error) {
        console.log(error);
        throw new Error(`Error connection DB`);
    }
}

module.exports = {
    dbConnection
}