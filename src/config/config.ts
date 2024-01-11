import { ConfigInterface } from '../interfaces/config.interface';

const config: ConfigInterface = {
    port: Number(process.env.PORT),
    env: String(process.env.NODE_ENV),
    imagesServer: String(process.env.IMAGES_SERVER),
    host_address: String(process.env.ADDRESS),
};

export default config;
