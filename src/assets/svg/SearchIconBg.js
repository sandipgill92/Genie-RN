import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const SearchIconBg = props => (
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
      d="M22 22.0005L18.3833 18.3838"
      stroke="black"
      strokeWidth={0.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.6667 20.3334C17.3486 20.3334 20.3334 17.3486 20.3334 13.6667C20.3334 9.98478 17.3486 7 13.6667 7C9.98478 7 7 9.98478 7 13.6667C7 17.3486 9.98478 20.3334 13.6667 20.3334Z"
      stroke="black"
      strokeWidth={0.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SearchIconBg;
