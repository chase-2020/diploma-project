/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconZhouqiguanli = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M836.2 957.3H189.8c-50.7 0-92-37.1-92-82.6v-635c0-45.6 41.3-82.6 92-82.6h646.5c50.7 0 92 37.1 92 82.6v635c-0.1 45.5-41.3 82.6-92.1 82.6zM189.8 214.5c-15.4 0-28 11.3-28 25.1v635c0 13.9 12.6 25.1 28 25.1h646.5c15.4 0 28-11.3 28-25.1v-635c0-13.9-12.6-25.1-28-25.1H189.8z"
        fill={getIconColor(color, 0, '#a8a8a8')}
      />
      <Path
        d="M287.7 285.1c-17.7 0-32-14.3-32-32v-136c0-17.7 14.3-32 32-32s32 14.3 32 32v136c0 17.7-14.3 32-32 32zM361.6 541.3v7.8c0 15.5-12.6 28.1-28.1 28.1h-97.9c-15.5 0-28.1-12.6-28.1-28.1v-7.8c0-15.5 12.6-28.1 28.1-28.1h97.9c15.6 0 28.1 12.6 28.1 28.1zM588.4 541.3v7.8c0 15.5-12.6 28.1-28.1 28.1h-97.9c-15.5 0-28.1-12.6-28.1-28.1v-7.8c0-15.5 12.6-28.1 28.1-28.1h97.9c15.5 0 28.1 12.6 28.1 28.1zM815.1 541.3v7.8c0 15.5-12.6 28.1-28.1 28.1h-97.9c-15.5 0-28.1-12.6-28.1-28.1v-7.8c0-15.5 12.6-28.1 28.1-28.1H787c15.5 0 28.1 12.6 28.1 28.1zM364.7 684v7.8c0 15.5-12.6 28.1-28.1 28.1h-97.9c-15.5 0-28.1-12.6-28.1-28.1V684c0-15.5 12.6-28.1 28.1-28.1h97.9c15.5 0 28.1 12.6 28.1 28.1zM591.4 684v7.8c0 15.5-12.6 28.1-28.1 28.1h-97.9c-15.5 0-28.1-12.6-28.1-28.1V684c0-15.5 12.6-28.1 28.1-28.1h97.9c15.6 0 28.1 12.6 28.1 28.1zM892.1 383.4v0.7c0 17.5-14.2 31.7-31.7 31.7H162.2c-17.5 0-31.7-14.2-31.7-31.7v-0.7c0-17.5 14.2-31.7 31.7-31.7h698.2c17.5 0.1 31.7 14.3 31.7 31.7zM736.1 282c-17.7 0-32-14.3-32-32V114c0-17.7 14.3-32 32-32s32 14.3 32 32v136c0 17.7-14.3 32-32 32z"
        fill={getIconColor(color, 1, '#a8a8a8')}
      />
    </Svg>
  );
};

IconZhouqiguanli.defaultProps = {
  size: 18,
};

IconZhouqiguanli = React.memo ? React.memo(IconZhouqiguanli) : IconZhouqiguanli;

export default IconZhouqiguanli;
