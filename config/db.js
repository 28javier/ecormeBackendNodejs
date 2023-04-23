const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.URI_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log('On Run BDD \x1b[32m%s\x1b[0m', 'Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la BDD')
    }
}


module.exports = {
    dbConnection,
};