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
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  moduleNameMapper: { "\\.(css|less)$": "<rootDir>/test/__mocks__/styleMock.js" }
};
export default config;

// // Или с помощью асинхронной функции
// export default async (): Promise<Config.InitialOptions> => {
//   return {
//     verbose: true,
//     preset: 'ts-jest'
//   };
// };
