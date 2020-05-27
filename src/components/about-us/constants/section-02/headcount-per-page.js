import categoryIds from './category-ids'
import screen from '../../utils/screen'

export const headcountPerPage = {
  [categoryIds.fundation]: {
    [screen.hd]: 7,
    [screen.desktop]: 5,
    [screen.tablet]: 3,
    [screen.mobile]: 4
  },
  [categoryIds.editor]: {
    [screen.hd]: 3,
    [screen.desktop]: 3,
    [screen.tablet]: 3,
    [screen.mobile]: 4,
  },
  [categoryIds.socialMedia]: {
    [screen.hd]: 3,
    [screen.desktop]: 3,
    [screen.tablet]: 3,
    [screen.mobile]: 4,
  },
  [categoryIds.engineer]: {
    [screen.hd]: 3,
    [screen.desktop]: 3,
    [screen.tablet]: 3,
    [screen.mobile]: 4,
  },
  [categoryIds.designer]: {
    [screen.hd]: 3,
    [screen.desktop]: 3,
    [screen.tablet]: 3,
    [screen.mobile]: 4,
  },
  [categoryIds.photojournalist]: {
    [screen.hd]: 4,
    [screen.desktop]: 4,
    [screen.tablet]: 3,
    [screen.mobile]: 4,
  },
  [categoryIds.marketing]: {
    [screen.hd]: 2,
    [screen.desktop]: 2,
    [screen.tablet]: 2,
    [screen.mobile]: 4,
  },
}
