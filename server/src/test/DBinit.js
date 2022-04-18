import mongoose from 'mongoose';
import config from 'config';

mongoose.connect(config.DBHost, { useNewUrlParser: true })
.then(() => {
    /* Drop the DB */
    mongoose.connection.db.dropDatabase();
    console.log('database dropped!');
    process.exit(0);
});

