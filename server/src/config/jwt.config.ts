import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  SECRET: process.env.JWT_SECRET,
  EXPIRE_TIME: process.env.JWT_EXPIRE_TIME,
}));
