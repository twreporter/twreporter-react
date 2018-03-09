import categoryIds from './category-ids'
import imgBoWeiWu from '../../../../../static/asset/about-us/members/bo-wei-wu.png'
import imgChihWeiYu from '../../../../../static/asset/about-us/members/chih-wei-yu.png'
import imgChingYangTseng from '../../../../../static/asset/about-us/members/ching-yang-tseng.png'
import imgEllieLai from '../../../../../static/asset/about-us/members/ellie-lai.png'
import imgHuiChunYang from '../../../../../static/asset/about-us/members/hui-chun-yang.png'
import imgITingChiang from '../../../../../static/asset/about-us/members/i-ting-chiang.png'
import imgJamesonWu from '../../../../../static/asset/about-us/members/jameson-wu.png'
import imgJenniferCheng from '../../../../../static/asset/about-us/members/jennifer-cheng.png'
import imgJungShinHo from '../../../../../static/asset/about-us/members/jung-shin-ho.png'
import imgLinChenNa from '../../../../../static/asset/about-us/members/lin-chen-na.png'
import imgMichelleFang from '../../../../../static/asset/about-us/members/michelle-fang.png'
import imgMimiChen from '../../../../../static/asset/about-us/members/mimi-chen.png'
import imgNickLi from '../../../../../static/asset/about-us/members/nick-li.png'
import imgNicoFang from '../../../../../static/asset/about-us/members/nico-fang.png'
import imgRosaWang from '../../../../../static/asset/about-us/members/rosa-wang.png'
import imgSherryLee from '../../../../../static/asset/about-us/members/sherry-lee.png'
import imgSherryLin from '../../../../../static/asset/about-us/members/sherry-lin.png'
import imgShihYunChang from '../../../../../static/asset/about-us/members/shih-yun-chang.png'
import imgSylvieWang from '../../../../../static/asset/about-us/members/sylvie-wang.png'
import imgSzuHuaChen from '../../../../../static/asset/about-us/members/szu-hua-chen.png'
import imgTaylorFang from '../../../../../static/asset/about-us/members/taylor-fang.png'
import imgTzewuChang from '../../../../../static/asset/about-us/members/tzewu-chang.png'
import imgYuChenHuang from '../../../../../static/asset/about-us/members/yu-chen-huang.png'
import imgYuChuanYeh from '../../../../../static/asset/about-us/members/yu-chuan-yeh.png'
import imgYuChungJen from '../../../../../static/asset/about-us/members/yu-chung-jen.png'
import imgYuEnLin from '../../../../../static/asset/about-us/members/yu-en-lin.png'
import imgYuhuanYin from '../../../../../static/asset/about-us/members/yuhuan-yin.png'
import imgYungTaChien from '../../../../../static/asset/about-us/members/yung-ta-chien.png'

