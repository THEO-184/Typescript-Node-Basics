import mongoose from "mongoose";
import config from "config";

const connectDB = (url: string) => {
	return mongoose.connect(url);
};

export default connectDB;
