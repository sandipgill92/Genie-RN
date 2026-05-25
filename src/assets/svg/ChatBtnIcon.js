import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChatBtnIcon = props => (
  <Svg
    width={17}
    height={17}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15.5832 12.0417C15.5832 12.4174 15.4339 12.7777 15.1682 13.0434C14.9026 13.3091 14.5422 13.4583 14.1665 13.4583H4.83634C4.46064 13.4584 4.10037 13.6077 3.83475 13.8734L2.275 15.4332C2.20467 15.5035 2.11506 15.5514 2.01752 15.5708C1.91997 15.5902 1.81886 15.5802 1.72697 15.5422C1.63508 15.5041 1.55654 15.4396 1.50128 15.357C1.44602 15.2743 1.41652 15.177 1.4165 15.0776V3.54167C1.4165 3.16594 1.56576 2.80561 1.83144 2.53993C2.09711 2.27426 2.45745 2.125 2.83317 2.125H14.1665C14.5422 2.125 14.9026 2.27426 15.1682 2.53993C15.4339 2.80561 15.5832 3.16594 15.5832 3.54167V12.0417Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.9585 7.7915H12.0418"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.9585 10.625H9.2085"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.9585 4.9585H10.6252"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ChatBtnIcon;
