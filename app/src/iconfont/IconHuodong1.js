/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconHuodong1 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M389.951318 773.310216a379.805213 379.805213 0 1 0 0-759.559474 379.805213 379.805213 0 0 0 0 759.559474z m0-101.906416a277.898797 277.898797 0 1 1 0-555.746641 277.898797 277.898797 0 0 1 0 555.746641z"
        fill={getIconColor(color, 0, '#4D84DB')}
      />
      <Path
        d="M599.216144 124.523017m-119.587179 0a119.587179 119.587179 0 1 0 239.174359 0 119.587179 119.587179 0 1 0-239.174359 0Z"
        fill={getIconColor(color, 1, '#4D84DB')}
      />
      <Path
        d="M838.33955 841.944187m-179.355293 0a179.355293 179.355293 0 1 0 358.710586 0 179.355293 179.355293 0 1 0-358.710586 0Z"
        fill={getIconColor(color, 2, '#4D84DB')}
      />
      <Path
        d="M120.918379 901.763254m-119.587179 0a119.587179 119.587179 0 1 0 239.174359 0 119.587179 119.587179 0 1 0-239.174359 0Z"
        fill={getIconColor(color, 3, '#4D84DB')}
      />
      <Path
        d="M957.92673 423.465489m-59.768114 0a59.768113 59.768113 0 1 0 119.536227 0 59.768113 59.768113 0 1 0-119.536227 0Z"
        fill={getIconColor(color, 4, '#E01313')}
      />
    </Svg>
  );
};

IconHuodong1.defaultProps = {
  size: 18,
};

IconHuodong1 = React.memo ? React.memo(IconHuodong1) : IconHuodong1;

export default IconHuodong1;
