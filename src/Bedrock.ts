import * as chokidar from 'chokidar';
import * as flags from 'flags';
import { JSDOM } from 'jsdom';

import { runner } from './runner';
import { BedrockConfig } from './config/default';
import { printWatching } from './logging';

const parseArguments = (): BedrockConfig => {
    flags.defineString('ext', 'spec', 'Test file extension');
    flags.defineBoolean('watch', false, 'Enable watch mode');
    flags.defineBoolean(
        'nodom',
        false,
        'Disable creation of global window and document (DOM) objects'
    );
    flags.defineBoolean(
        'nosumm',
        false,
        'Disable printing of failure summary details'
    );
    flags.parse();
    return {
        testFileExtension: flags.get('ext'),
        noSummary: flags.get('nosumm'),
        watchMode: flags.get('watch'),
        noDOM: flags.get('nodom'),
    };
};

const configureDOM = (noDOM: boolean) => {
    if (!noDOM) {
        global['window'] = new JSDOM().window;
        global['document'] = window.document;
    }
};

const watch = ({ testFileExtension, noSummary, watchMode }: BedrockConfig) => {
    printWatching();
    const watcher = chokidar.watch(process.cwd(), {
        usePolling: true,
        interval: 100,
    });
    let running = false;
    watcher.on('change', (event: string) => {
        if (!running) {
            running = true;
            runner(testFileExtension, noSummary, watchMode);
            running = false;
        }
    });
};

const BedRock = () => {
    const { testFileExtension, noSummary, watchMode, noDOM } = parseArguments();

    configureDOM(noDOM);

    runner(testFileExtension, noSummary, watchMode);

    if (watchMode) {
        watch({ testFileExtension, noSummary, watchMode, noDOM });
    }
};

export default BedRock;
