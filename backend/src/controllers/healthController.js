import mongoose from 'mongoose';
import { successFormatter } from '../utils/formatters/successFormatter.js';

export async function getHealth(req, res, next) {
  try {
    const data = {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
    const payload = successFormatter.formatSuccess(data, 'Health check OK', 'HEALTH_OK');
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
}

export async function getDbHealth(req, res, next) {
  try {
    const readyState = mongoose.connection.readyState;
    // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
    if (readyState === 1) {
      const data = {
        status: 'connected',
        readyState,
        timestamp: new Date().toISOString(),
      };
      const payload = successFormatter.formatSuccess(data, 'Database connection healthy', 'DB_HEALTH_OK');
      return res.status(200).json(payload);
    }

    return res.status(503).json({
      status: 'error',
      message: 'Database connection unavailable',
      readyState,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
}

export default { getHealth, getDbHealth };
