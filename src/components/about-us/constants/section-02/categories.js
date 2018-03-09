import categoryIds from './category-ids'

const media = [
  {
    id: categoryIds.editor,
    label: {
      english: 'Editor',
      chinese: '編輯'
    }
  },
  {
    id: categoryIds.digital,
    label: {
      english: 'Digital',
      chinese: '網路'
    }
  },
  {
    id: categoryIds.designer,
    label: {
      english: 'Designer',
      chinese: '設計'
    }
  },
  {
    id: categoryIds.journalist,
    label: {
      english: 'Jounalist',
      chinese: '記者'
    }
  },
  {
    id: categoryIds.engineer,
    label: {
      english: 'Engineer',
      chinese: '技術'
    }
  },
  {
    id: categoryIds.photojournalist,
    label: {
      english: 'Photojournalist',
      chinese: '攝影'
    }
  }
]

const fundation = [
  {
    id: categoryIds.fundation,
    label: {
      chinese: '基金會成員',
      english: 'Fundation'
    }
  }
]

export default {
  media,
  fundation
}
