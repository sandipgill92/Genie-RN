import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const RightIcon = props => (
  <Svg
    width={7}
    height={12}
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M0.799988 10.7998L5.79999 5.7998L0.799988 0.799805"
      stroke="black"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default RightIcon;
