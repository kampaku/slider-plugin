import { defaults } from 'jest-config';
import type { Config } from '@jest/types';

// Синхронно загружаемый конфиг
const config: Config.InitialOptions = {
  // moduleFileExtensions: [
  //   ...defaults.moduleFileExtensions,
  //   'ts',
  //   'tsx',
  //   'json',
  //   'node',
  // ],
  verbose: true,
  // extensionsToTreatAsEsm: ['.ts'],
  preset: 'ts-jest'
};
export default config;

// // Или с помощью асинхронной функции
// export default async (): Promise<Config.InitialOptions> => {
//   return {
//     verbose: true,
//     preset: 'ts-jest'
//   };
// };
