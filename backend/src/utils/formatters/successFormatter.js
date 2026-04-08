export const successFormatter = {
  formatSuccess(data, message = 'Success', code = 'OK') {
    return {
      success: true,
      code,
      message,
      data,
    };
  },
};

export default successFormatter;
