export const errorFormatter = {
  formatError(error, statusCode) {
    return {
      success: false,
      code: error.code || 'INTERNAL_ERROR',
      message: error.message || 'Internal server error',
      statusCode: statusCode || error.statusCode || 500,
    };
  },
};

export default errorFormatter;
