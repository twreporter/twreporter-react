import categoryIds from './category-ids'
import screen from '../../utils/screen'

const leftColumn = {
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
}

const rightColumn = {
  [screen.hd]: {
    width: '576px',
  },
  [screen.desktop]: {
    width: '414px',
  },
  [screen.tablet]: {
    width: '100%',
  },
}

// for single count
// eslint-disable-next-line no-unused-vars
const centerColumn = {
  [screen.hd]: {
    width: '263px',
    transform: 'translateX(460px)',
  },
  [screen.desktop]: {
    width: '195px',
    transform: 'translateX(331px)',
  },
  [screen.tablet]: {
    width: '100%',
  },
}

const carouselMarkup = {
  [categoryIds.foundation]: {
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
  [categoryIds.leaderTeam]: leftColumn,
  [categoryIds.editor]: rightColumn,
  [categoryIds.socialMedia]: leftColumn,
  [categoryIds.engineer]: rightColumn,
  [categoryIds.designer]: leftColumn,
  [categoryIds.photojournalist]: rightColumn,
  [categoryIds.marketing]: leftColumn,
  [categoryIds.podcast]: rightColumn,
  [categoryIds.theReporterForKids]: rightColumn,
  [categoryIds.dataJournalist]: leftColumn,
}

export default carouselMarkup
