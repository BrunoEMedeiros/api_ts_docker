
import cors from 'cors';
const allowedOrigins = ['http://localhost:3000','http://10.90.14.40:3000'];

export const options: cors.CorsOptions = {
  origin: allowedOrigins
};

