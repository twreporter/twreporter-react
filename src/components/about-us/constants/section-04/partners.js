import { storageUrlPrefix } from '../../utils/config'

const fileName = {
  eventGIJN:'Section04-Event-GIJN.png',
  eventJapan: 'Section04-Event-Japan.png',
  eventKAS: 'Section04-Event-KAS.png',
  eventNipal: 'Section04-Event-Nipal.png',
  eventTempo: 'Section04-Event-Tempo.png',
  logoGijn: 'intl-co-GIJN-logo.png',
  logoKas: 'intl-co-kas-logo.png',
  logoTempo: 'intl-co-tempo-logo.png',
  logoWaseda: 'intl-co-waseda-logo.png'
}

const partners = [
  {
    partnerId: 'GIJN',
    name:{
      chinese: '國際調查記者聯盟',
      english: 'GIJN'
    },
    description: {
      chinese: '參加由「國際調查記者聯盟」（GIJN）、「韩国调查记者中心」（Korea Center for Investigative Journalism）與「德國KAS基金會」（Konrad-Adenauer-Stiftung）主辦的第三屆「揭開亞洲」（Uncovering Asia）大會',
      english: ''
    },
    date: '2018.10.5',
    photo: storageUrlPrefix + '/' + fileName.eventNipal,
    logo: storageUrlPrefix + '/' + fileName.logoGijn,
    link: 'http://gijn.org/2017/06/29/gijn-adds-ten-new-members/?mc_cid=ae2b5d1553&mc_eid=235dec6d47'
  },  
  {
    partnerId: 'GIJN',
    name: {
      chinese: '國際調查記者聯盟',
      english: 'GIJN'
    },
    description: {
      chinese: '《報導者》成為華文世界第一個參與「國際調查記者聯盟」的成員（GIJN是一個涵蓋68個國家、155個非營利新聞組織的協會），《報導者》將繼續為國際調查媒體社群貢獻更多力量。',
      english: 'The Reporter becomes a member of GIJN(Global Investigative Journalism Network), first in Manderin speaking world. The Reporter will be an new force of the internation investigative jouralism network.'
    },
    date: '2017.6.28',
    photo: storageUrlPrefix + '/' + fileName.eventGIJN,
    logo: storageUrlPrefix + '/' + fileName.logoGijn,
    link: 'http://gijn.org/2017/06/29/gijn-adds-ten-new-members/?mc_cid=ae2b5d1553&mc_eid=235dec6d47'
  },
  {
    partnerId: 'GIJN',
    name:{
      chinese: '國際調查記者聯盟',
      english: 'GIJN'
    },
    description: {
      chinese: '參加尼泊爾加德滿都「國際調查記者聯盟」（Global Investigative Journalism Network,GIJN）第二屆「揭開亞洲」（Uncovering Asia）大會。',
      english: 'Attended the Second Asian Investigative Journalism Conference "Uncovering Asia" in Kathmandu, Nepa, hosted by the Global Investigative Journalism Network, the Centre for Investigative Journalism, Nepal, and the Konrad-Adenauer-Stiftung.'
    },
    date: '2016.9.23',
    photo: storageUrlPrefix + '/' + fileName.eventNipal,
    logo: storageUrlPrefix + '/' + fileName.logoGijn,
    link: 'https://www.facebook.com/photo.php?fbid=1488606891166286&set=a.328937367133250.100488.100000509688340&type=3&theater'
  },
  {
    partnerId: 'KAS',
    name:{
      chinese: '德國艾德諾基金會',
      english: 'KAS'
    },
    description: {
      chinese: '《報導者》受長期支持「國際調查記者聯盟」（GIJN）的組織「德國KAS基金會」（Konrad-Adenauer-Stiftung）邀請，與日本、韓國、香港、外蒙古、尼泊爾、巴基斯坦、印度、印尼等調查記者，在德國埃森討論跨國調查合作的議題與經驗。',
      english: ''
    },
    date: '2018.3',
    photo: storageUrlPrefix + '/' + fileName.eventKAS,
    logo: storageUrlPrefix + '/' + fileName.logoKas,
    link: 'http://gijn.org/2017/06/29/gijn-adds-ten-new-members/?mc_cid=ae2b5d1553&mc_eid=235dec6d47'
  },  
  {
    partnerId: 'Waseda',
    name:{
      chinese: '日本調查報導媒體',
      english: 'Waseda Chronicle'
    },
    description: {
      chinese: '受邀至日本早稻田大學參與「亞洲區域調查報導：展望與機會」（Investigative Journalism in the Asia Region: Perspectives and Prospects）國際會議演講與座談。',
      english: 'Invited by Waseda University to join internation conference and seminars of Investigative Journalism in the Asia Region: Perspectives and Prospects'     
    },
    date: '2017.6.4',
    photo: storageUrlPrefix + '/' + fileName.eventJapan,
    logo: storageUrlPrefix + '/' + fileName.logoWaseda,
    link: 'http://gijn.org/2017/07/06/investigative-journalism-in-japan-tough-times-but-signs-of-hope/'
  },
  {
    partnerId: 'Tempo',
    name:{
      chinese: '印尼調查媒體',
      english: 'Tempo'
    },
    description: {
      chinese: '發表年度調查報導《造假．剝削．血淚漁場──直擊台灣遠洋漁業真相》，與印尼知名調查媒體《Tempo》進行跨國合作。',
      english: 'Published Investigative Report of the Year "Fraud, Exploitation, Blood and Tears in Far Sea Fishery," a result of collaboration with Indonesia’s renowned investigative media Tempo magazine'    
    },
    date: '2016.12.18',
    photo: storageUrlPrefix + '/' + fileName.eventTempo,
    logo: storageUrlPrefix + '/' + fileName.logoTempo,
    link: 'https://www.twreporter.org/a/far-sea-fishing-media-international-cooperation'
  }
]

export default partners
