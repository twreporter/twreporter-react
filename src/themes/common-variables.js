
// TWReporter's custom variable
export const twrCustomVariable = {
  twreporterLineHeight: '1.8em',
  subnavBackground: '#3E3A39',
  grayText1: '#4D4D4D',
  black: '#000',
  gray: '#898989',
  grayBorderColor: '#ACACB1',
  grayTagBg: '#666674',
  progressbarColor: 'rgba(#C6000B, 0.35)'
}

const SCREEN_HD_MIN = 1440
export const sreenSize = {
  screenHdMin: `${SCREEN_HD_MIN}px`,
  screenLgMax: `${SCREEN_HD_MIN - 1}px`
}

export const typography = {
  font: {
    fontDateSerif: 'Times New Roman, serif',
    size: {
      topicTitleLarge: '45px',
      topicTitleSmall: '30px',
      xLarger: '34px',
      larger: '22px',
      base: '18px',
      medium: '16px',
      small: '15px',
      xSmall: '14px',
      xSmaller: '13px',
      tiny: '12px'
    },
    weight: {
      normal: '300',
      medium: '500',
      bold: '700',
      superBold: '900'
    }
  },

  captionImage: {
    captionColor: '#242423',
    zIndexWidget: '1000000010'
  }
}

export const letterSpace = {
  generalLetterSpace: '0.4px',
  topicLetterSpaceWide: '2px',
  topicLetterSpaceMedium: '1px',
  topicLetterSpaceSmall: '0.3px',
  topicLetterSpaceTight: '0.1px'
}

export const lineHeight = {
  lineHeightMedium: '1.4',
  lineHeightBase: '1.5',
  linHeightLarge: '1.8',
  lineHeightParagraph: '1.95'
}

export const componentMargin = {
  marginBottom: '40px',
  doubleMarginBottom: '80px',
  horizontalMargin: '24px'
}

export const colors = {
  gray: {
    gray15: '#262626',
    gray25: '#404040',
    gray40: '#666666',
    gray50: '#808080',
    gray64: '#A4A4A4',
    gray60: 'rgba(0, 0, 0, 0.6)',
    gray70: '#B3B3B3',
    gray97: '#F7F7F7',
    gray98: '#F9F9F9',
    inputBorderGray: '#CBCBCB',
    lightGray: '#F1F1F1',
    blockQuoteGray: 'rgba(74, 74, 74, 0.25)',
    pinkishGray: '#BFBFBF',
    greyD8: '#d8d8d8'
  },
  red: {
    lightRed: '#D92616',
    rustyRed: '#c71b0a'
  },
  articleToolsText: '#a67a44'
}

// // ## white
// $white: #FFF;
// // ## author search box
// $placeholder-gray: $gray-64;
// $input-bg-gray: $gray-98;
// $transparent-bg: rgba(179, 179, 179, 0);
//
// // ## Global color settings
export const globalColor = {
  textColor: colors.gray.gray25,
  primaryColor: colors.red.rustyRed,
  photographyDark: '#08192d',
  underlineMakerColor: 'rgba(199, 26, 10, 0.25)',
  loadingPlaceholder: 'rgba(191,191,191,0.50)'
}

//
// $material-box-shadow: 0px 4px 10px 0px rgba($gray-70, 0.7);
// $box-glow: 0px 0px 3px rgba($gray-40, 0.05);

export const layout = {
  article: {
    innerWidth: '712px',
    outerWidth: '900px'
  },
  tablet: {
    small: '556px',
    medium: '672px',
    large: '768px'
  },
  desktop: {
    small: '664px',
    medium: '833px',
    large: '1024px'
  },
  hdDesktop: {
    small: '700px',
    medium: '880px',
    large: '1440px'
  }
}
