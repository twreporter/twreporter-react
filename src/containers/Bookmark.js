// import { Bookmark, fonts } from 'twreporter-react-components'
// import React from 'react'
// import styled from 'styled-components'
// import { breakPoints, mediaScreen } from '../utils/style-utils'
// import { connect } from 'react-redux'
//
// const mockBookmarksData = [
//   {
//     imgSrc: 'http://lorempixel.com/800/600/',
//     category: '台灣',
//     title: '紀錄片《徐自強的練習題》 一道質問人性的習題',
//     description: '我們到底相信性惡，還是性善；懷疑一個人的時候，是有罪推定，或無罪推定；我們或許不會遭遇這麼離譜的冤案，但當我們經歷所有人的不信任，又該如何去面對？',
//     authorTitle: '文',
//     authorName: '陳慧敏（特約記者）',
//     publishDate: '2017-07-07T00:00:00Z'
//   },
//   {
//     imgSrc: 'http://lorempixel.com/400/400/',
//     category: '評論',
//     title: '陳瀅羽／與外國客人的「交陪」紀實',
//     description: '在書店最令我著迷的不只是書，而是人。',
//     authorTitle: '文、圖',
//     authorName: '陳瀅羽',
//     publishDate: '2017-07-08T00:00:00Z'
//   },
//   {
//     imgSrc: 'http://lorempixel.com/600/300/',
//     category: '觀點',
//     title: '卞中佩／物自腐而後蟲生，川普時代的捍衛民主與科學運動',
//     description: '說來荒謬，川普執政超過百日下來，美國已經爆發了一波波拯救民主與科學的大型抗議活動。1919年以追尋德先生與賽先生為主要訴求之一的中國五四運動，居然在將近百年後於美國重現。',
//     authorTitle: '文',
//     authorName: '卞中佩',
//     publishDate: '2017-07-10T00:00:00Z'
//   },
//   {
//     imgSrc: 'http://lorempixel.com/600/400/',
//     category: '觀點',
//     title: '公醫時代／【長庚事件】【長庚事件】理應「非營利」的財團法人醫院卻「營利」？設公益監察人刻不容緩',
//     description: '說來荒謬，川普執政超過百日下來，美國已經爆發了一波波拯救民主與科學的大型抗議活動。1919年以追尋德先生與賽先生為主要訴求之一的中國五四運動，居然在將近百年後於美國重現。',
//     authorTitle: '文',
//     authorName: '卞中佩',
//     publishDate: '2017-07-10T00:00:00Z'
//   }
// ]
//
// const PageContainer = styled.div`
//   box-sizing: border-box;
//   padding: 50px 0;
//   margin: 0;
// `
//
// const Column = styled.div`
//   margin: 0 auto;
//   box-sizing: border-box;
//   width: 97%;
//   max-width: 834px;
//   ${mediaScreen.tablet`
//     width: 100%;
//     max-width: 707px;
//   `}
//   ${mediaScreen.mobile`
//     width: 100%;
//   `}
// `
//
// const StatusBar = styled.div`
//   ${mediaScreen.mobile`
//     padding-left: 1em;
//   `}
//   box-sizing: border-box;
//   padding-bottom: 25px;
//   width: 100%;
// `
//
// const CountTitle = styled.span`
//   font-size: ${fonts.size.xlarge};
//   ${mediaScreen.mobile`
//     font-size: ${fonts.size.large};
//   `}
//   margin-right: 1em;
// `
// const CountNumber = styled.span`
//   font-size: ${fonts.size.xlarge};
//   ${mediaScreen.mobile`
//     font-size: ${fonts.size.large};
//   `}
//   font-weight: ${fonts.weight.bold};
// `
//
// const BookmarksContainer = styled.ul`
//   margin: 0;
//   width: 100%;
//   box-sizing: border-box;
//   padding: 0;
// `
//
// class BookmarkContainer extends React.Component {
//   render() {
//     const bookmarksJSX = mockBookmarksData.map((bookmark) => {
//       return <Bookmark bookmarkData={bookmark} />
//     })
//     return (
//       <PageContainer>
//         <Column>
//           <StatusBar>
//             <CountTitle>全部</CountTitle>
//             <CountNumber>52</CountNumber>
//           </StatusBar>
//           <BookmarksContainer>
//             {bookmarksJSX}
//           </BookmarksContainer>
//         </Column>
//       </PageContainer>
//     )
//   }
// }
//
// export default connect()(BookmarkContainer)
