import mongoose from 'mongoose';
import 'dotenv/config';

const mongoClient = await mongoose.connect(process.env.MONGO_URI)

export default mongoClient;
