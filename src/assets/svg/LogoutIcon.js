import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const LogoutIcon = props => (
  <Svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12.75 12.5L16.5 8.75L12.75 5"
      stroke="#FF0000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.5 8.75H7.5"
      stroke="#FF0000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.5 15.5H4.5C4.10218 15.5 3.72064 15.342 3.43934 15.0607C3.15804 14.7794 3 14.3978 3 14V3.5C3 3.10218 3.15804 2.72064 3.43934 2.43934C3.72064 2.15804 4.10218 2 4.5 2H7.5"
      stroke="#FF0000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default LogoutIcon;
