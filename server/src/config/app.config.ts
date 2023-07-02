import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  FRONTEND_APP_URL: process.env.FRONTEND_APP_URL,
  BACKEND_APP_URL: process.env.BACKEND_APP_URL,
  APP_NAME: process.env.APP_NAME,
}));
