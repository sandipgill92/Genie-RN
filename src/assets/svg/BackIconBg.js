import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const BackIconBg = props => (
  <Svg
    width={29}
    height={29}
    viewBox="0 0 29 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={14.5} cy={14.5} r={14.5} fill="white" fillOpacity={0.3} />
    <Path
      d="M14 22L7 15L14 8"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 15H7"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default BackIconBg;
