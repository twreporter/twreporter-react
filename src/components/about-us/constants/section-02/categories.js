import categoryIds from './category-ids'

const media = [
  {
    id: categoryIds.editor,
    label: {
      english: 'Editorial Department',
      chinese: '編輯部'
    }
  },
  {
    id: categoryIds.digital,
    label: {
      english: 'Digital Design and Development',
      chinese: '數位部'
    }
  },
  {
    id: categoryIds.photojournalist,
    label: {
      english: 'Photography Department',
      chinese: '攝影部'
    }
  }
]

const fundation = [
  {
    id: categoryIds.fundation,
    label: {
      chinese: '基金會',
      english: 'Fundation'
    }
  }
]

export default {
  media,
  fundation
}
