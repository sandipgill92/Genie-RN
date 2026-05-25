import * as React from 'react';
import Svg, { Line, Defs, LinearGradient, Stop } from 'react-native-svg';

const RightLine = props => (
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
      y2={0.250009}
      stroke="url(#paint0_linear_396_1038)"
      strokeWidth={0.5}
      strokeLinecap="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_396_1038"
        x1={-5.29393e-8}
        y1={1}
        x2={89}
        y2={1.00001}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#424040" />
        <Stop offset={1} stopColor="white" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default RightLine;
