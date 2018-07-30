import { membersImg, foundationImg } from './member-img-src'
import { storageUrlPrefix } from '../../utils/config'
import categoryIds from './category-ids'

const memberUrlPrefix = `${storageUrlPrefix}/members/`

const members = [
  {
    name: '何榮幸',
    nameEng: 'Jung Shin Ho',
    job: '總編輯',
    jobEng: 'Editor in chief',
    email: 'turtle@twreporter.org',
    profile: memberUrlPrefix + membersImg.EditJungShinHo,
    category: categoryIds.editor
  },
  {
    name: '李雪莉',
    nameEng: 'Sherry Lee',
    job: '總主筆',
    jobEng: 'Editorial Managing Director',
    email: 'sherry@twreporter.org',
    profile: memberUrlPrefix + membersImg.EditSherryLee,
    category: categoryIds.editor
  },
  {
    name: '方德琳',
    nameEng: 'Nico Fang',
    job: '副總編輯',
    jobEng: 'Deputy Editor in Chief',
    email: 'delin.fang@twreporter.org',
    profile: memberUrlPrefix + membersImg.EditNicoFang,
    category: categoryIds.editor
  },
  {
    name: '楊惠君',
    nameEng: 'Hui Chun Yang',
    job: '副總編輯',
    jobEng: 'Deputy Editor in Chief',
    email: 'jill718@twreporter.org',
    profile: memberUrlPrefix + membersImg.EditJillYang,
    category: categoryIds.editor
  },
  {
    name: '張詩芸',
    nameEng: 'Shih-Yun Chang',
    job: '編輯主任',
    jobEng: 'Managing Editor',
    email: 'sychang@twreporter.org',
    profile: memberUrlPrefix + membersImg.EditShihYunChang,
    category: categoryIds.editor
  },
  {
    name: '王儀君',
    nameEng: 'Sylvie Wang',
    job: '資深編輯',
    jobEng: 'Senior Editor',
    email: 'sylviewang@twreporter.org',
    profile: memberUrlPrefix + membersImg.EditSylvieWang,
    category: categoryIds.editor
  },
  {
    name: '鄭淑芬',
    nameEng: 'Jennifer Cheng',
    job: '行政經理',
    jobEng: 'Administration Manager',
    email: 'fenc@twreporter.org',
    profile: memberUrlPrefix + membersImg.EditJenniferCheng,
    category: categoryIds.editor
  },
  {
    name: '陳思樺',
    nameEng: 'Szu Hua Chen',
    job: '編輯',
    jobEng: 'Editor',
    email: 'shchen@twreporter.org',
    profile: memberUrlPrefix + membersImg.EditSzuHuaChen,
    category: categoryIds.editor
  },
  {
    name: '吳易真',
    nameEng: 'Saffron Wu',
    job: '執行經理',
    jobEng: 'Executive Manager',
    email: 'saffron@twreporter.org',
    profile: memberUrlPrefix + foundationImg.foundationYiZhanWu,
    category: categoryIds.editor
  },
  {
    name: '李法賢',
    nameEng: 'Nick Li',
    job: '數位部主任',
    jobEng: 'Senior Coder',
    email: 'nickhsine@twreporter.org',
    profile: memberUrlPrefix + membersImg.DigiNickLi,
    category: categoryIds.digital
  },
  {
    name: '余志偉',
    nameEng: 'Chih Wei Yu',
    job: '攝影主任',
    jobEng: 'Photo Department Director',
    email: 'shakingwave@twreporter.org',
    profile: memberUrlPrefix + membersImg.PhotoChihWeiYu,
    category: categoryIds.photojournalist
  },
  {
    name: '吳逸驊',
    nameEng: 'Jameson Wu',
    job: '資深攝影',
    jobEng: 'Senior‭ ‬Photojournalist',
    email: 'jamesonwu@twreporter.org',
    profile: memberUrlPrefix + membersImg.PhotoJamesonWu,
    category: categoryIds.photojournalist
  },
  {
    name: '林佑恩',
    nameEng: 'Yu En Lin',
    job: '攝影記者',
    jobEng: 'Photojournalist',
    email: 'yushawn1201@twreporter.org',
    profile: memberUrlPrefix + membersImg.PhotoYuEnLin,
    category: categoryIds.photojournalist
  },
  {
    name: '陳貞樺',
    nameEng: 'Mimi Chen',
    job: '數位專案經理',
    jobEng: 'Digital Product Manager',
    email: 'mimichen@twreporter.org',
    profile: memberUrlPrefix + membersImg.DigiMimiChen,
    category: categoryIds.digital
  },
  {
    name: '余崇任',
    nameEng: 'Yu Chung-Jen',
    job: '工程師',
    jobEng: 'Software Engineer‭‬',
    email: 'yucj@twreporter.org',
    profile: memberUrlPrefix + membersImg.DigiYuChungJen,
    category: categoryIds.digital
  },
  {
    name: '方泰鈞',
    nameEng: 'Taylor Fang',
    job: '工程師',
    jobEng: 'Software Engineer',
    email: 'taylorfang@twreporter.org',
    profile: memberUrlPrefix + membersImg.DigiTalorFang,
    category: categoryIds.digital
  },
  {
    name: '曾清陽',
    nameEng: 'Ching-Yang Tseng',
    job: '工程師',
    jobEng: 'Software Engineer',
    email: 'babygoat@twreporter.org',
    profile: memberUrlPrefix + membersImg.DigiChingYangTseng,
    category: categoryIds.digital
  },
  {
    name: '黃禹禛',
    nameEng: 'Yu Chen Huang',
    job: '設計',
    jobEng: 'Art Designer‭‬',
    email: 'hychen@twreporter.org',
    profile: memberUrlPrefix + membersImg.DigiYuChenHuang,
    category: categoryIds.digital
  },
  {
    name: '林珍娜',
    nameEng: 'Lin Chen Na',
    job: '介面設計師',
    jobEng: 'UI Designer',
    email: 'ginalin@twreporter.org',
    profile: memberUrlPrefix + membersImg.DigiChenNaLin,
    category: categoryIds.digital
  },
  {
    name: '張子午',
    nameEng: 'Tzewu Chang',
    job: '資深記者',
    jobEng: 'Senior Journalist',
    email: 'tzewu@twreporter.org',
    profile: memberUrlPrefix + membersImg.EditTzewuChang,
    category: categoryIds.editor
  },
  {
    name: '房慧真',
    nameEng: 'Michelle Fang',
    job: '資深記者',
    jobEng: 'Senior Journalist',
    email: 'bluemiau@twreporter.org',
    profile: memberUrlPrefix + membersImg.EditMichelleFang,
    category: categoryIds.editor
  },
  {
    name: '王立柔',
    nameEng: 'Rosa Wang',
    job: '記者',
    jobEng: 'Journalist',
    email: 'irosarian@twreporter.org',
    profile: memberUrlPrefix + membersImg.EditRosaWang,
    category: categoryIds.editor
  },
  {
    name: '葉瑜娟',
    nameEng: 'Yu Chuan Yeh',
    job: '記者',
    jobEng: 'Journalist',
    email: 'yuchuanyeh@twreporter.org',
    profile: memberUrlPrefix + membersImg.EditYuChuanYeh,
    category: categoryIds.editor
  },
  {
    name: '蔣宜婷',
    nameEng: 'I Ting Chiang',
    job: '記者',
    jobEng: 'Journalist',
    email: 'itingchiang@twreporter.org',
    profile: memberUrlPrefix + membersImg.EditItingChiang,
    category: categoryIds.editor
  },
  {
    name: '吳柏緯',
    nameEng: 'Bo-Wei Wu',
    job: '記者',
    jobEng: 'Journalist',
    email: 'capric.wu@twreporter.org',
    profile: memberUrlPrefix + membersImg.EditBoWeiWu,
    category: categoryIds.editor
  },
  {
    name: '孔德廉',
    nameEng: 'Kung Te Lien',
    job: '記者',
    jobEng: 'Journalist',
    email: 'williamkung13578@twreporter.org',
    profile: memberUrlPrefix + membersImg.EditKungTeLien,
    category: categoryIds.editor
  }
]

export default members
