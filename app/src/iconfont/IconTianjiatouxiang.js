/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconTianjiatouxiang = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M972.8 460.8H563.2V51.2a51.2 51.2 0 0 0-102.4 0v409.6H51.2a51.2 51.2 0 0 0 0 102.4h409.6v409.6a51.2 51.2 0 0 0 102.4 0V563.2h409.6a51.2 51.2 0 0 0 0-102.4z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconTianjiatouxiang.defaultProps = {
  size: 18,
};

IconTianjiatouxiang = React.memo ? React.memo(IconTianjiatouxiang) : IconTianjiatouxiang;

export default IconTianjiatouxiang;
