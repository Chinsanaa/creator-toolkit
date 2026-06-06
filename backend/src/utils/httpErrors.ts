export const NOT_FOUND_CODE = 'NOT_FOUND';

export function notFoundBody(message = 'Route not found') {
  return {
    error: {
      status: 404,
      code: NOT_FOUND_CODE,
      message,
    },
  };
}
