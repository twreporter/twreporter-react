module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      startServerCommand: 'make dev',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
