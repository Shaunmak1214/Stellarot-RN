import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg
      width={48}
      height={1}
      viewBox="0 0 48 1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M0 0h48v1H0z" fill="#063855" fillRule="evenodd" />
    </Svg>
  )
}

export default SvgComponent