module.exports = {
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleFileExtensions: ['js', 'jsx'],
    testEnvironment: "jsdom",
    transformIgnorePatterns: [
        'node_modules/(?!(axios)/)'
    ]
};