/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconQianbao1 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M692.352 151.637333l-254.656 147.008h-128l369.152-213.12a42.666667 42.666667 0 0 1 58.282667 15.637334l114.005333 197.482666L938.666667 298.666667a42.666667 42.666667 0 0 1 42.666666 42.666666v554.666667a42.666667 42.666667 0 0 1-42.666666 42.666667H85.333333a42.666667 42.666667 0 0 1-42.666666-42.666667V341.333333a42.666667 42.666667 0 0 1 42.666666-42.666666h691.904l-84.885333-147.029334zM917.333333 362.666667H106.666667v128h192a128 128 0 1 1 0 256H106.666667v128h810.666666V362.666667z m-618.666666 192H106.666667v128h192a64 64 0 0 0 3.754666-127.893334L298.666667 554.666667z m522.666666 0a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0v-64a32 32 0 0 1 32-32z"
        fill={getIconColor(color, 0, '#4E4E4E')}
      />
    </Svg>
  );
};

IconQianbao1.defaultProps = {
  size: 18,
};

IconQianbao1 = React.memo ? React.memo(IconQianbao1) : IconQianbao1;

export default IconQianbao1;
