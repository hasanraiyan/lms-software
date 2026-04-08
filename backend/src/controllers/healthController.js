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

export default { getHealth };
