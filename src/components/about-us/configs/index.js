import globalEnv from '../../../global-env'
import releaseBranch from '@twreporter/core/lib/constants/release-branch'

export const sections = {
  opening: 'opening',
  section1: 'section1',
  section2: 'section2',
  section3: 'section3',
  section4: 'section4',
  section5: 'section5'
}

const configUrlPrefix = 'https://about-us.twreporter.org'

const configs = {
  [releaseBranch.master]: {
    [sections.section2]: `${configUrlPrefix}/${sections.section2}.${releaseBranch.master}.json`,
    [sections.section3]: `${configUrlPrefix}/${sections.section3}.${releaseBranch.master}.json`,
    [sections.section4]: `${configUrlPrefix}/${sections.section4}.${releaseBranch.master}.json`,
    [sections.section5]: `${configUrlPrefix}/${sections.section5}.${releaseBranch.master}.json`
  },
  [releaseBranch.staging]: {
    [sections.section2]: `${configUrlPrefix}/${sections.section2}.${releaseBranch.staging}.json`,
    [sections.section3]: `${configUrlPrefix}/${sections.section3}.${releaseBranch.staging}.json`,
    [sections.section4]: `${configUrlPrefix}/${sections.section4}.${releaseBranch.staging}.json`,
    [sections.section5]: `${configUrlPrefix}/${sections.section5}.${releaseBranch.staging}.json`
  },
  [releaseBranch.release]: {
    [sections.section2]: `${configUrlPrefix}/${sections.section2}.${releaseBranch.release}.json`,
    [sections.section3]: `${configUrlPrefix}/${sections.section3}.${releaseBranch.release}.json`,
    [sections.section4]: `${configUrlPrefix}/${sections.section4}.${releaseBranch.release}.json`,
    [sections.section5]: `${configUrlPrefix}/${sections.section5}.${releaseBranch.release}.json` 
  }
}[globalEnv.releaseBranch]

export default configs

