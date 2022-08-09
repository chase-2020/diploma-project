/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconZhaoshangxiaochengxuJiantouShang = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M952.5 706.5L530 283.5c-9.4-9.4-24.6-9.4-33.9 0l-0.1 0.1-424.6 425c-9.4 9.4-9.4 24.6 0 33.9 9.4 9.4 24.6 9.4 33.9 0L513 334.4l405.5 406c9.4 9.4 24.6 9.4 33.9 0 9.5-9.3 9.5-24.5 0.1-33.9z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconZhaoshangxiaochengxuJiantouShang.defaultProps = {
  size: 18,
};

IconZhaoshangxiaochengxuJiantouShang = React.memo ? React.memo(IconZhaoshangxiaochengxuJiantouShang) : IconZhaoshangxiaochengxuJiantouShang;

export default IconZhaoshangxiaochengxuJiantouShang;
