const mongoose = require('mongoose');

const connectionString = 'mongodb://dantist1122:erjovo7015%21@firstproject-shard-00-00-ljbx2.mongodb.net:27017,firstproject-shard-00-01-ljbx2.mongodb.net:27017,firstproject-shard-00-02-ljbx2.mongodb.net:27017/vibr?ssl=true&replicaSet=FirstProject-shard-0&authSource=admin&retryWrites=true';
const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    autoIndex: false,
};

function mongoConnection() {
    mongoose
        .connect(
            connectionString,
            options,
        )
        .catch(err => console.log(err));

    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose default connection disconnected');
    });
}

module.exports = {
    mongoConnection: mongoConnection
};