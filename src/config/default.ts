import { BedrockConfig } from './Config';

const config: BedrockConfig = {
  testFileExtension: 'spec',
  watchMode: false,
  noSummary: false,
  noDOM: false,
  ignorePaths: ['node_modules']
};

export default config;