const allPaddingLeft = {
  desktop: '70px',
  overDesktop: '96px'
}

const allPaddingRight = {
  desktop: '112px',
  overDesktop: '136px'  
}

export const containerStyle = {
  width: {
    mobile: '100%',
    tablet: '719px',
    desktop: '1024px',
    overDesktop: '1440px'
  }
}

export const headerStyle = {
  height: {
    desktop: '93px',
    overDesktop: '157px'
  },
  padding: {
    desktop: `31px ${allPaddingRight.desktop} 31px ${allPaddingLeft.desktop}`,
    overDesktop: `51px ${allPaddingRight.overDesktop} 51px ${allPaddingLeft.overDesktop}`
  }
}

export const contentStyle = {
  height: {
    desktop: '389px',
    overDesktop: '554px'
  },
  padding: {
    desktop: `0 ${allPaddingRight.desktop} 0 ${allPaddingLeft.desktop}`,
    overDesktop: `0 ${allPaddingRight.overDesktop} 0 ${allPaddingLeft.overDesktop}`
  }
}
