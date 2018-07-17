import { foundationImg } from './member-img-src'
import { storageUrlPrefix } from '../../utils/config'
import categoryIds from './category-ids'

const memberUrlPrefix = `${storageUrlPrefix}/members/`

const members = [
  {
    name: '翁秀琪',
    nameEng: 'Shieu Chi Weng',
    job: '董事長',
    jobEng: 'Director',
    profile: memberUrlPrefix + foundationImg.foundationSheuChiWong,
    category: categoryIds.fundation
  },
  {
    name: '李怡志',
    nameEng: 'Richy Lee',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.foundationYiZhiLi,
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
    name: '洪三雄',
    nameEng: 'San Xiong Hong',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.foundationSanShiungHong,
    category: categoryIds.fundation
  },
  {
    name: '黃榮村',
    nameEng: 'Jong Tsun Huang',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.foundationRongTsunHuang,
    category: categoryIds.fundation
  },
  {
    name: '黃哲斌',
    nameEng: 'Zhe Bin Huang',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.foundationZeBinHuang,
    category: categoryIds.fundation
  },
  {
    name: '管中祥',
    nameEng: 'Benla Kuagn',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.foundationZhongShunKuan,
    category: categoryIds.fundation
  },
  {
    name: '詹偉雄',
    nameEng: 'Wei Hsiung Chan',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.foundationWeiShiungZhan,
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
    name: '黃旭田',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.foundationShuTienHuang,
    category: categoryIds.fundation
  }, {
    name: '簡志忠',
    job: '董事',
    jobEng: 'Executive Director',
    profile: memberUrlPrefix + foundationImg.foundationZhiZhongChien,
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
    name: '胡元輝',
    nameEng: 'Yuan-Hui Hu',
    job: '監察人',
    jobEng: 'Supervisor',
    profile: memberUrlPrefix + foundationImg.foundationYuanHueiHu,
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
    name: '何榮幸',
    nameEng: 'Jung Shin Ho',
    job: '執行長',
    jobEng: 'Chief Executive Officer',
    profile: memberUrlPrefix + foundationImg.EditJungShinHo,
    category: categoryIds.fundation
  },
  {
    name: '方德琳',
    nameEng: 'Nico Fang',
    job: '副執行長',
    jobEng: 'Deputy Chief Executive Officer',
    profile: memberUrlPrefix + foundationImg.EditNicoFang,
    category: categoryIds.fundation
  },
  {
    name: '鄭淑芬',
    nameEng: 'Jennifer Cheng',
    job: '行政經理',
    jobEng: 'Administration Manager',
    profile: memberUrlPrefix + foundationImg.EditJenniferCheng,
    category: categoryIds.fundation
  },
  {
    name: '王儀君',
    nameEng: 'Sylvie Wang',
    job: '行銷經理',
    jobEng: 'Marketing Manager‭',
    profile: memberUrlPrefix + foundationImg.EditSylvieWang,
    category: categoryIds.fundation
  },
  {
    name: '劉怡汝',
    nameEng: 'Yi Ru Liu',
    job: '顧問',
    jobEng: 'Consultant',
    profile: memberUrlPrefix + foundationImg.foundationYiRuLiu,
    category: categoryIds.fundation
  }
]

export default members
