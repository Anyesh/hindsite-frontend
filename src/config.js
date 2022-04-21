export const ROOT_API =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api'
    : process.env.PROD_API;
