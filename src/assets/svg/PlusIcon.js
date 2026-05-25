import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlusIcon = props => (
  <Svg
    width={19}
    height={19}
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M18.0499 8.54997H10.45V0.949938C10.45 0.425673 10.0244 0 9.49991 0C8.97565 0 8.54997 0.425673 8.54997 0.949938V8.54997H0.949938C0.425673 8.54997 0 8.97565 0 9.49991C0 10.0244 0.425673 10.45 0.949938 10.45H8.54997V18.0499C8.54997 18.5743 8.97565 19 9.49991 19C10.0244 19 10.45 18.5743 10.45 18.0499V10.45H18.0499C18.5743 10.45 19 10.0244 19 9.49991C19 8.97565 18.5743 8.54997 18.0499 8.54997Z"
      fill="black"
    />
  </Svg>
);
export default PlusIcon;
