module.exports = {
  ci: {
    collect: {
      numberOfRuns: 5,
      url: ['http://localhost:3000/'],
      startServerCommand: 'make dev',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
