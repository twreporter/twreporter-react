import categoryIds from './category-ids'
import screen from '../../utils/screen'

const carouselMarkup = {
  [categoryIds.fundation]: {
    [screen.hd]: {
      width: '100%',
    },
    [screen.desktop]: {
      width: '100%',
    },
    [screen.tablet]: {
      width: '100%',
    },
  },
  [categoryIds.editor]: {
    [screen.hd]: {
      width: '576px',
      'margin-right': '31px',
    },
    [screen.desktop]: {
      width: '414px',
      'margin-right': '32px',
    },
    [screen.tablet]: {
      width: '100%',
    },
  },
  [categoryIds.socialMedia]: {
    [screen.hd]: {
      width: '576px',
    },
    [screen.desktop]: {
      width: '414px',
    },
    [screen.tablet]: {
      width: '100%',
    },
  },
  [categoryIds.engineer]: {
    [screen.hd]: {
      width: '576px',
      'margin-right': '31px',
    },
    [screen.desktop]: {
      width: '414px',
      'margin-right': '32px',
    },
    [screen.tablet]: {
      width: '100%',
    },
  },
  [categoryIds.designer]: {
    [screen.hd]: {
      width: '576px',
    },
    [screen.desktop]: {
      width: '414px',
    },
    [screen.tablet]: {
      width: '100%',
    },
  },
  [categoryIds.photojournalist]: {
    [screen.hd]: {
      width: '576px',
      'margin-right': '31px',
    },
    [screen.desktop]: {
      width: '414px',
      'margin-right': '32px',
    },
    [screen.tablet]: {
      width: '100%',
    },
  },
  [categoryIds.marketing]: {
    [screen.hd]: {
      width: '576px',
    },
    [screen.desktop]: {
      width: '414px',
    },
    [screen.tablet]: {
      width: '100%',
    },
  },
}

export default carouselMarkup
