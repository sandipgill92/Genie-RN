import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const AccountSetting = props => (
  <Svg
    width={13}
    height={15}
    viewBox="0 0 13 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6.5 8C8.57107 8 10.25 6.32107 10.25 4.25C10.25 2.17893 8.57107 0.5 6.5 0.5C4.42893 0.5 2.75 2.17893 2.75 4.25C2.75 6.32107 4.42893 8 6.5 8Z"
      stroke="#A19999"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.5 14C12.5 12.4087 11.8679 10.8826 10.7426 9.75736C9.61742 8.63214 8.0913 8 6.5 8C4.9087 8 3.38258 8.63214 2.25736 9.75736C1.13214 10.8826 0.5 12.4087 0.5 14"
      stroke="#A19999"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default AccountSetting;