const members = [
  {
    name: '何榮幸',
    nameEng: 'Jung Shin Ho',
    job: '總編輯',
    jobEng: 'Editor in chief',
    category: categoryIds.editor,
    imageSrc: imgJungShinHo
  },
  {
    name: '方德琳',
    nameEng: 'Nico Fang',
    job: '副總編輯',
    jobEng: 'Deputy Editor in Chief',
    category: categoryIds.editor,
    imageSrc: imgNicoFang
  },
  {
    name: '楊惠君',
    nameEng: 'Hui Chun Yang',
    job: '副總編輯',
    jobEng: 'Deputy Editor in Chief',
    category: categoryIds.editor,
    imageSrc: imgHuiChunYang
  },
  {
    name: '李雪莉',
    nameEng: 'Sherry Lee',
    job: '總主筆',
    jobEng: 'Editorial Managing Director',
    category: categoryIds.editor,
    imageSrc: imgSherryLee
  },
  {
    name: '張詩芸',
    nameEng: 'Shih-Yun Chang',
    job: '編輯主任',
    jobEng: 'Managing Editor',
    category: categoryIds.editor,
    imageSrc: imgShihYunChang
  },
  {
    name: '王儀君',
    nameEng: 'Sylvie Wang',
    job: '行銷經理 / 資深編輯',
    jobEng: 'Marketing Manager‭ ‬/ Senior Editor',
    category: categoryIds.editor,
    imageSrc: imgSylvieWang
  },
  {
    name: '鄭淑芬',
    nameEng: 'Jennifer Cheng',
    job: '行政經理',
    jobEng: 'Administration Manager',
    imageSrc: imgJenniferCheng
  },
  {
    name: '陳思樺',
    nameEng: 'Szu Hua Chen',
    job: '編輯',
    jobEng: 'Editor',
    imageSrc: imgSzuHuaChen,
    category: categoryIds.digital
  },
  {
    name: '陳貞樺',
    nameEng: 'Mimi Chen',
    job: '數位專案經理',
    jobEng: 'Digital Product Manager',
    category: categoryIds.digital,
    imageSrc: imgMimiChen
  },
  {
    name: '賴子歆',
    nameEng: 'Ellie Lai',
    job: '執行編輯',
    jobEng: 'Coordinate Editor‭‬',
    category: categoryIds.editor,
    imageSrc: imgEllieLai
  },
  {
    name: '余志偉',
    nameEng: 'Chih Wei Yu',
    job: '攝影主任',
    jobEng: 'Photo Department Director',
    category: categoryIds.photojournalist,
    imageSrc: imgChihWeiYu
  },
  {
    name: '吳逸驊',
    nameEng: 'Jameson Wu',
    job: '資深攝影',
    jobEng: 'Senior‭ ‬Photojournalist',
    category: categoryIds.photojournalist,
    imageSrc: imgJamesonWu
  },
  {
    name: '林佑恩',
    nameEng: 'Yu En Lin',
    job: '攝影記者',
    jobEng: 'Photojournalist',
    category: categoryIds.photojournalist,
    imageSrc: imgYuEnLin
  },
  {
    name: '李法賢',
    nameEng: 'Nick Li',
    job: '資深工程師',
    jobEng: 'Senior Coder',
    category: categoryIds.engineer,
    imageSrc: imgNickLi
  },
  {
    name: '余崇任',
    nameEng: 'Yu Chung-Jen',
    job: '工程師',
    jobEng: 'Software Engineer‭‬',
    category: categoryIds.engineer,
    imageSrc: imgYuChungJen
  },
  {
    name: '方泰鈞',
    nameEng: 'Taylor Fang',
    job: '工程師',
    jobEng: 'Software Engineer',
    category: categoryIds.engineer,
    imageSrc: imgTaylorFang
  },
  {
    name: '曾清陽',
    nameEng: 'Ching-Yang Tseng',
    job: '工程師',
    jobEng: 'Software Engineer',
    category: categoryIds.engineer,
    imageSrc: imgChingYangTseng
  },
  {
    name: '黃禹禛',
    nameEng: 'Yu Chen Huang',
    job: '設計',
    jobEng: 'Art Designer‭‬',
    category: categoryIds.designer,
    imageSrc: imgYuChenHuang
  },
  {
    name: '林珍娜',
    nameEng: 'Lin Chen Na',
    job: '介面設計師',
    jobEng: 'UI Designer',
    category: categoryIds.designer,
    imageSrc: imgLinChenNa
  },
  {
    name: '張子午',
    nameEng: 'Tzewu Chang',
    job: '資深記者',
    jobEng: 'Senior Journalist',
    category: categoryIds.journalist,
    imageSrc: imgTzewuChang
  },
  {
    name: '林韋萱',
    nameEng: 'Sherry Lin',
    job: '資深記者',
    jobEng: 'Senior Journalist',
    category: categoryIds.journalist,
    imageSrc: imgSherryLin
  },
  {
    name: '房慧真',
    nameEng: 'Michelle Fang',
    job: '資深記者',
    jobEng: 'Senior Journalist',
    category: categoryIds.journalist,
    imageSrc: imgMichelleFang
  },
  {
    name: '王立柔',
    nameEng: 'Rosa Wang',
    job: '記者',
    jobEng: 'Journalist',
    category: categoryIds.journalist,
    imageSrc: imgRosaWang
  },
  {
    name: '葉瑜娟',
    nameEng: 'Yu Chuan Yeh',
    job: '記者',
    jobEng: 'Journalist',
    category: categoryIds.journalist,
    imageSrc: imgYuChuanYeh
  },
  {
    name: '蔣宜婷',
    nameEng: 'I Ting Chiang',
    job: '記者',
    jobEng: 'Journalist',
    category: categoryIds.journalist,
    imageSrc: imgITingChiang
  },
  {
    name: '簡永達',
    nameEng: 'Yung Ta Chien',
    job: '記者',
    jobEng: 'Journalist',
    category: categoryIds.journalist,
    imageSrc: imgYungTaChien
  },
  {
    name: '尹俞歡',
    nameEng: 'Yuhuan Yin',
    job: '記者',
    jobEng: 'Journalist',
    category: categoryIds.journalist,
    imageSrc: imgYuhuanYin
  },
  {
    name: '吳柏緯',
    nameEng: 'Bo-Wei Wu',
    job: '記者',
    jobEng: 'Journalist',
    category: categoryIds.journalist,
    imageSrc: imgBoWeiWu
  }
]

export default members
