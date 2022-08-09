/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconQianjin = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M260.638647 900.202463l58.230216 58.506509L705.15365 570.505485l58.20668-58.505485-58.20668-58.506509L318.868863 65.290005l-58.230216 58.505485 386.3073 388.203486L260.638647 900.202463zM646.945947 512"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconQianjin.defaultProps = {
  size: 18,
};

IconQianjin = React.memo ? React.memo(IconQianjin) : IconQianjin;

export default IconQianjin;
