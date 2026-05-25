import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const FacebookIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" width={50} height={50}>
    <Path
      fill="#1877F2"
      d="M25 15c0-5.523-4.477-10-10-10S5 9.477 5 15c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V15h2.54v-2.203c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V15h2.773l-.443 2.89h-2.33v6.988C21.343 24.128 25 19.991 25 15Z"
    />
    <Path
      fill="#fff"
      d="m18.893 17.89.443-2.89h-2.773v-1.876c0-.79.387-1.562 1.63-1.562h1.26v-2.46s-1.144-.196-2.238-.196c-2.284 0-3.777 1.385-3.777 3.89V15h-2.54v2.89h2.54v6.988a10.08 10.08 0 0 0 3.124 0v-6.987h2.33Z"
    />
    <Circle cx={15.5} cy={15.5} r={15} stroke="#fff" />
  </Svg>
);
export default FacebookIcon;
