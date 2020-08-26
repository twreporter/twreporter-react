import AboutusSideBar from './aboutus-page-side-bar'
import IndexPageSideBar from './index-page-side-bar'
import SideBarHOC from '@twreporter/react-components/lib/side-bar'

function getIndexPageSideBar() {
  return SideBarHOC(IndexPageSideBar)
}

function getAboutUSPageSideBar() {
  return SideBarHOC(AboutusSideBar)
}

export default {
  getIndexPageSideBar,
  getAboutUSPageSideBar,
}
