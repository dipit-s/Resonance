import mongoose from 'mongoose';
const connection = {};
const dotenv = require("dotenv");

async function dbConnect() {

    if (connection.isConnected) {
        console.log("Database Connected Already");
        return;
    }
    const db = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    connection.isConnected = db.connections[0].readyState;

}

export default dbConnect;

