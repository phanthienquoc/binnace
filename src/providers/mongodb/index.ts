import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ServerApiVersion } from 'mongodb';

dotenv.config();
const MONGO_DB_ID: any = process.env.MONGO_DB_ID;
const MONGO_DB_PASSWORD: any = process.env.MONGO_DB_PASSWORD;

const username = encodeURIComponent(MONGO_DB_ID);
const password = encodeURIComponent(MONGO_DB_PASSWORD);
const connectionPath = `mongodb+srv://${username}:${password}@cluster0.azidmek.mongodb.net/?retryWrites=true&w=majority`;

console.log(connectionPath);
class MongoDB {
  db: any;
  constructor() {}
  public static async initialize(): Promise<MongoDB> {
    const instance = new MongoDB();
    try {
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      };
      instance.db = await mongoose.connect(connectionPath, options);
      // console.log('Successfully connected to database');
    } catch (error) {
      console.error(error);
    }

    return instance;
  }
}

export default MongoDB;
