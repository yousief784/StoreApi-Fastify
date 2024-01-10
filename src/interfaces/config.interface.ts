import { NODE_ENV_ENUM } from '../utils/enums';

export interface ConfigInterface {
    port: number;
    env: string;
    imagesServer: string;
}
