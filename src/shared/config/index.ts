import * as dotenv from 'dotenv'
import { emptyToUndefined } from '../utils';
dotenv.config()

export default {
  NODE_ENV: emptyToUndefined(process.env.NODE_ENV),
  PORT: emptyToUndefined(process.env.PORT),
  mongo: {
    MONGO_USER: emptyToUndefined(process.env.MONGO_USER),
    MONGO_PW: emptyToUndefined(process.env.MONGO_PW),
    MONGO_DATABASE: emptyToUndefined(process.env.MONGO_DATABASE),
    MONGO_PORT: emptyToUndefined(process.env.MONGO_PORT),
  },
};
