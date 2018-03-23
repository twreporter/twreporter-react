import groupBy from 'lodash/groupBy'
import awardJsonData from './awards.json'

const _ = {
  groupBy
}

export const awardsData = _.groupBy(awardJsonData, award => award.awardId)

const awards = [
  {
    award: 'SOPA亞洲出版協會',
    awardEng: 'The Society of Publishers in Asia',
    imageSrc: 'https://storage.googleapis.com/twreporter-multimedia/images/20180226181154-1ec4f6d1edf3c17f0729e54990370cd7-mobile.jpg',
    works: awardsData.sopa
  },
  {
    award: '台海新聞攝影大賽',
    awardEng: 'Tai Hai Press Photo Contest',
    imageSrc: 'https://storage.googleapis.com/twreporter-multimedia/images/20180213160041-cd39f2c06571270dc521b22b69277630-mobile.jpg',
    works: awardsData.taiHai
  },
  {
    award: '人權新聞獎',
    awardEng: 'Human Rights Press Awards',
    imageSrc: 'https://storage.googleapis.com/twreporter-multimedia/images/20180207192456-edff117989b8e0860ae2a9b37b94af78-mobile.jpg',
    works: awardsData.humanRights
  },
  {
    award: '卓越新聞獎',
    awardEng: 'Excellent Journalism Award',
    imageSrc: 'https://storage.googleapis.com/twreporter-multimedia/images/20171130151920-1ffc3c75249f91e4cd93199b12729934-mobile.jpg',
    works: awardsData.excellence
  },
  {
    award: '酷摩沙獎',
    awardEng: 'QUEERMOSA Award',
    imageSrc: 'https://storage.googleapis.com/twreporter-multimedia/images/20171123180202-9ad6589ca02000ea603f4aa91806b1ba-mobile.jpg',
    works: awardsData.queermosa
  },
  {
    award: '平冤年度新聞獎',
    awardEng: 'Taiwan Innocence Press Awards',
    imageSrc: 'https://storage.googleapis.com/twreporter-multimedia/images/20171116191537-52b0d9f0883b33616113847316d84b1d-mobile.jpg',
    works: awardsData.twInnocence
  },
  {
    award: '台灣新聞攝影大賽',
    awardEng: 'Taiwan Press Photo Contest',
    imageSrc: 'https://storage.googleapis.com/twreporter-multimedia/images/20171110202309-c75403381a2ab673dc77852835376c07-mobile.jpg',
    works: awardsData.twPressPhoto
  }
]

export default awards
