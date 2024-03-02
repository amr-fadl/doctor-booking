const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URL);
       console.log('mongodb is connect');
    } catch (error) {
        console.log('mongodb is not connect ' + error);
    }
}

export default dbConnect;