import * as React from 'react';
import Svg, { Rect, G, Path, Defs, ClipPath } from 'react-native-svg';

const DurationIcon = props => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={21} height={20} rx={3} fill="#D9D9D9" />
    <G clipPath="url(#clip0_498_829)">
      <Path
        d="M10.5 15.0837C13.0313 15.0837 15.0833 13.0316 15.0833 10.5003C15.0833 7.96902 13.0313 5.91699 10.5 5.91699C7.96865 5.91699 5.91663 7.96902 5.91663 10.5003C5.91663 13.0316 7.96865 15.0837 10.5 15.0837Z"
        stroke="#919191"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 7.75V10.5L12.3333 11.4167"
        stroke="#919191"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_498_829">
        <Rect width={11} height={11} fill="white" transform="translate(5 5)" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default DurationIcon;
