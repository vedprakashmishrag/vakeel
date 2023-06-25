import mongoose from "mongoose";
const connectDB = async (DATABASE_URL) => {
    try {
         mongoose.set('strictQuery', true);
        const DB_OPTIONS = {
            dbName: "vakeel",
        };
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log('connected to mongoDB');
       
//mongoose.set('debug', true);
    } catch (err) {
        console.log('error connecting to mongoDB: ', err);
    }
};

export default connectDB;
