import { keyframes } from 'styled-components'

const fadeInDownKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const animated = (sec) => {
  return `
    animation-fill-mode: both;
    animation-duration: ${sec};
  `
}

const fadeInDown = (sec) => {
  return `
    animation-name: ${fadeInDownKeyframes};
    ${animated(sec)}
  `
}

export default {
  fadeInDown
}

export  {
  fadeInDown
}
