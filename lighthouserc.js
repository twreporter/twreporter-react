module.exports = {
  ci: {
    collect: {
      numberOfRuns: 5,
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/a/russian-invasion-of-ukraine-2022-kid-frequently-asked-questions',
      ],
      startServerCommand: 'make dev',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
