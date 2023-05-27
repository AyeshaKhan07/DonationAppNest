export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  tokenKey: process.env.JWT_SECRET,
  tokenExpireTime: process.env.JWT_EXPIRATION_TIME,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    type: process.env.DB_CONNECTION,
    database: process.env.DATABASE,
  }
});