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
      target: 'lhci',
      serverBaseUrl: process.env.LHCI_SERVER_BASE_URL,
      token: process.env.LHCI_TOKEN,
      basicAuth: {
        username: process.env.LHCI_USERNAME,
        password: process.env.LHCI_PASSWORD,
      },
    },
  },
}
