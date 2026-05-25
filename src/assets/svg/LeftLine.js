import * as React from 'react';
import Svg, { Line, Defs, LinearGradient, Stop } from 'react-native-svg';

const LeftLine = props => (
  <Svg
    width={89}
    height={1}
    viewBox="0 0 89 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Line
      x1={0.25}
      y1={0.25}
      x2={88.75}
      y2={0.25}
      stroke="url(#paint0_linear_396_1030)"
      strokeWidth={0.5}
      strokeLinecap="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_396_1030"
        x1={0}
        y1={1}
        x2={89}
        y2={1}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="white" />
        <Stop offset={1} stopColor="#424040" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default LeftLine;
