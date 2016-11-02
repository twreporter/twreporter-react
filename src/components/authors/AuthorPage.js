'use strict'
import React from 'react'
import AuthorList from 'AuthorList'
import AuthorSearchBox from '../../containers/AuthorSearchBox'
import LoadMore from '../../containers/LoadMore'

const AuthorPage = () => {
  return (
    <div>
      <AuthorSearchBox />
      <AuthorList />
      <LoadMore />
      {/* <Sponser /> */}
      {/* <Footer /> */}
    </div>
  )
}

export default AuthorPage
