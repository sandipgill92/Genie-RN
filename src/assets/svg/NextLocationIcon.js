import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const NextLocationIcon = props => (
  <Svg
    width={17}
    height={17}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10.625 7.08301L14.1667 10.6247L10.625 14.1663"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.83337 2.83301V7.79134C2.83337 8.54279 3.13188 9.26346 3.66324 9.79481C4.19459 10.3262 4.91526 10.6247 5.66671 10.6247H14.1667"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default NextLocationIcon;
