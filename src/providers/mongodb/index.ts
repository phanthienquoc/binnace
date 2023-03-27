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
const connect = (
  options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  }
) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(connectionPath, options)
      .then((client: any) => {
        resolve(client);
        console.log('Successfully connected to database');
      })
      .catch((error: any) => {
        console.error(error);
        reject(error);
      });
  });
};

export default connect;
