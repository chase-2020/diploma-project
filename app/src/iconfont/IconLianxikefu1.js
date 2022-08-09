/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconLianxikefu1 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1031 1024" width={size} height={size} {...rest}>
      <Path
        d="M307.2 1017.6c-12.8 0-32-6.4-38.4-12.8-19.2-19.2-25.6-44.8-12.8-70.4l32-83.2C288 844.8 294.4 832 294.4 832c0-19.2 19.2-32 32-25.6 19.2 0 32 12.8 32 32 0 12.8-6.4 32-12.8 44.8l-32 76.8 198.4-108.8c6.4 0 12.8-6.4 12.8-6.4 243.2-6.4 441.6-179.2 441.6-396.8 0-204.8-204.8-384-448-384-236.8 0-441.6 172.8-448 384-6.4 121.6 57.6 230.4 166.4 313.6 12.8 12.8 19.2 32 6.4 44.8-12.8 12.8-32 19.2-44.8 6.4-128-89.6-198.4-224-198.4-364.8 6.4-243.2 243.2-448 512-448 275.2 0 512 204.8 512 448 0 249.6-224 454.4-492.8 460.8l-198.4 108.8C326.4 1017.6 320 1017.6 307.2 1017.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M697.6 416 339.2 416C320 416 307.2 403.2 307.2 384c0-19.2 12.8-32 32-32l358.4 0c19.2 0 32 12.8 32 32C729.6 403.2 716.8 416 697.6 416z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M576 563.2 339.2 563.2c-19.2 0-32-12.8-32-32 0-19.2 12.8-32 32-32l243.2 0c19.2 0 32 12.8 32 32C608 550.4 595.2 563.2 576 563.2z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

IconLianxikefu1.defaultProps = {
  size: 18,
};

IconLianxikefu1 = React.memo ? React.memo(IconLianxikefu1) : IconLianxikefu1;

export default IconLianxikefu1;
