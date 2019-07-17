import releaseBranch from './release-branch'

const forServerSideRendering = {
  [releaseBranch.master]: {
    // accounts: 'http://localhost:3001',
    api: 'http://localhost:8080'
    // main: 'http://localhost:3000'
    // support: 'http://localhost:3001'
  },
  [releaseBranch.test]: {
    api: 'http://localhost:8080'
  },
  [releaseBranch.staging]: {
    api: 'http://go-api:8080'
  },
  [releaseBranch.preview]: {
    api: 'http://go-api:8080'
  },
  [releaseBranch.release]: {
    api: 'http://go-api:8080'
  }
}

const forClientSideRendering = {
  [releaseBranch.master]: forServerSideRendering.master,
  [releaseBranch.test]: forServerSideRendering.test,
  [releaseBranch.staging]: {
    api: 'https://staging-go-api.twreporter.org:443'
  },
  [releaseBranch.preview]: {
    api: 'https://staging-go-api.twreporter.org:443'
  },
  [releaseBranch.release]: {
    api: 'https://go-api.twreporter.org:443'
  }
}

export default {
  forClientSideRendering,
  forServerSideRendering
}
