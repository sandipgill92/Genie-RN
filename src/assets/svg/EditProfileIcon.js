import * as React from 'react';
import Svg, { Circle, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const EditProfileIcon = () => {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx={11} cy={11} r={11} fill="#EFEFEF" />
      <G clipPath="url(#clip0_1869_206)">
        <Path
          d="M16.958 7.68076C17.2665 7.37242 17.4398 6.9542 17.4398 6.51809C17.4399 6.08198 17.2667 5.66371 16.9583 5.3553C16.65 5.04689 16.2318 4.87359 15.7957 4.87354C15.3596 4.87348 14.9413 5.04667 14.6329 5.35501L6.84772 13.1419C6.71228 13.277 6.61212 13.4432 6.55605 13.6261L5.78547 16.1648C5.77039 16.2152 5.76925 16.2688 5.78217 16.3198C5.79509 16.3709 5.82159 16.4175 5.85885 16.4547C5.89611 16.4919 5.94274 16.5183 5.99381 16.5311C6.04487 16.544 6.09846 16.5427 6.14888 16.5276L8.68813 15.7576C8.87081 15.702 9.03707 15.6025 9.1723 15.4677L16.958 7.68076Z"
          stroke="#262626"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.75 5.9165L15.0833 8.24984"
          stroke="#262626"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1869_206">
          <Rect
            width={14}
            height={14}
            fill="white"
            transform="translate(4 3)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export default EditProfileIcon;
