import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const EditIcon = props => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14.8092 5.34937C15.1617 4.99698 15.3597 4.51901 15.3598 4.0206C15.3599 3.52219 15.1619 3.04417 14.8095 2.6917C14.4572 2.33923 13.9792 2.14118 13.4808 2.14111C12.9824 2.14105 12.5043 2.33898 12.1519 2.69137L3.25454 11.5907C3.09975 11.745 2.98528 11.9351 2.9212 12.144L2.04054 15.0454C2.02331 15.103 2.02201 15.1643 2.03677 15.2226C2.05154 15.2809 2.08182 15.3342 2.1244 15.3767C2.16699 15.4192 2.22028 15.4494 2.27864 15.4641C2.337 15.4788 2.39824 15.4774 2.45587 15.46L5.35787 14.58C5.56665 14.5165 5.75665 14.4028 5.9112 14.2487L14.8092 5.34937Z"
      stroke="#262626"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11 4L13.6667 6.66667"
      stroke="#262626"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default EditIcon;
