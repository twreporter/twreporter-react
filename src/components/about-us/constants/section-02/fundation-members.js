import { foundationImg } from './member-img-src'
import { storageUrlPrefix } from '../../utils/config'
import categoryIds from './category-ids'

const memberUrlPrefix = `${storageUrlPrefix}/member/`

const members = [
  {
    name: '黃榮村',
    nameEng: 'Jong Tsun Huang',
    job: '董事長',
    jobEng: 'Director',
    profile: memberUrlPrefix + foundationImg.foundationRongTsunHuang,
    category: categoryIds.fundation
  },
  {
    name: '何榮幸',
    nameEng: 'Jung Shin Ho',
    job: '執行長',
    jobEng: 'Chief Executive Officer',
    profile: memberUrlPrefix + foundationImg.EditJungShinHo,
    category: categoryIds.fundation
  },
  {
    name: '林以涵',
    nameEng: 'Sunny Lin',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.foundationYiHanLin,
    category: categoryIds.fundation
  },
  {
    name: '侯文詠',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.foundationWenYongHo,
    category: categoryIds.fundation
  },
  {
    name: '柯珀汝',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.foundationPoRuKo,
    category: categoryIds.fundation
  },
  {
    name: '許朱勝',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.foundationChuShengHsu,
    category: categoryIds.fundation
  },
  {
    name: '黃旭田',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.foundationShuTienHuang,
    category: categoryIds.fundation
  },
  {
    name: '葉瑜娟',
    nameEng: 'Yu Chuan Yeh',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.EditYuChuanYeh,
    category: categoryIds.fundation
  },
  {
    name: '劉昌德',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.foundationChangDerLiu,
    category: categoryIds.fundation
  },
  {
    name: '蔡裕慶',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.foundationYuChingTsai,
    category: categoryIds.fundation
  },
  {
    name: '瞿筱葳',
    nameEng: 'Hsiao Wei Chiu',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.foundationShiaoWeiChu,
    category: categoryIds.fundation
  },
  {
    name: '李怡志',
    nameEng: 'Richy Lee',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.BlankFace,
    category: categoryIds.fundation
  },
  {
    name: '李偉文',
    nameEng: 'Wei Wen Li',
    job: '監察人',
    jobEng: 'Supervisor',
    profile: memberUrlPrefix + foundationImg.foundationWeiWanLi,
    category: categoryIds.fundation
  },
  {
    name: '張芷',
    job: '監察人',
    jobEng: 'Supervisor',
    profile: memberUrlPrefix + foundationImg.foundationZhiChang,
    category: categoryIds.fundation
  },
  {
    name: '陳順孝',
    nameEng: 'Shun Xiao Chen',
    job: '監察人',
    jobEng: 'Supervisor',
    profile: memberUrlPrefix + foundationImg.foundationSoonShiaoChen,
    category: categoryIds.fundation
  },
  {
    name: '翁秀琪',
    nameEng: 'Shieu Chi Weng',
    job: '基金會顧問',
    profile: memberUrlPrefix + foundationImg.foundationSheuChiWong,
    category: categoryIds.fundation
  },
  {
    name: '劉怡汝',
    nameEng: 'Yi Ru Liu',
    job: '基金會顧問',
    profile: memberUrlPrefix + foundationImg.foundationYiRuLiu,
    category: categoryIds.fundation
  },
  {
    name: '侯宜秀',
    job: '法律顧問',
    profile: memberUrlPrefix + foundationImg.BlankFace,
    category: categoryIds.fundation
  },
  {
    name: '翁國彥',
    job: '法律顧問',
    profile: memberUrlPrefix + foundationImg.BlankFace,
    category: categoryIds.fundation
  },
  {
    name: '陳業鑫',
    job: '法律顧問',
    profile: memberUrlPrefix + foundationImg.BlankFace,
    category: categoryIds.fundation
  },
  {
    name: '李雪莉',
    nameEng: 'Nico Fang',
    job: '副執行長',
    jobEng: 'Deputy Chief Executive Officer',
    profile: memberUrlPrefix + foundationImg.EditSherryLee,
    category: categoryIds.fundation
  },
  {
    name: '王儀君',
    nameEng: 'Sylvie Wang',
    job: '行銷部經理',
    jobEng: 'Marketing Manager‭',
    profile: memberUrlPrefix + foundationImg.EditSylvieWang,
    category: categoryIds.fundation
  },
  {
    name: '吳易真',
    nameEng: 'Saffron Wu',
    job: '行銷部執行經理',
    jobEng: 'Executive Manager',
    profile: memberUrlPrefix + foundationImg.foundationYiZhanWu,
    category: categoryIds.fundation
  },
  {
    name: '鄭淑芬',
    nameEng: 'Jennifer Cheng',
    job: '行政部經理',
    jobEng: 'Administration Manager',
    profile: memberUrlPrefix + foundationImg.EditJenniferCheng,
    category: categoryIds.fundation
  }
]

export default members
