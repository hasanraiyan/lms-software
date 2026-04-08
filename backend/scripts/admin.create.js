#!/usr/bin/env node
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import bcrypt from 'bcrypt';

import { config } from '../src/config/index.js';
import { database } from '../src/config/database.js';
import { loggerService } from '../src/utils/logger/loggerService.js';

async function ensureUserModel() {
  try {
    // Dynamically import so this template works before User is defined
    const module = await import('../src/models/User.js');
    return module.default || module.User;
  } catch (error) {
    const logger = loggerService.getLogger();
    logger.error('User model not found. Create src/models/User.js before using admin:create.', {
      error: error.message,
    });
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
}

async function promptCredentials() {
  const rl = readline.createInterface({ input, output });

  const email = await rl.question('Admin email: ');
  const password = await rl.question('Admin password: ');
  const name = await rl.question('Admin name (optional): ');

  await rl.close();
  return { email, password, name };
}

async function main() {
  const logger = loggerService.getLogger();

  const User = await ensureUserModel();

  await database.connect();
  logger.info('Connected to MongoDB', { uri: config.mongoUri });

  const { email, password, name } = await promptCredentials();

  const hashedPassword = await bcrypt.hash(password, 10);

  const update = {
    email,
    password: hashedPassword,
    role: 'admin',
  };

  if (name) {
    update.name = name;
  }

  const admin = await User.findOneAndUpdate({ email }, update, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });

  logger.info('Admin user created/updated', {
    id: admin.id,
    email: admin.email,
  });

  await database.disconnect();
  // eslint-disable-next-line no-process-exit
  process.exit(0);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to create admin user:', error);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});
