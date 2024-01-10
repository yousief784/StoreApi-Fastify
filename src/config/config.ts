import { ConfigInterface } from '../interfaces/config.interface';
import { NODE_ENV_ENUM } from '../utils/enums';

// const schema = {
//     type: 'object',
//     required: ['PORT'],
//     properties: {
//         PORT: {
//             type: 'integer',
//         },
//         NODE_ENV: {
//             type: 'string',
//         },
//         DATABASE_URL: {
//             type: 'string',
//         },
//     },
// };

// export const configOptions = {
//     confKey: 'config',
//     schema,
//     dotenv: true,
//     data: process.env,
// };

const config: ConfigInterface = {
    port: Number(process.env.PORT),
    env: String(process.env.NODE_ENV),
    imagesServer: String(process.env.IMAGES_SERVER),
};

export default config;
