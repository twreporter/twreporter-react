const allPaddingLeft = {
  mobile: '30px',
  tablet: '70px',
  desktop: '70px',
  overDesktop: '96px'
}

const allPaddingRight = {
  mobile: '30px',
  tablet: '70px',
  desktop: '112px',
  overDesktop: '136px'  
}

export const containerStyle = {
  width: {
    mobile: '100%',
    tablet: '768px',
    desktop: '1024px',
    overDesktop: '1440px'
  }
}

export const headerStyle = {
  height: {
    mobile: '60px',
    tablet: '93px',
    desktop: '93px',
    overDesktop: '157px'
  },
  padding: {
    mobile: `20px ${allPaddingRight.mobile} 20px ${allPaddingLeft.mobile}`,
    tablet: `31px ${allPaddingRight.tablet} 31px ${allPaddingLeft.tablet}`,
    desktop: `31px ${allPaddingRight.desktop} 31px ${allPaddingLeft.desktop}`,
    overDesktop: `51px ${allPaddingRight.overDesktop} 51px ${allPaddingLeft.overDesktop}`
  }
}

export const contentStyle = {
  height: {
    mobile: '462px',
    tablet: '733px',
    desktop: '389px',
    overDesktop: '554px'
  },
  padding: {
    mobile: `0 ${allPaddingRight.mobile} 0 ${allPaddingLeft.mobile}`,
    tablet: `0 ${allPaddingRight.tablet} 0 ${allPaddingLeft.tablet}`,
    desktop: `0 ${allPaddingRight.desktop} 0 ${allPaddingLeft.desktop}`,
    overDesktop: `0 ${allPaddingRight.overDesktop} 0 ${allPaddingLeft.overDesktop}`
  }
}
