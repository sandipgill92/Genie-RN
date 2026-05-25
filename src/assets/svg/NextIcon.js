import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const NextIcon = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={70}
    height={70}
    viewBox="0 0 67 67"
  >
    <Circle cx={33.5} cy={33.5} r={33.5} fill="#000" />
    <Path
      fill="#fff"
      d="m52.776 32.415-.001-.001-8.006-7.968a1.532 1.532 0 0 0-2.162 2.172l5.375 5.35h-32.45a1.532 1.532 0 1 0 0 3.064h32.45l-5.375 5.35a1.532 1.532 0 1 0 2.162 2.172l8.006-7.968.002-.001c.6-.6.598-1.573 0-2.17Z"
    />
  </Svg>
);
export default NextIcon;
