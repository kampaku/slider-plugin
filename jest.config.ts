import { defaults } from 'jest-config';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  moduleNameMapper: { "\\.(css|scss|less)$": "<rootDir>/test/__mocks__/styleMock.js" }
};
export default config;
