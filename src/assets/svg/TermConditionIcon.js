import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const TermConditionIcon = props => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3.33337 1.6665V18.3332L5.00004 17.4998L6.66671 18.3332L8.33337 17.4998L10 18.3332L11.6667 17.4998L13.3334 18.3332L15 17.4998L16.6667 18.3332V1.6665L15 2.49984L13.3334 1.6665L11.6667 2.49984L10 1.6665L8.33337 2.49984L6.66671 1.6665L5.00004 2.49984L3.33337 1.6665Z"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.6666 6.6665H6.66663"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.3333 10H6.66663"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.8333 13.3335H6.66663"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default TermConditionIcon;
