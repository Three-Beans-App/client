module.exports = {
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleFileExtensions: ['js', 'jsx'],
    testEnvironment: "jsdom",
    transformIgnorePatterns: [
        'node_modules/(?!(axios)/)'
    ],
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
    }
};