/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconNv = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1025 1024" width={size} height={size} {...rest}>
      <Path
        d="M613.312 626.496v-11.2h151.296V318.08c0-124.736-113.152-225.856-252.608-225.856S259.392 193.344 259.392 318.08v297.216h151.36v11.072h-0.256L115.648 820.16v107.136H908.48v-105.92l-295.168-194.88z m7.68 186.752c-72.192 69.824-109.504-36.416-109.504-36.416s-37.312 106.24-109.568 36.416c0 0-31.744-20.544-35.136-158.208l144.704 121.728L656.192 655.04c-3.392 137.6-35.2 158.208-35.2 158.208z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconNv.defaultProps = {
  size: 18,
};

IconNv = React.memo ? React.memo(IconNv) : IconNv;

export default IconNv;
