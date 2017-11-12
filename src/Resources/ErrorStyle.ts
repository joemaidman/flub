export const ErrorStyle = {
    'pretty-error > header > title > kind': {
        display: 'none'
    },
    'pretty-error > header > colon': {
        display: 'none'
    },
    'pretty-error > header > message': {
        display: 'none'
    },
    'pretty-error > trace > item > header > pointer > file': {
        color: 'cyan'
    },
    'pretty-error > trace > item > header > pointer > colon': {
        color: 'cyan'
    },
    'pretty-error > trace > item > header > pointer > line': {
        color: 'cyan'
    },
    'pretty-error > trace > item': {
        display: 'block',
        marginBottom: 0,
        marginLeft: 2,
        bullet: '"<grey></grey>"'
    },
    'pretty-error > trace': {
        display: 'block',
        marginTop: 0
    }
};