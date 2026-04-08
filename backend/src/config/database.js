import mongoose from 'mongoose';
import { config } from './index.js';

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    if (this.connection) {
      return this.connection;
    }

    mongoose.set('strictQuery', true);

    this.connection = await mongoose.connect(config.mongoUri, {
      autoIndex: true,
    });

    return this.connection;
  }

  async disconnect() {
    if (!this.connection) return;
    await mongoose.disconnect();
    this.connection = null;
  }
}

export const database = new Database();

export default database;
