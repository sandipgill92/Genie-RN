import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const DownloadIconBg = props => (
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
      d="M19.349 12.2381L14.1109 7L8.8728 12.2381"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.1111 7V19.2222"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 22.7139H20.2222"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default DownloadIconBg;
