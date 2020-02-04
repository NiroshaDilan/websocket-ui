import { environment as defaultEnvironment} from './enviroment.default';

export const environment = {
  ...defaultEnvironment,
  production: true,
  log: false,
  flags: {
    useNewHeader: false
  }
};
