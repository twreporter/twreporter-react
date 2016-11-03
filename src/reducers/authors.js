'use strict'
import types from '../actions/authors'

const authorEntities = [
  {
    id: '001',
    name: '王立柔',
    imgUrl: 'http://i.imgur.com/Clyp3sKb.jpg',
    title: 'inHouse'
  },
  {
    id: '002',
    name: 'George Chien',
    imgUrl: 'http://i.imgur.com/bH6zB10.png',
    title: 'outSource'
  },
  {
    id: '003',
    name: '野島剛',
    imgUrl: 'http://i.imgur.com/bH6zB10.png',
    title: 'outSource'
  },
  {
    id: '004',
    name: '王珣沛',
    imgUrl: 'http://i.imgur.com/Clyp3sKb.jpg',
    title: 'inHouse'
  },
  {
    id: '005',
    name: '黃一峰',
    imgUrl: 'http://i.imgur.com/bH6zB10.png',
    title: 'outSource'
  },
  {
    id: '006',
    name: '王文彥',
    imgUrl: 'http://i.imgur.com/Clyp3sKb.jpg',
    title: 'inHouse'
  } ]

const initialStates = {
  authorEntities,
  authorsDisplay: {
    shownAuthors: [], // Should be and array of all authors
    loadPage: 0
  }
}

// Fetch data from API and update to store entities (async) when loadfing page

//

const authorsPage = (state = initialStates, action = {}) => {
  switch (action.type) {
    case types.LOAD_MORE:
      return Object.assign({}, state, {
        // 回傳 state 要修改的部分

      })
    case types.FILETER_BY_AUTHOR_NAME:
      return Object.assign({}, state, {
        // 回傳 state 要修改的部分
      })
    default:
      return state
  }
}

export default authorsPage
