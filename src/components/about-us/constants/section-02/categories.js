import categoryIds from './category-ids'

const media = [
  {
    id: categoryIds.editor,
    label: {
      english: 'Editorial Department',
      chinese: '編輯部',
    },
  },
  {
    id: categoryIds.socialMedia,
    label: {
      english: 'Social Media Department',
      chinese: '社群部',
    },
  },
  {
    id: categoryIds.photojournalist,
    label: {
      english: 'Photography Department',
      chinese: '攝影部',
    },
  },
  {
    id: categoryIds.marketing,
    label: {
      english: 'Marketing Department',
      chinese: '行銷部',
    },
  },
  {
    id: categoryIds.engineer,
    label: {
      english: 'Engineering Department',
      chinese: '工程部',
    },
  },
  {
    id: categoryIds.designer,
    label: {
      english: 'Design Department',
      chinese: '設計部',
    },
  },
]

const fundation = [
  {
    id: categoryIds.fundation,
    label: {
      chinese: '基金會',
      english: 'Fundation',
    },
  },
]

export default {
  fundation,
  media,
}
