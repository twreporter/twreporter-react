export const colors = {
  black: '#000',
  white: '#FFF',
  primary: '#C7000A',
  secondary: '#A67A44'
}

export const font = {
  weight: {
    regular: '400',
    medium: '500',
    bold: '700'
  },
  style: {
    italic: 'italic'
  },
  family: {
    english: {
      roboto: `"roboto", "Roboto"`, // medium, bold-italic, bold
      din: `"din-2014", "DIN"` // medium, bold-italic, bold
    },
    chinese: `"source-han-sans-traditional"`, // medium, bold
    sansSerifFallback: '"Noto Sans TC", "PingFang TC", "Apple LiGothic Medium", "Microsoft JhengHei", "Lucida Grande", "Lucida Sans Unicode", sans-serif'
  }
}

export const marginBetweenSections = {
  mobile: '100px',
  tablet: '200px',
  desktop: '200px',
  overDesktop: '250px'
}

export const section03Styles = {
  sectionTitle: {
    containerWidth: {
      tablet: '571px',
      desktop: '763px',
      hd: '926px'
    },
    number: {
      height: {
        mobile: '276px',
        tablet: '285px',
        desktop: '409px',
        hd: '409px'
      },
      width: {
        tablet: '165px',
        desktop: '237px',
        hd: '237px'
      }
    }
  },
  awardTitle: {
    height: {
      mobile: '71px',
      desktop: '97px',
      hd: '107px'
    },
    width: {
      mobile: '300px',
      tablet: '500px',
      desktop: '414px',
      hd: '543px'
    }
  },
  awardDetail: {
    width: {
      mobile: '288px',
      tablet: '500px',
      desktop: '400px',
      hd: '493px'
    }
  },
  awardImage: {
    containerSize: {
      mobile: '300px',
      tablet: '500px',
      desktop: '379px',
      hd: '530px'
    },
    mainSize: {
      mobile: '242px',
      tablet: '403px',
      desktop: '306px',
      hd: '428px'
    }
  },
  awardRedBlock: {
    width: {
      desktop: '78%',
      hd: '75%'
    },
    paddingLeft: {
      desktop: '12.7%',
      hd: '16%'
    }
  }
}
