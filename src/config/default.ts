export interface FlubConfig {
    testFileExtension: string;
    watchMode: boolean;
    noSummary: boolean;
    noDOM: boolean;
    ignorePaths?: string[];
}

export const defaultConfig: FlubConfig = {
    testFileExtension: 'spec',
    watchMode: false,
    noSummary: false,
    noDOM: false,
    ignorePaths: ['node_modules'],
};
