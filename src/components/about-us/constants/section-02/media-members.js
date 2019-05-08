import { membersImg } from './member-img-src'
import { storageUrlPrefix } from '../../utils/config'
import categoryIds from './category-ids'

const memberUrlPrefix = `${storageUrlPrefix}/member/`

const members = [
  {
    name: '李雪莉',
    nameEng: 'Sherry Lee',
    job: '總編輯',
    jobEng: 'Editor in chief',
    email: 'sherry@twreporter.org',
    profile: memberUrlPrefix + membersImg.editSherryLee,
    category: categoryIds.editor
  },
  {
    name: '楊惠君',
    nameEng: 'Hui Chun Yang',
    job: '副總編輯兼採訪主任',
    jobEng: 'Deputy Editor in Chief',
    email: 'jill718@twreporter.org',
    profile: memberUrlPrefix + membersImg.editJillYang,
    category: categoryIds.editor
  },
  {
    name: '王曉玟',
    nameEng: 'Sharon Wang',
    job: '主編',
    jobEng: 'editor',
    email: 'sharonwang@twreporter.org',
    profile: memberUrlPrefix + membersImg.editSharonWang,
    category: categoryIds.editor
  },
  {
    name: '劉致昕',
    nameEng: 'Jason Liu',
    job: '主筆',
    jobEng: 'editor',
    email: 'chihhsin@twreporter.org',
    profile: memberUrlPrefix + membersImg.editJasonLiu,
    category: categoryIds.editor
  },
  {
    name: '房慧真',
    nameEng: 'Michelle Fang',
    job: '資深記者',
    jobEng: 'Senior Journalist',
    email: 'bluemiau@twreporter.org',
    profile: memberUrlPrefix + membersImg.editMichelleFang,
    category: categoryIds.editor
  },
  {
    name: '張子午',
    nameEng: 'Tzewu Chang',
    job: '資深記者',
    jobEng: 'Senior Journalist',
    email: 'tzewu@twreporter.org',
    profile: memberUrlPrefix + membersImg.editTzewuChang,
    category: categoryIds.editor
  }, 
  {
    name: '李法賢',
    nameEng: 'Nick Li',
    job: '數位部主任',
    jobEng: 'Senior Coder',
    email: 'nickhsine@twreporter.org',
    profile: memberUrlPrefix + membersImg.digiNickLi,
    category: categoryIds.digital
  },
  {
    name: '余志偉',
    nameEng: 'Chih Wei Yu',
    job: '攝影部主任',
    jobEng: 'Photo Department Director',
    email: 'shakingwave@twreporter.org',
    profile: memberUrlPrefix + membersImg.photoChihWeiYu,
    category: categoryIds.photojournalist
  },
  {
    name: '吳逸驊',
    nameEng: 'Jameson Wu',
    job: '資深攝影',
    jobEng: 'Senior Photojournalist',
    email: 'jamesonwu@twreporter.org',
    profile: memberUrlPrefix + membersImg.photoJamesonWu,
    category: categoryIds.photojournalist
  },
  {
    name: '蘇威銘',
    nameEng: 'Wei Min Su',
    job: '攝影記者',
    jobEng: 'Photojournalist',
    email: 'tim2468012@twreporter.org',
    profile: memberUrlPrefix + membersImg.photoWeiMinSu,
    category: categoryIds.photojournalist
  },
  {
    name: '陳貞樺',
    nameEng: 'Mimi Chen',
    job: '數位專案經理',
    jobEng: 'Digital Product Manager',
    email: 'mimichen@twreporter.org',
    profile: memberUrlPrefix + membersImg.digiMimiChen,
    category: categoryIds.digital
  },
  {
    name: '余崇任',
    nameEng: 'Yu Chung-Jen',
    job: '工程師',
    jobEng: 'Software Engineer',
    email: 'yucj@twreporter.org',
    profile: memberUrlPrefix + membersImg.digiYuChungJen,
    category: categoryIds.digital
  },
  {
    name: '方泰鈞',
    nameEng: 'Taylor Fang',
    job: '工程師',
    jobEng: 'Software Engineer',
    email: 'taylorfang@twreporter.org',
    profile: memberUrlPrefix + membersImg.digiTalorFang,
    category: categoryIds.digital
  },
  {
    name: '曾清陽',
    nameEng: 'Ching-Yang Tseng',
    job: '工程師',
    jobEng: 'Software Engineer',
    email: 'babygoat@twreporter.org',
    profile: memberUrlPrefix + membersImg.digiChingYangTseng,
    category: categoryIds.digital
  },
  {
    name: '黃禹禛',
    nameEng: 'Yu Chen Huang',
    job: '設計師',
    jobEng: 'Art Designer',
    email: 'hychen@twreporter.org',
    profile: memberUrlPrefix + membersImg.digiYuChenHuang,
    category: categoryIds.digital
  },
  {
    name: '林珍娜',
    nameEng: 'Chen Na Lin ',
    job: '介面設計師',
    jobEng: 'UI Designer',
    email: 'ginalin@twreporter.org',
    profile: memberUrlPrefix + membersImg.digiChenNaLin,
    category: categoryIds.digital
  },
  {
    name: '吳政達',
    nameEng: 'Chen Da Wu',
    job: '設計師',
    jobEng: 'Art Designer',
    email: 'dadawu@twreporter.org',
    profile: memberUrlPrefix + membersImg.digiDaDaWu,
    category: categoryIds.digital
  },
  {
    name: '蔣宜婷',
    nameEng: 'I Ting Chiang',
    job: '記者',
    jobEng: 'Journalist',
    email: 'itingchiang@twreporter.org',
    profile: memberUrlPrefix + membersImg.editItingChiang,
    category: categoryIds.editor
  },
  {
    name: '吳柏緯',
    nameEng: 'Bo-Wei Wu',
    job: '記者',
    jobEng: 'Journalist',
    email: 'capric.wu@twreporter.org',
    profile: memberUrlPrefix + membersImg.editBoWeiWu,
    category: categoryIds.editor
  },
  {
    name: '孔德廉',
    nameEng: 'Kung Te Lien',
    job: '記者',
    jobEng: 'Journalist',
    email: 'williamkung13578@twreporter.org',
    profile: memberUrlPrefix + membersImg.editKungTeLien,
    category: categoryIds.editor
  },
  {
    name: '林雨佑',
    job: '記者',
    jobEng: 'Journalist',
    email: 'limuiu@twreporter.org',
    profile: memberUrlPrefix + membersImg.editUyo,
    category: categoryIds.editor
  },
  {
    name: '嚴文廷',
    job: '記者',
    jobEng: 'Journalist',
    email: 'roger@twreporter.org',
    profile: memberUrlPrefix + membersImg.editWenTingYen,
    category: categoryIds.editor
  },
  {
    name: '曹馥年',
    job: '記者',
    jobEng: 'Journalist',
    email: 'funientsao@twreporter.org',
    profile: memberUrlPrefix + membersImg.editFuNienTsao,
    category: categoryIds.editor
  },
  {
    name: '林慧貞',
    job: '記者',
    jobEng: 'Journalist',
    email: 'linhuichen@twreporter.org',
    profile: memberUrlPrefix + membersImg.editLinHuiChen,
    category: categoryIds.editor
  },
  {
    name: '張詩芸',
    nameEng: 'Shih-Yun Chang',
    job: '社群部主任',
    jobEng: 'Managing Editor',
    email: 'sychang@twreporter.org',
    profile: memberUrlPrefix + membersImg.editShihYunChang,
    category: categoryIds.editor
  },
  {
    name: '陳思樺',
    nameEng: 'Szu Hua Chen',
    job: '社群編輯',
    jobEng: 'Editor',
    email: 'shchen@twreporter.org',
    profile: memberUrlPrefix + membersImg.editSzuHuaChen,
    category: categoryIds.editor
  },
  {
    name: '洪琴宣',
    nameEng: 'Chin Hsuan Hung',
    job: '社群編輯',
    jobEng: 'Editor',
    email: 'chhung@twreporter.org',
    profile: memberUrlPrefix + membersImg.editChhung,
    category: categoryIds.editor
  },
  {
    name: '王儀君',
    nameEng: 'Sylvie Wang',
    job: '資深編輯',
    jobEng: 'Senior Editor',
    email: 'sylviewang@twreporter.org',
    profile: memberUrlPrefix + membersImg.editSylvieWang,
    category: categoryIds.editor
  },
  {
    name: '何榮幸',
    nameEng: 'Jung Shin Ho',
    job: '編輯部顧問',
    email: 'turtle@twreporter.org',
    profile: memberUrlPrefix + membersImg.editJungShinHo,
    category: categoryIds.editor
  }
]

export default members
