import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ProfileIconEvent = props => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 9 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M7.89069 9.78617V8.75442C7.89069 8.20714 7.66822 7.68228 7.27221 7.2953C6.8762 6.90832 6.3391 6.69092 5.77907 6.69092H2.61163C2.05159 6.69092 1.51449 6.90832 1.11848 7.2953C0.722474 7.68228 0.5 8.20714 0.5 8.75442V9.78617"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.19537 4.627C5.36159 4.627 6.30699 3.70314 6.30699 2.5635C6.30699 1.42386 5.36159 0.5 4.19537 0.5C3.02915 0.5 2.08374 1.42386 2.08374 2.5635C2.08374 3.70314 3.02915 4.627 4.19537 4.627Z"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ProfileIconEvent;
