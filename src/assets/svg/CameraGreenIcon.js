import * as React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Path,
} from 'react-native-svg';

const CameraGreenIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 22"
    width={28}
    height={22}
    {...props}
  >
    <Defs>
      <LinearGradient id="P" gradientUnits="userSpaceOnUse" />
      <RadialGradient
        id="g1"
        cx={0}
        cy={0}
        r={1}
        href="#P"
        gradientTransform="matrix(0,4.598,-4.598,0,21.31,11.278)"
      >
        <Stop stopColor="#fffbfb" stopOpacity={0.3} />
        <Stop offset={1} stopColor="#007749" stopOpacity={1} />
      </RadialGradient>
      <RadialGradient
        id="g2"
        cx={0}
        cy={0}
        r={1}
        href="#P"
        gradientTransform="matrix(0,6,-6,0,11.31,11.31)"
      >
        <Stop stopColor="#fffbfb" stopOpacity={0.3} />
        <Stop offset={1} stopColor="#007749" stopOpacity={1} />
      </RadialGradient>
    </Defs>
    <Path
      fillRule="evenodd"
      className="a"
      d="m18.3 12.3l5.2 3.5q0.1 0.1 0.3 0.1 0.1 0 0.2-0.1 0.2 0 0.2-0.2 0.1-0.1 0.1-0.2v-8.2q0-0.2-0.1-0.3 0-0.1-0.1-0.2-0.2 0-0.3 0-0.1 0-0.2 0l-5.3 3.1"
    />
    <Path
      fillRule="evenodd"
      className="b"
      d="m18.3 12.3l5.2 3.5q0.1 0.1 0.3 0.1 0.1 0 0.2-0.1 0.2 0 0.2-0.2 0.1-0.1 0.1-0.2v-8.2q0-0.2-0.1-0.3 0-0.1-0.1-0.2-0.2 0-0.3 0-0.1 0-0.2 0l-5.3 3.1"
    />
    <Path
      className="a"
      d="m16.3 5.3h-10c-1.1 0-2 0.9-2 2v8c0 1.1 0.9 2 2 2h10c1.1 0 2-0.9 2-2v-8c0-1.1-0.9-2-2-2z"
    />
    <Path
      className="c"
      d="m16.3 5.3h-10c-1.1 0-2 0.9-2 2v8c0 1.1 0.9 2 2 2h10c1.1 0 2-0.9 2-2v-8c0-1.1-0.9-2-2-2z"
    />
  </Svg>
);
export default CameraGreenIcon;
