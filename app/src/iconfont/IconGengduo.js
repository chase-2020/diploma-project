/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconGengduo = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M375.1 477.6H209c-50.9 0-92.3-41.4-92.3-92.3v-166c0-50.9 41.4-92.3 92.3-92.3h166.1c50.9 0 92.3 41.4 92.3 92.3v166.1c0 50.8-41.4 92.2-92.3 92.2zM209 190.7c-15.7 0-28.5 12.8-28.5 28.5v166.1c0 15.8 12.8 28.5 28.5 28.5h166.1c15.7 0 28.5-12.8 28.5-28.5v-166c0-15.7-12.8-28.5-28.5-28.5H209zM815 477.6H648.9c-50.9 0-92.3-41.4-92.3-92.3v-166c0-50.9 41.4-92.3 92.3-92.3H815c50.9 0 92.3 41.4 92.3 92.3v166.1c0 50.8-41.4 92.2-92.3 92.2zM648.9 190.7c-15.7 0-28.5 12.8-28.5 28.5v166.1c0 15.8 12.8 28.5 28.5 28.5H815c15.7 0 28.5-12.8 28.5-28.5v-166c0-15.7-12.8-28.5-28.5-28.5H648.9zM375.1 897.1H209c-50.9 0-92.3-41.4-92.3-92.3V638.7c0-50.9 41.4-92.3 92.3-92.3h166.1c50.9 0 92.3 41.4 92.3 92.3v166.1c0 50.8-41.4 92.3-92.3 92.3zM209 610.1c-15.7 0-28.5 12.8-28.5 28.5v166.1c0 15.8 12.8 28.5 28.5 28.5h166.1c15.7 0 28.5-12.8 28.5-28.5v-166c0-15.8-12.8-28.5-28.5-28.5H209z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M815 546.4H648.9c-50.9 0-92.3 41.4-92.3 92.3v166.1c0 50.9 41.4 92.3 92.3 92.3H815c50.9 0 92.3-41.4 92.3-92.3V638.7c0-50.9-41.4-92.3-92.3-92.3z"
        fill={getIconColor(color, 1, '#FF4C4D')}
      />
    </Svg>
  );
};

IconGengduo.defaultProps = {
  size: 18,
};

IconGengduo = React.memo ? React.memo(IconGengduo) : IconGengduo;

export default IconGengduo;
